-- Should use db dump without data but just copied and pasted from postico for convenience


-- Table Definition ----------------------------------------------

CREATE TABLE survey_responses (
    id BIGSERIAL PRIMARY KEY,
    survey_id BIGSERIAL REFERENCES surveys(id) ON DELETE CASCADE ON UPDATE CASCADE,
    response_data jsonb,
    inserted_at timestamp(0) without time zone NOT NULL DEFAULT now(),
    updated_at timestamp(0) without time zone NOT NULL DEFAULT now()
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX survey_responses_pkey ON survey_responses(id int8_ops);
CREATE INDEX survey_responses_on_survey_id ON survey_responses(survey_id int8_ops);

-- Table Definition ----------------------------------------------

CREATE TABLE surveys (
    id BIGSERIAL PRIMARY KEY,
    private_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    public_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    inserted_at timestamp(0) without time zone NOT NULL DEFAULT now(),
    questions jsonb NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX surveys_pkey ON surveys(id int8_ops);
CREATE UNIQUE INDEX surveys_private_id_key ON surveys(private_id uuid_ops);
CREATE UNIQUE INDEX surveys_public_id_key ON surveys(public_id uuid_ops);
