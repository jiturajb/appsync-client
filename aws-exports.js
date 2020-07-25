"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    AWS_ACCESS_KEY_ID: 'jz2n6gydjva3vhvkykdqmgis4a', // JRB - From the console, don't know if this is correct.
    AWS_SECRET_ACCESS_KEY: 'da2-kvizvxplfjbmpeerduvvdco3r4', // JRB - From the console, don't know if this is correct.
    HOST: 'y7txmlhelngetfhm2oblc6y6ha.appsync-api.us-east-2.amazonaws.com',
    REGION: 'us-east-2',
    PATH: '/graphql',
    ENDPOINT: '',
	"authenticationType": "API_KEY"
};
config.ENDPOINT = "https://" + config.HOST + config.PATH;
exports.default = config;
