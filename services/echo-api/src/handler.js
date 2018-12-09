'use strict';

module.exports.echo = async(evt) => {
   // By default we set up the response object for an APIGW response.
   let resp = { statusCode: 200, headers: { 'Content-Type': 'application/json' } },
       addl = { integrationType: 'apigw', message: 'This is an API Gateway request' };

   // If our function is getting invoked from an Application Load Balancer (ALB), then the
   // response format is slightly different. See [TODO: insert link to training site
   // article here] for more details.
   if (evt.requestContext && evt.requestContext.elb) {
      resp = { ...resp, ...{ statusDescription: '200 OK', isBase64Encoded: false } };
      addl = { integrationType: 'alb', message: 'This is an Application Load Balancer request' };
      // Similarly, if the ALB is configured to _send_ you multi-value headers for the
      // request, then you must also _respond_ with multi-value headers, so we make this
      // simple map function.
      if (evt.multiValueHeaders) {
         resp.multiValueHeaders = Object.keys(resp.headers).reduce((memo, k) => {
            memo[k] = [ resp.headers[k] ];

            return memo;
         }, {});
      }
   }

   resp.body = JSON.stringify({
      ...addl,
      requestEvent: evt,
   });

   return resp;
};
