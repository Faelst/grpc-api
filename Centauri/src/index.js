const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const implamentation = require('./implementations/user');

require('./database');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, `prototypes`, `messages.proto`),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const protoTypes = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(protoTypes.UserServices.service, implamentation);
server.bind(`0.0.0.0:3334`, grpc.ServerCredentials.createInsecure());
server.start();
