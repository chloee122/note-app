
# Full-stack NoteApp

A MERN stack note web app that lets users log into their accounts, view, make changes and create notes.

👉🏻 Hosted website: https://noteapp-1-49bk.onrender.com

👤 **Test account**

username: test

password: salainen


## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/04279120-7f92-4eb8-862b-91fa0e6a2f05)


## Tech Stack

- React
- NodeJS
- Express
- TypeScript
- MongoDB, Mongoose
- styled-components
- Node Test/Vitest/Playwright
- Eslint, typescript-eslint

## Features

- Log in/log out user accounts
- View list of notes
- Change notes’ state
- Create new notes


## Getting started
### Pre-requisites:
**MongoDB Atlas**

In order to run the app locally, you need to specify `MONGODB_URI` environment variable to connect to a MongoDB cluster. If you don’t have any you can create one by signing up [MongoDB Atlas Free-tier](https://account.mongodb.com/account/login?_ga=2.193025005.1395841184.1719501982-1911830613.1716726475)


### Set up:
1. Clone the repo and install NPM packages

```bash
git clone https://github.com/chloee122/forkify-react.git
npm ci
```

2. Create a .env file and insert PORT, your MONGODB_URI and jwt’s SECRET

```bash
MONGODB_URI = "YOUR URI"
PORT = 3001
SECRET = "YOUR PASSWORD" 
```

3. To run the app, start both frontend and backend with below command. You will then be able to access it at localhost:5173

```bash
// For backend & frontend
npm run dev

```
## Running Tests

To run tests, run the following command

```bash
// For backend & frontend tests
npm run test
```

