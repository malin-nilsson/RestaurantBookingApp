# Restaurant Booking App 📅 🍽️
Fullstack MERN app using TypeScript, Styled components, authentication, React Router and React Context.

## Table of contents
- [Overview](#overview)
- [Installation](#installation)
- [Testing with Cypress](#cypress)
- [Email confirmation setup](#nodemailer)
- [Access admin](#admin)
- [Login credentials](#login-credentials)
- [Screenshots](#screenshots)
- [Tools](#tools)

## Overview
This is a school project where we were tasked to create a booking system for a restaurant. 

Guests can make online reservations and receive an email confirmation along with a cancellation link. 

The restaurant has 15 tables, each seating up to 6 guests. We’ve added functionality to accommodate larger groups as well, in that case the system will reserve the right amount of tables needed.

The project features full authentication for admin/staff who can log in and perform CRUD operations (access all bookings, add, edit and remove bookings). 

End-to-end tests were implemented using Cypress.

## Installation
1. Clone the repo\
`git clone https://github.com/19ozman/la_mere`

2. CD into repo\
`cd la_mere`

3. Create a .env file\
To run this application you'll need the following environment variables in a .env file in the backend folder:\
PORT=4000\
MONGO_URI=”your MongoDB connection string/LA_MERE”

4. Start server\
`cd backend`\
`npm run dev`

5. Run React \
Open a new terminal\
`cd frontend`\
`npm start`

## Testing with Cypress:
1. Open terminal and cd into root directory\
`cd ..`

2. Install NPM packages\
`npm install`

3. Start Cypress\
`npx cypress open`

## Email confirmation
1. Sign in or create a free Gmail account. In the Security tab, activate 2 step verification and create an app password:\
https://myaccount.google.com/security

2. Add the credentials (your email address and app password) to variables in your .env file:\
MAIL_USER=”Your email address”\
MAIL_PASS=”Your app password”

## Access admin

1. Make sure to use the file - `"admins.json"` - and import it to `MongoDB`.

2. File is located in - `backend/db/admins.json`

3. Connect to your `MongoDB`

5. In MongoDB client when connected:

`LA_MERE =>`

`Create collection =>`

`"admins" =>`

`"ADD DATA" =>`

`"Import File" =>`

`"admins.json"`

## Login Credentials

Login at `"http://localhost:3000/admin"`

Admin: `EMAIL: admin@admin.io` - `PASS: admin`

Employee: `EMAIL: user@user.io` - `PASS: user`

`localhost:4000/admin/manage` is `NOT` fully functional yet.

## Screenshots
![](./frontend/public/assets/screenshot-landingpage.jpg)
![](./frontend/public/assets/screenshot-reservation.jpg)
![](./frontend/public/assets/screenshot-admin.jpg)
![](./frontend/public/assets/screenshot-admin-search.jpg)

## Tools
React\
TypeScript\
MongoDb\
Node\
Mongoose\
Nodemailer\
Cypress
