const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json()); 
const port = 4999;


const { CustomerDetailsRoute } = require("./Routes/CustomerDetails");
app.use("/", CustomerDetailsRoute);


app.listen(port, () => {
  console.log(`server is running on.........${port}`);
});
