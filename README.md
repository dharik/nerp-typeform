# Local development

* VSCode has a great dev containers extension so you can isolate your dev env
* Make your `.env` file and configure appropriately. Use `.env.sample` as a starting point
* `npm run start` to run backend
* `npm run start` to run CRA (in `client/` folder)

# Deployment

(deployment with git push to master is WIP)

1. SSH into the EC2 instance `ssh -i "nerpkey.pem" ec2-user@ec2-18-117-233-70.us-east-2.compute.amazonaws.com`
2. `cd nerp-typeform`
2. `git pull`
3. `npm install`
4. `cd client && npm install && npm run build`
5. `pm2 start bin/www` or `pm2 reload all`

Server should be running at 
http://ec2-18-117-233-70.us-east-2.compute.amazonaws.com:3000/

### Database access: SSH tunnel through the EC2 instance

In postico, use the connect via SSH option.
Get database password from amazon secrets manager


### AMI setup
```
sudo yum update
sudo yum install git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# source .bashrc
nvm install 16 # 18 doesn't work with the amazon linux ami
nvm use 16
nvm default alias 16
git clone https://github.com/dharik/nerp-typeform.git
cd nerp-typeform
npm install pm2 -g
```

# Ideas

* Expire survey/token
* Public results by survey/token
* My surveys
  * owner tokens in localStorage, or passport + users table + _users_surveys table

# Todo

* Figure out how to do EC2 -> RDS connection without manually setting
db password env var. I disabled the pass rotation to get this released
but I think using secrets manager to get the db password is a better
approach
* Add bug tracking (ie bugsnag or equivalent)
* CI/CD setup
* Add helmet for extra security headers
* Add prettierrc file
* Limit cors origins
* Handle error when token isn't a valid UUID (server crashes instead of 404)
* I used manual fetch() calls in the frontend. I'd set up a utility fetch()
function to always set `application/json` header, await, etc

# Scalability

__Would start with context about typical responses/tokens per survey 
& how many questions expected per survey.__

* `survey_tokens` and `survey_responses` will likely outnumber `surveys` because
at least 2 survey_token records are created for every `survey` and probably 2+
responses would be created for every survey.

* Surveys have all of their questions stored in a json column in the surveys table.
This app only cares about one survey at a time so memory usage probably won't be
a concern if the # of questions in a survey is large (100+)

* Surveys with many (10k+) tokens or responses can be problematic on the frontend.
A virtual list/table component would alleviate that. 

* Surveys with many (10k+) responses may take a while to load results. I'm assuming
it's not a big deal for users to wait a few moments. Totally depends on the user.
Would go for pagination if it was an issue.

* Surveys with many (10k+) responses may eat up backend server memory. Since this data
is only kept for the life of the request, depends on how many requests we get. Again,
I'd reach for pagination if that started to become a problem. My guess is users don't 
load survey results of that size often. Tracking load times for each API request would 
be a good preventantive measure. Retrace & Prometheus look like the go-to

* An attacker could hit the API with lots of fake survey responses. Which could
force the database to save massive amounts of junk data. IP based throttling,
captchas, honey pots could help.

* Add load balancer and distribute requests to multiple EC2 instances or
switch to lambdas & api gateway

* Aggregate survey results on backend vs passing responses w/ question data.
Especially once multiple questions can be created per survey, displaying
results will require some log. IE every question may map to a column, but
what should that column header be? What if the survey questions changed 
after having results already?




# Things to learn about Node backends

* HOT RELOAD
* Is there a repl? I run `node` in the directory and have to `require()` every file?
There's got to be a way to run the equivalent of `irb`
* Since JS's standard lib is lacking, just use lodash + moment? Anything better yet?
* Express vs Hapi vs others
* Auth - looks like Passport is the standard as middleware
* Error handling practices - I noticed the whole server goes down if one request errors out
  I saw `pm2` is what people use. A) Avoid errors in the first place B) catch them in middleware?
* Env config best practices
* Debugging best practices (`console.error` vs logger?)
* Database migration patterns?
* Would like to use `import` instead of `require()`


# Testing

* It's a pretty simple app. I wouldn't write tests unless I knew there may be
high-churn on the codebase or this is a high-value app for the business
* I'd start with e2e tests with Cypress or equivalent.
  * Create survey
  * Submit response
  * Add a new share link
  * Submit another response with the share link
  * Check survey owner page for at least 2 responses with
    different sources
* Unit tests for the `surveys.js` module
* Integration test to hit API and check survey creation, sumit response, new response is in response list

# Tech stack

* I used plain old Express. I think it's a good choice. There are other
paths like Nest.JS, but that would've taken too long to learn and probably
overkill. I like how simple this ended up.

* I used react (to match an existing tech stack) but the only spot
React *really* makes sense is the survey create flow. Answering survey
and viewing responses + creating share links can easily have been
server-rendered pages.

* I didn't use typescript, again to match an existing tech stack, but
I definitely would have otherwise

* I deployed on EC2 + RDS to match existing tech stack. But I could have
tried a few other options:
  * Host frontend on netlify (or equivalent)
  * Backend on lambdas
  * Elastic beanstalk has a node/postgres template. Could be better
    if that handles autoscaling and EC2 <-> RDS security / config
  * Heroku or equivalent

* Did not use an ORM, again to match an existing tech stack. I think it'd
have been worth it given how simple this app is

* Needed a custom domain to use https. If I had one I would've had nginx
on the ec2 instance to proxy traffic on :443 or :80 to node's :3000.
