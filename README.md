# FanVerse - fanVerse-server - Backend codebase for the FanVerse project

## Overview

"FanVerse" is a dynamic sports social network tailored for football and lawn tennis enthusiasts. It's a hub where fans unite to discuss, share, and celebrate their favorite sports. With personalized profiles, engaging fan clubs, live match updates, and interactive group discussions, FanVerse creates a vibrant space for fans to connect, stay updated, and engage in the exciting world of football and tennis.

### Tech Stack

Backend:

- Node.js, Express.js, Knex.js.
- Database (SQl).

### Features

Users

- Users can sign up and choose prefered sport, log in, and create personalized profiles.
- Users homefeed would have posts of different users with same choice of sport.
- Users can like other users posts
- Users can create their own post and it shows on the home feeed
- Users can delete posts
- Users can edit profile

### Installation

Backend:

- clone the repo
- npm i (to install all the dependencies)
- run knex
- create a database
- edit your knex file
- run migratin and seed
- npm start

### API Reference

Users:

GET api/users
  - Retrieves the list of all users from the Db

GET api/users/:id
  - Retrieves a specific user from the users table
    
DEL api/users/:id
  - Deletes a specific user from the users table

POST /user-auth/login
  - Implements user login

POST /user-auth/register
  - Creates a new user on signup

GET /profile
  - Gets the profile of a logged in user

Posts:

GET /posts
  - Retrieves the list of all posts from the Db
    
GET /posts?sports_type="sportyType"
  - Retrieves the list of all posts according to "sportyType" from the Db

GET /posts/user/:user_id
  - Retrieves all the posts of a specific user_id from the post table

GET /posts/:id
  - Retrieves a specific post from the post table

POST /posts/
  - Creates a new post

DEL /posts/:id
  - Deletes a specific post from the post table

### Next Steps

Live Match Updates:

- Real-time updates on live football and tennis matches.
- Display match schedules for upcoming games and past results.

Fan Clubs:

- Join existing fan clubs.
- Create new fan clubs and invite others to join.

Interactive Discussions:

- Discussion forums for live match conversations.
- Comment, like, and share posts within the forums.

Notifications:

- Receive notifications for new discussions, match updates, and club activities.

OAuth:

- Implement OAuth login with Facebook, Google and Apple.

Advanced User Profiles:

- Additional user details, profile customization.

Gamification Elements:

- Achievements, badges for active users.

Expanded Data Sources:

- Integration with additional sports data APIs.

Mobile Application:

- Develop a mobile version of the app for wider accessibility.

Analytics Dashboard:

- User engagement analytics for administrators.

# 🫶🏽
