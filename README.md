# Spaced repetition API!

# Aisance App
https://capstone-spaced-repetition-client.vercel.app/register

https://github.com/DevonReihl/Capstone-spaced-repetition-client

https://github.com/DevonReihl/Capstone-Spaced-repetition-API

## Getting Started

Clone the repository and run npm i
Create local Postgresql databases: spaced-repetition and spaced-repetition-test
Run npm run migrate and npm run migrate:test to update each database
To seed, use terminal to enter root of application and run: psql -d spaced-repettion -f ./seeds/seed.tables.sql
Run npm run dev to start the server locally

## Endpoints
POST /api/auth/token - lets the user log in
POST /api/user/ - registers a user
PUT /api/auth/token - retrieves a new JWT key
GET /api/language/ - retrieves a list of words for a user
POST /api/language/guess - post a guess word for a user

## Summary
Aisance App is an application that helps a user learn a language using the Spaced Repetition algorithm which is proven to increase users fluency (aisance). This version contains beginnings to learning the French language, starting with the English/French translations of common foods.

## Tech
Node
Express
PostgreSQL
Heroku
