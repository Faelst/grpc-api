const grpc = require('grpc');
const path = require('path');
const { loaderConfig } = require('../config/proto');

const protoLoader = require('@grpc/proto-loader');

const sagittariiLoader = protoLoader.loadSync(
  path.resolve(__dirname, '..', `prototypes`, `Sagittarii.proto`),
  loaderConfig
);

const sagittariPackage = grpc.loadPackageDefinition(sagittariiLoader);

const sagittariService = new sagittariPackage.PurchaseService(
  `localhost:3335`,
  grpc.credentials.createInsecure()
);

module.exports = sagittariService;
