# Example Using Application Load Balancer With API Gateway

NOTE: This service requires the use of CloudFormation custom resources because when this
was written, CloudFormation had not yet been updated to support the Lambda/ALB
integration. You can deploy [the custom-resources service][crsvc] so that your account has
the necessary custom resources available.

## Purpose of Example

This service creates an application load balancer that integrates with Lambda to provide a
replacement for API Gateway.

**See [my how-to set up Application Load Balancer with Lambda tutorial] for more details.**


## Please Note

Here are a few important notes about using this stack.

### This Stack Costs Money When Idle

**This stack will cost you money. Be sure to remove it when you are done testing.** Unlike
most serverless stacks in this repo which will not cost you money when they are idle, this
stack uses [AWS' Application Load Balancer][ALB], which has [pricing][ALBPricing] that
includes per-hour charges (at time of writing, _$0.0225 per Application Load Balancer-hour
(or partial hour)_ plus some other usage-related charges). **Thus, if you leave the stack
set up in your account, you will start accruing charges (approx. $16 per month at this
time)**.

### How-to Remove the Stack

**To remove the stack, you must first empty the bucket that the Application Load Balancer
uses to write its logs.** Here's how to do that:

```
# Fill in the region that you deployed the service to.
# We're assuming you're using the default stage name, which is your username. If you're
# not, then replace the `$(whoami)` with your stage name.
aws s3 rm --recursive s3://alb-lambda-${REGION}-$(whoami)-logs/alb/
```

### Building the VPC Inside ALB Stack

This example stack builds a VPC inside the same stack that the load balancer is built in.
Normally, you wouldn't do that; you'd create a separate stack for your VPC. We're only
combining them into a single stack here to simplify the example and get you up-and-running
quicker. If you separate the VPC into its own stack, you can use CloudFormation stack
exports to export the values from the VPC stack that you'll need to import using
`Fn::ImportValue` in this stack (replacing places where the example uses `Ref`).


[crsvc]: ../custom-resources/
[ALB]: https://aws.amazon.com/elasticloadbalancing/
[ALBPricing]: https://aws.amazon.com/elasticloadbalancing/pricing/
[tut]: https://serverless-training.com/articles/how-to-set-up-application-load-balancer-with-lambda/
