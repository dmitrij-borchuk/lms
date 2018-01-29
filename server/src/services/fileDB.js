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
      if (!(element in currentPath)) {
        currentPath[element] = {};
      }
      currentPath = currentPath[element];
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

export default function open(name) {
  return new Promise((resolve, reject) => {
    const path = `${DB_PATH}/${name}`;

    if (!fs.existsSync(DB_PATH)) {
      fs.mkdirSync(DB_PATH);
    }
    jsonfile.readFile(path, (readErr, obj) => {
      if (!readErr) {
        resolve(new Db(path, obj));
      } else {
        jsonfile.writeFile(path, {}, (writeErr) => {
          if (writeErr) {
            reject(writeErr);
          } else {
            resolve(new Db(path, {}));
          }
        });
      }
    });
  });
}
