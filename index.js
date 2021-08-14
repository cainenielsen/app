const express = require("express");
const app = express();

const request = require("request");

const gcp_api_key = "AIzaSyC1Wn4U65M_23wGOp1xAhNnlJoq_2WL6kg";
const endpoint = "us-central1";
const parent = "hubstruct-helpcenter";

const baseURL = `https://${endpoint}-run.googleapis.com`;

const domainMappings = `https://${endpoint}/apis/domains.cloudrun.com/v1/${parent}/domainmappings`;

const requestURL = `${domainMappings}?key=${gcp_api_key}`;

function requestData() {
  return request(requestURL, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(body.url);
    console.log(body.explanation);
    return body;
  });
}

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Goodbye to a ${name}!`);
});

app.get("/data", async (req, res) => {
    const data = await requestData();
    res.send(data);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
