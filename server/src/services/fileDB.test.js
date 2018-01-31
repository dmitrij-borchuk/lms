import 'babel-polyfill';
import { describe, it, beforeEach, afterEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import jsonfile from 'jsonfile';
import fs from 'fs';
import * as constants from '../constants';
import utils from '../utils';
import open from './fileDB';

const { expect } = chai;
const testDbPath = './test_db';

describe('fileDB', () => {
  let readFileStub;
  let writeFileStub;
  let mkdirSyncStub;

  beforeEach(() => {
    constants.DB_PATH = testDbPath;
    readFileStub = sinon.stub(jsonfile, 'readFile');
    writeFileStub = sinon.stub(jsonfile, 'writeFile');
    mkdirSyncStub = sinon.stub(fs, 'mkdirSync');
  });

  it('open() should return "Db" instance', async () => {
    readFileStub.callsFake((path, cb) => cb({}));
    writeFileStub.callsFake((path, data, cb) => cb());

    const db = await open('test_database_need_to_be_wiped');

    expect(db).to.be.a('object');
  });

  it('"Db.get()" should return valid data', async () => {
    const key = '123';
    const jsonOnKey = {
      prop1: 1,
      prop2: '',
    };
    const json = {
      123: jsonOnKey,
    };
    readFileStub.callsFake((path, cb) => cb(null, json));

    const db = await open('test_database_need_to_be_wiped');
    const result = db.get(key);
    const resultDeep = db.get(`${key}.prop1`);

    expect(JSON.stringify(db.data)).to.equal(JSON.stringify(json));
    expect(JSON.stringify(result)).to.equal(JSON.stringify(jsonOnKey));
    expect(resultDeep).to.equal(1);
  });

  it('"Db.get()" shouldn\'t fail on path that doesn\'t exist', async () => {
    const json = {
      123: {
        prop1: 1,
        prop2: '',
      },
    };
    readFileStub.callsFake((path, cb) => cb(null, json));

    const db = await open('test_database_need_to_be_wiped');
    const result = db.get('123.prop1.prop2.prop3');

    expect(result).to.equal(undefined);
  });

  it('"Db.set()" should set valid data', async () => {
    const jsonOnKey = {
      prop1: 1,
      prop2: '',
    };
    const newJsonOnKey = {
      prop1: 2,
      prop2: 'prop2',
    };
    const json = {
      123: jsonOnKey,
    };
    const keyDeep = '123.prop3.prop4';
    const valueDeep = 'prop3value';
    readFileStub.callsFake((path, cb) => cb(null, json));

    const db = await open('test_database_need_to_be_wiped');
    db.set('123', newJsonOnKey);
    const result = db.get('123');
    db.set(keyDeep, valueDeep);
    const resultDeep = db.get(keyDeep);

    expect(JSON.stringify(db.data)).to.equal(JSON.stringify(json));
    expect(JSON.stringify(result)).to.equal(JSON.stringify(newJsonOnKey));
    expect(resultDeep).to.equal(valueDeep);
  });

  it('open() should throw an error if write is fail', async () => {
    readFileStub.callsFake((path, cb) => cb({}));
    writeFileStub.callsFake((path, data, cb) => cb(new Error()));
    let errorCatched = false;
    try {
      await open('test_database_need_to_be_wiped');
    } catch (error) {
      errorCatched = true;
    }

    expect(errorCatched).to.equal(true);
  });

  afterEach(async () => {
    await utils.removeFolder(testDbPath);
    readFileStub.restore();
    writeFileStub.restore();
    mkdirSyncStub.restore();
  });
});
