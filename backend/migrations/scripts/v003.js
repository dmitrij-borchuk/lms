import config from '../../config';
import mailerFactory from '../../services/mailer';
import templatesFactory from '../../services/templates';
import utils from '../../utils';

const mailer = mailerFactory(config);
const templates = templatesFactory();

export default function (DAL) {
  return {
    version: 3,
    message: 'Created admin',
    script() {
      const resetToken = utils.newToken();
      let user;

      return DAL.users.create(config.defaultAdmin).then((newUser) => {
        user = newUser;

        return DAL.users.addResetToken(resetToken, user.email);
      }).then(
        () => templates.setPassword(`${config.defaultDomain}/setPassword/${resetToken}`)
      ).then((template) => mailer.send({
        to: user.email,
        subject: 'You would be the first admin of LMS',
        text: template.text,
        html: template.html,
      }));
    },
  };
}
