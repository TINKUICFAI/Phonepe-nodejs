const route = require("express").Router();
const { encodeRequest, signRequest } = require("./helpers");
var axios = require("axios");
const asyncHandler = require("express-async-handler");

//currently sending test credencials given by the phonepe

//phonepe url :- https://developer.phonepe.com/v1/reference/pay-api-1
const test_payload = {
  merchantId: "MERCHANTUAT",
  merchantTransactionId: "MT7850590068188104",
  merchantUserId: "MUID123",
  amount: 10000,
  redirectUrl: "https://webhook.site/redirect-url",
  redirectMode: "POST",
  callbackUrl: "https://webhook.site/callback-url",
  mobileNumber: "9999999999",
  paymentInstrument: {
    type: "PAY_PAGE",
  },
};

const resendOtp = async (req, res) => {
  const payload_base64 = encodeRequest(test_payload);
  const X_VERIFY = signRequest(
    payload_base64 + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
  );

  data = {
    request:
      "ewogICJtZXJjaGFudElkIjogIk1FUkNIQU5UVUFUIiwKICAibWVyY2hhbnRUcmFuc2FjdGlvbklkIjogIk1UNzg1MDU5MDA2ODE4ODEwNCIsCiAgIm1lcmNoYW50VXNlcklkIjogIk1VSUQxMjMiLAogICJhbW91bnQiOiAxMDAwMCwKICAicmVkaXJlY3RVcmwiOiAiaHR0cHM6Ly93ZWJob29rLnNpdGUvcmVkaXJlY3QtdXJsIiwKICAicmVkaXJlY3RNb2RlIjogIlBPU1QiLAogICJjYWxsYmFja1VybCI6ICJodHRwczovL3dlYmhvb2suc2l0ZS9jYWxsYmFjay11cmwiLAogICJtb2JpbGVOdW1iZXIiOiAiOTk5OTk5OTk5OSIsCiAgInBheW1lbnRJbnN0cnVtZW50IjogewogICAgInR5cGUiOiAiUEFZX1BBR0UiCiAgfQp9",
  };

  const headers = {
    "Content-Type": "application/json",
    "X-VERIFY":
      "2cd3a2cd04ff5b453df11e91f97b29fae10fe22522a29c1ae6b7fad41478d8b5###1",
    accept: "application/json",
  };

  let resData;
  await axios
    .post("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay", data, {
      headers: headers,
    })
    .then((res) => {
      console.log(res);
      resData = res.data;
    })
    .catch((err) => {
      console.log("errors", err);
    });

  return res.send({ message: "sucess", data: resData });
};

module.exports = resendOtp;
