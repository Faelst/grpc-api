const grpc = require('grpc');
const path = require('path');
const { loaderConfig } = require('../config/proto');

const protoLoader = require('@grpc/proto-loader');

const centauriDefinition = protoLoader.loadSync(
  path.resolve(__dirname, '..', `prototypes`, `Centauri.proto`),
  loaderConfig
);

const centauriPackage = grpc.loadPackageDefinition(centauriDefinition);

const centauriClient = new centauriPackage.UserServices(
  `localhost:3334`,
  grpc.credentials.createInsecure()
);

module.exports = centauriClient;
