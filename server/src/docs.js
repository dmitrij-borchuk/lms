import Promise from 'promise';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import Pack from '../package.json';

export default function (server) {
  const options = {
    info: {
      title: 'API Documentation',
      version: Pack.version,
    },
  };

  return new Promise((resolve, reject) => {
    server.register(
      [
        Inert,
        Vision,
        {
          register: HapiSwagger,
          options,
        },
      ],
      err => (err ? reject(err) : resolve()),
    );
  });
}
