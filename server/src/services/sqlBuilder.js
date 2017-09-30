import squel from 'squel';

squel.registerValueHandler('undefined', () => null);

export default squel;
