const sendGrid = require('sendgrid');
const { mail: helper } = sendGrid;
const keys = require('../config/keys');

class Mailer extends helper.Mail {}

module.exports = Mailer;
