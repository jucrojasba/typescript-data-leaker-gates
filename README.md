# Project Documentation

## Overview

This project was initialized using `npm create vite@latest` with Vanilla JavaScript and TypeScript. It is a web application built with an MVC architecture, providing upload file and visualization features.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jucrojasba/typescript-read-file.git

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
The console will generate a link. Click on this link to open the web application in your browser.
   
## Features

The application includes the following features:

### Authentication

- **Login/Register:** Secure user authentication for both registration and login.
- **Session Persistence:** Session persistence through tokens to keep users logged in.

### User Interface

- **Home View:** A welcoming home page.

### Technical Details

- **MVC Architecture:** Ensures a clean separation of concerns.
- **Router Implementation:** Routes are protected and managed through a router.

## Environment Variables

Credentials and other sensitive information are stored in the .env file.

## Folder Structure

```
root/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── confirmations/
│   │   ├── modals/
│   │   ├── navbar/
│   │   ├── loader/
│   │   ├── deleteButton/
│   │   ├── editButton/
│   │   ├── create-city/
│   │   └── update-city/
│   ├── controllers/
│   ├── helpers/
│   ├── models/
│   ├── services/
│   └── views/
│       ├── private/
│       │   └── home/
│       └── public/
│           ├── login/
│           ├── register/
│           └── not-found/
```
