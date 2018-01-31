import jsonfile from 'jsonfile';
import fs from 'fs';
import { DB_PATH } from '../constants';

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(path, data, (writeErr) => {
      if (writeErr) {
        reject(writeErr);
      } else {
        resolve();
      }
    });
  });
}
function readFile(path) {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(path, (err, obj) => {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
}

class Db {
  constructor(path, data) {
    this.path = path;
    this.data = data;
  }
  set(path, data) {
    const pathParts = path.split('.');
    const key = pathParts.pop();
    let currentPath = this.data;

    pathParts.forEach((element) => {
      if (!(element in currentPath)) {
        currentPath[element] = {};
      }
      currentPath = currentPath[element];
    });
    currentPath[key] = data;

    return writeFile(this.path, this.data);
  }
  get(path) {
    const pathParts = path.split('.');
    const key = pathParts.pop();
    let currentPath = this.data;

    pathParts.forEach((element) => {
      if (currentPath[element]) {
        currentPath = currentPath[element];
      } else {
        currentPath = {};
      }
    });

    return currentPath[key];
  }
  getByKey(key, value) {
    return Object.values(this.data).filter(
      element => key in element,
    ).filter(
      element => element[key] === value,
    );
  }
}

export default async function open(name) {
  const path = `${DB_PATH}/${name}`;

  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH);
  }
  try {
    const obj = await readFile(path);
    return new Db(path, obj);
  } catch (error) {
    const defaultData = {};
    await writeFile(path, defaultData);
    return new Db(path, defaultData);
  }
}
