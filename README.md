# Ideas

* Send survey to specific users & track WHO
  * Add `private_id` UUID to `survey_responses`
  * Prefill `response_data` with something like `{name: 'Sponge Robert'}`
  * Creator can send special link like `/survey_response/${privateId}` or
  we can overload `/surveys/${publicId}` to find surveys OR responses
  * Add an `updateResponse()` in the surveys module
  * Add `status` to `survey_responses`, or just read the response_data and determine status
    * Backfill with `submitted` 
    * `viewed` means they used the private link and creator can see that

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


# Todo

* Rename `public_id` / `private_id` to `owner_token` or `viewer_token`
* Create `survey_tokens` table with id, token, survey_id, is_owner?, inserted_at, uses
* Add `survey_token_id` to `survey_responses` to track which token the response came from


# Surveys module

*  Instead of createResponse or listResponse using public/private ID,
they could use just surveyId. It might be a better DX for testing or script
writing.  But in the current usage, it's fine and convenient

# Scalability

TODO

# Testing

TODO

# Frontend
* Create survey screen
  * Question data editor
* View survey
  * Responses
  * Get trackable link
* Manage survey
  * Get responses
  * 