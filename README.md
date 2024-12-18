
# Jotly - Full-stack note-taking app

A MERN stack note-taking web app that lets users sign up, log in, and manage notes with features to view, create, edit, and delete them.

👉🏻 Hosted website: [https://noteapp-cys6.onrender.com](https://noteapp-cys6.onrender.com/)

👤 **Test account**

username: test_user

password: salainen


## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/527a173b-72b1-4776-ad79-be60f3c34177)


## Tech Stack

- React
- NodeJS
- Express
- TypeScript
- MongoDB, Mongoose
- styled-components
- Node Test/Vitest/Playwright
- Eslint, typescript-eslint
  
Other libraries:
- React Router
- Tiptap

## Features

- Sign up accounts
- Log in/log out user accounts
- View a list of notes with real-time update
- Create new notes
- View a specific note
- Write and edit a note with a rich text editor
- Delete a note


## Getting started
### Pre-requisites:
**MongoDB Atlas**

In order to run the app locally, you need to specify `MONGODB_URI` environment variable to connect to a MongoDB cluster. If you don’t have any you can create one by signing up [MongoDB Atlas Free-tier](https://account.mongodb.com/account/login?_ga=2.193025005.1395841184.1719501982-1911830613.1716726475)


### Set up:
1. Clone the repo and install NPM packages

```bash
git clone https://github.com/chloee122/NoteApp.git
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

