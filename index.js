"use strict";
/**
* This shows how to use standard Apollo client on Node.js
*/

global.WebSocket = require('ws');
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Require exports file with endpoint and auth info
const aws_exports = require('./aws-exports').default;

// Require AppSync module
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
const AWSAppSyncClient = require('aws-appsync').default;

const url = aws_exports.ENDPOINT;
const region = aws_exports.REGION;
//const type = AUTH_TYPE.AWS_IAM;
const type = AUTH_TYPE.API_KEY; //JRB - updating to API_KEY

// If you want to use API key-based auth
const apiKey = aws_exports.AWS_SECRET_ACCESS_KEY;  // JRB - updated from the portal
// If you want to use a jwtToken from Amazon Cognito identity:
//const jwtToken = 'xxxxxxxx';

// If you want to use AWS...
const AWS = require('aws-sdk');
//AWS.config.update({
 //   region: aws_exports.REGION,
  // credentials: new AWS.Credentials({
    //    accessKeyId: aws_exports.AWS_ACCESS_KEY_ID,
    //    secretAccessKey: aws_exports.AWS_SECRET_ACCESS_KEY
    //})
//});
//const credentials = AWS.config.credentials;

// Import gql helper and craft a GraphQL query
//const gql = require('graphql-tag');
//const query = gql(`
//query Aggregatedata {    
//  listToDoLists {
//    items {
//      idToDoList
//      Description
//      Type
//    }
//  }
  
// listToDoTables {
//    items {
//      TASKID
//      Description
//      Type
//    }
//  }
  
//}`);


const gql = require('graphql-tag');
const query = gql(`
query Aggregatedata {
  listToDoLists { 
    items{
      idToDoList
      Description
      Type
    }
  }
  
 listToDoTables {
    items {
      TASKID
      Description
      Type
    }
  }
  
}`);

// Set up a subscription query
//const subquery = gql(`
//subscription onUpdateToDoTable {
//onUpdateToDoTable {
	 //__typename
      //TASKID
      //Description
      //Type
//}
//}`);


  
// Set up Apollo client
const client = new AWSAppSyncClient({
    url: url,
    region: region,
    auth: {
        type: type,
        //credentials: credentials,
		apiKey: apiKey
    },
    disableOffline: true      //Uncomment for AWS Lambda
});


// JRB - APP CODE

client.hydrated().then(function (client) {
    //Now run a query
    client.query({ query: query })
    //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        .then(function logData(data) {
            
            //data = JSON.stringify(data);
            //data = JSON.parse(data);
						console.log('results of query: ', data.data.listToDoTables.items[0]	);
			            console.log('results of query: ', data.data.listToDoTables.items[1]	);
			            console.log('results of query: ', data.data.listToDoTables.items[2]	);
			            console.log('results of query: ', data.data.listToDoTables.items[3]	);
			            console.log('results of query: ', data.data.listToDoLists.items[0]);
			            console.log('results of query: ', data.data.listToDoLists.items[1]);
			            console.log('results of query: ', data.data.listToDoLists.items[2]);
			            
        })
        .catch(console.error);
        //Now subscribe to results
    //const observable = client.subscribe({ query: subquery });

   //const realtimeResults = function realtimeResults(data) {
   //console.log('realtime data: ', data);
   //};

   //observable.subscribe({
   //next: realtimeResults,
   //complete: console.log,
   //error: console.log,
   //});


});