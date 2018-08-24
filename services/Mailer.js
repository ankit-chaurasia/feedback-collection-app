const sendGrid = require('sendgrid');
const { mail: helper } = sendGrid;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // This is inherited from sendGrid
    this.addContent(this.body);
    // Set click tracking
    this.addClickTracking();
  }

  formatAddresses = recipients =>
    recipients.map(({ email }) => new helper.Email(email));

  addClickTracking = () => {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  };
}

module.exports = Mailer;
