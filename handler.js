const serverless = require("serverless-http");
const express = require("express");
const app = express();
const api_helper = require('./api_helper');


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/todos", (req, res, next) => {
  api_helper.make_api_call('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
});

app.get("/bored", (req, res, next) => {
  api_helper.make_api_call('https://www.boredapi.com/api/activity')
  .then(response => {
      res.json(response.activity)
  })
  .catch(error => {
      res.send(error)
  })
});

app.get("/stonks", (req, res, next) => {
  api_helper.make_api_call('https://api.iextrading.com/1.0/stock/aapl/company')
  .then(response => {
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
