'use strict';

module.exports.echo = async(evt) => {
   const resp = { statusCode: 200, body: 'this entire JSON object, stringified' };

   resp.body = JSON.stringify({
      message: 'This is an API Gateway response',
      integrationType: 'apigw',
      requestEvent: evt,
   });

   return resp;
};
