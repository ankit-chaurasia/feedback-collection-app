const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get('/api/survey', requireLogin, async (req, res) => {
    const survey = await Survey.find({
      _user: req.user.id,
      _id: req.query.surveyId
    }).select({
      yes: false,
      no: false,
      dateSent: false,
      lastResponded: false
    });
    res.send(survey);
  });

  app.put('/api/survey/edit', requireLogin, async (req, res) => {
    const { title, subject, body, recipients, surveyId } = req.body;
    const recipientsArr = recipients
      .split(',')
      .map(email => ({ email: email.trim() }));
    await Survey.updateOne(
      {
        _id: surveyId
      },
      {
        title: title,
        body: body,
        subject: subject,
        recipients: recipientsArr,
        dateSent: Date.now()
      },
      { returnNewDocument: false }
    ).exec();
    const mailer = new Mailer(
      { subject, recipients: recipientsArr },
      surveyTemplate({ body, id: surveyId })
    );
    try {
      await mailer.send();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send({ err });
    }
  });

  app.delete('/api/survey/delete', requireLogin, async (req, res) => {
    try {
      const response = await Survey.deleteOne({ _id: req.query.surveyId });
      res.send({ message: 'Survey deleted successfully.', error: false });
    } catch (err) {
      res.status(422).send({ message: err, error: true });
    }
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    // Parse events
    // Remove null/undfined entries from events array
    // Remove duplicate events based on email and surveyId
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send({ err });
    }
  });
};
