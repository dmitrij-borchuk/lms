async function runNext(migrations, v, index, setDbVersion) {
  const currentMigration = migrations[index];

  if (currentMigration) {
    if (currentMigration.version > v) {
      await currentMigration.script();
      await setDbVersion(currentMigration.version);
    }
    await runNext(migrations, v, index + 1);
  }
}

async function runAllMigrations(migrations, currentDbVersion, setDbVersion) {
  return runNext(migrations, currentDbVersion, 0, setDbVersion);
}

function getMessages(migrations, vFrom, vTo) {
  return migrations.filter(
    item => item.version > vFrom && item.version <= vTo,
  ).map(
    item => item.message,
  );
}

export default async function (options = {}) {
  const {
    migrations,
    getDbVersion,
    setDbVersion,
  } = options;
  const startVersion = await getDbVersion();
  let currentErr = null;

  try {
    await runAllMigrations(migrations, startVersion, setDbVersion);
  } catch (err) {
    currentErr = err;
  }
  const currentVersion = await getDbVersion();

  return {
    startVersion,
    currentVersion,
    messages: getMessages(migrations, startVersion, currentVersion),
    error: currentErr,
  };
}
