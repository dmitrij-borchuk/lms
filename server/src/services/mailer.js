import Promise from 'promise';
import Mailgun from 'mailgun-js';

import constants from '../constants';
import config from '../config';

export default {
  /**
   * Send mail.
   * @param {Object} mail - Mail config.
   * @param {string} [mail.from] - The sender (e.g. '<email@email.com>',
   *                               'Excited User <email@email.com>').
   * @param {string} mail.to - Email address of the recipient(s). Example:
   *                           "Bob <bob@host.com>".
   *                           You can use commas to separate multiple recipients.
   * @param {string} [mail.subject] - Message subject.
   * @param {string} [mail.text] - Body of the message. (text version).
   * @param {string} [mail.html] - Body of the message. (HTML version).
   */
  send(mail) {
    const {
      apiKey,
      domain,
    } = config.mailGun;

    return new Promise((resolve, reject) => {
      const defaultHtml = [
        '<div style="white-space: pre;">',
        mail.text || '',
        '</div>',
      ].join('');

      const data = {
        from: mail.from || config.email.defaultFrom,
        to: mail.to,
        subject: mail.subject || config.email.defaultSubject,
        text: mail.text || '',
        html: mail.html || defaultHtml,
      };

      console.log(process.env.ENVIRONMENT);
      console.log(constants.ENVIRONMENTS.DEVELOPMENT);
      if (process.env.ENVIRONMENT !== constants.ENVIRONMENTS.DEVELOPMENT) {
        const mailgun = Mailgun({ apiKey, domain });
        mailgun.messages().send(
          data,
          (error, body) => (error ? reject(error) : resolve(body)),
        );
      } else {
        /* eslint-disable no-console */
        console.log('+----------------');
        console.log(' Mail stub');
        console.log(` to: ${data.to}`);
        console.log(` subject: ${data.subject}`);
        console.log(` text: ${data.text}`);
        console.log('+----------------');
        /* eslint-enable no-console */
      }
    });
  },
};
