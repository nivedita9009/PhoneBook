const express = require("express");
const CustomerDetailsRoute = express.Router();


const {
  getCustomerDetails,
  postCustomerDetails,
  updateCustomerDetails,
  deleteCustomerDetails } = require("../Controller/CustomerDetails");


  CustomerDetailsRoute.get("/api/viewcustomerdetails", getCustomerDetails);
  CustomerDetailsRoute.post("/api/insertcustomerdetail", postCustomerDetails);
  CustomerDetailsRoute.put("/api/updatecustomerdetails/:mobile", updateCustomerDetails);
  CustomerDetailsRoute.delete("/api/deletecustomerdetails/:mobile", deleteCustomerDetails);

module.exports = { CustomerDetailsRoute };
