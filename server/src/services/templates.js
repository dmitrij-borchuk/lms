'use strict';

module.exports = () => {
  const Promise = require('promise');

  let EmailTemplate = require('email-templates').EmailTemplate;
  let templatesDir = './emailTemplates';

  return {
    setPassword: (url) => {
      return new Promise( (resolve, reject) => {
        const path = require('path');
        let newUserTemplateDir = '/action';
        let templateDir = path.join(__dirname, templatesDir, newUserTemplateDir)
        let letter = new EmailTemplate(templateDir);
        let props = {
          title: 'Your password has been reset.',
          line1: 'Your password has been reset.',
          line2: '',
          buttonText: 'Set new password',
          buttonLink: url
        };
        letter.render(props, function (err, result) {
          err ? reject(err) : resolve(result);
        });
      });
    }
  };
};