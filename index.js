const express = require("express");
const app = express();

const request = require("request");

const gcp_api_key = "AIzaSyC1Wn4U65M_23wGOp1xAhNnlJoq_2WL6kg";
const region = "us-central1";
const parent = "hubstruct-helpcenter";

const endpoint = `https://${region}-run.googleapis.com`;

const domainMappings = `apis/domains.cloudrun.com/v1/namespaces/${parent}/domainmappings`;

const domainMappingsTest = `apis/domains.cloudrun.com/v1/${parent}/domainmappings`;

const requestURL = `${endpoint}/${domainMappings}?key=${gcp_api_key}`;

function returnBoiler(data) {
  return `
     <!DOCTYPE html>
    <html>
    <body>
    test
    ${data}
    </body>
    </html>
`;
}

function requestData() {
  return request(requestURL, { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("test");
    console.log("response: ", res);
    console.log("body: ", body);
    return body;
  });
}

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Goodbye to a ${name}!`);
});

app.get("/data", async (req, res) => {
  const data = await requestData();
  //   res.send(returnBoiler(data));

  request(requestURL, { json: true }, (err, response, body) => {
    if (err) {
      return console.log(err);
    }
    console.log("test");
    console.log("response: ", response);
    console.log("body: ", body);
    res.send(body);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
