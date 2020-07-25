"use strict";
const express = require('express');
const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
   graphqlFn(req, res)
//   res.render('todo-table', { todos })
});
app.listen(3000, function(){
  console.log("Listening on port 3000!")
});

function graphqlFn (req, res) {
    const aws_exports = require('./aws-exports').default;
    global.WebSocket = require('ws');
    require('es6-promise').polyfill();
    require('isomorphic-fetch');

    // Require AppSync module
    const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;
    const AWSAppSyncClient = require('aws-appsync').default;

    const url = aws_exports.ENDPOINT;
    const region = aws_exports.REGION;
    const type = AUTH_TYPE.API_KEY;
    const apiKey = aws_exports.AWS_SECRET_ACCESS_KEY;

    // Import gql helper and craft a GraphQL query
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

    const client = new AWSAppSyncClient({
        url: url,
        region: region,
        auth: {
            type: type,
            apiKey: apiKey
        },
        disableOffline: true      //Uncomment for AWS Lambda
    });

    client.hydrated().then(function (client) {
        //Now run a query
        client.query({ query: query })
        //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
            .then(function logData(data) {
                // console.log('results of query: ', data.data.listToDoLists[0]);
                const todos = [];
               // data.data.listToDoTables.forEach(element => {
                //    todos.push(element);
                // });
                //let ToDoLists = data.data.listToDoLists.map(item => {
                 //   return {
                  //    TASKID: item.idToDoList,
                   //   Description: item.Description,
                    //  Type: item.Type
                   // }
                  // });
                //ToDoLists.forEach(item => {
                 // todos.push(item);
                // });
				todos.push(data.data.listToDoTables.items[1]);
				todos.push(data.data.listToDoTables.items[3]);
				todos.push(data.data.listToDoLists.items[2]);
				todos.push(data.data.listToDoLists.items[1]);

                console.log('Final list: ', todos);
                res.render('todo-table', { todos })
            })
            .catch(console.error);

    });
};