# Deployment

(todo) To deploy, just git push to the master branch

Until then:

1. SSH into the EC2 instance
2. Git pull
3. `npm install`
4. `cd client && npm install && npm run build`
5. `pm2 start bin/www`

Server should be running at http://ec2-18-117-233-70.us-east-2.compute.amazonaws.com:3000/



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
git clone https://github.com/dharik/nerp-typeform.git
cd nerp-typeform
npm install pm2 -g
```

# Ideas

* Expiring surveys or surveys with public results
  * Add expires_at, public_at
  * If user wants it to expire, just set expires_at. Then no more responses accepted
  after that date
  * If user wants it to be public, set public_at. After then, responses can be
  made public
  * Similarly, add starts_at to limit when responses can begin. Or public_until to limit
  how long responses are public for

* My surveys (via login)
  * Add _users_surveys join table

* My surveys (without login)
  * Append owner token to a localStorage item

# Todo

* Add dotenv
* Deploy on EC2 + RDS
* CI/CD
* Add helmet for security
* Add prettierrc file
* Limit cors origins
* Handle error when token isn't a valid UUID

# Surveys module



# Scalability

__Would start with context about typical responses/tokens per survey 
& how many questions expected per survey.__

* `survey_tokens` and `survey_responses` will likely outnumber `surveys` because
at least 2 survey_token records are created for every `survey` and probably 2+
responses would be created for every survey.

* Surveys have all of their questions stored in a json column in the surveys table.
This app only cares about one survey at a time so memory usage probably won't be
a concern

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



# Things to learn about Node backend

* HOT RELOAD
* Is there a repl? I run `node` in the directory and have to `require()` every file?
There's got to be a way to run the equivalent of `irb`
* Since JS's standard lib is lacking, just use lodash + moment? Anything better yet?
* Express vs Hapi vs others
* Auth - looks like Passport is the standard. Seems similar to Elixir's Pow - middleware
+ strategies
* Error handling practices - I noticed the whole server goes down if one request errors out
  I saw `pm2` is what people use. A) Avoid errors in the first place B) catch them in middleware?
* Env config (dotenv)
* Database migration patterns?


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