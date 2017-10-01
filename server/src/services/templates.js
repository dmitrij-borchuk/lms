import Promise from 'promise';
import { EmailTemplate } from 'email-templates';
import path from 'path';

const templatesDir = './emailTemplates';

export default {
  setPassword(url) {
    return new Promise((resolve, reject) => {
      const newUserTemplateDir = '/action';
      const templateDir = path.join(__dirname, templatesDir, newUserTemplateDir);
      const letter = new EmailTemplate(templateDir);
      const props = {
        title: 'Your password has been reset.',
        line1: 'Your password has been reset.',
        line2: '',
        buttonText: 'Set new password',
        buttonLink: url,
      };
      letter.render(props, (err, result) => (err ? reject(err) : resolve(result)));
    });
  },
};
