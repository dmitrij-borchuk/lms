import sqlite3 from 'sqlite3';

const Sqlite = sqlite3.verbose();
const mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE; // eslint-disable-line no-bitwise
const db = new Sqlite.Database('./db/db.sqlite', mode);

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)');

  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i += 1) {
    stmt.run(`Ipsum ${i}`);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`);
  });
});

db.close();
