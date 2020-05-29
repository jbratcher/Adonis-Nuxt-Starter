<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/bjkY5NF.png" alt="Project logo"></a>
</p>

<h3 align="center">Adonis Nuxt Starter</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/jbratcher/Adonis-Nuxt-Starter.svg)](https://github.com/jbratcher/Adonis-Nuxt-Starter/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/jbratcher/Adonis-Nuxt-Starter.svg)](https://github.com/jbratcher/Adonis-Nuxt-Starter/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This project features an integrated Adonis/Nuxt full-stack application created as a starter template for Progressive Web Applications(PWAs).
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)

## 🧐 About <a name = "about"></a>

Featuring a full user module, example CRUD resources, and web optimization, this starter project pre-installs and configures a lot of common needs for you out of the box. It was built with the intent to give the developer a powerful base starting point with a lot of things every app need set up for you.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

Clone the repo locally

`git clone git@github.com:jbratcher/Adonis-Nuxt-Starter.git myProject`

Install the dependencies

`cd myProject && npm install`

Run the server

`adonis serve --dev`

Run the client

`npm run dev`

### Prerequisites

You will need to have Node and npm installed.

### Installing

Once the above steps are complete, you should create a `.env` file.

`cp .env.example .env`

The `.env` file is where you will tell Adonis your database and mail settings.

#### Database

By default, this project uses Sqlite for the data layer but this can be easily changed in the `.env` file.

```js
DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=adonis
```

If you use another database type, you will need to [install the appropriate driver](https://adonisjs.com/docs/4.1/database#_supported_databases).

#### Mailer

The default mail settings use smtp through gmail.

In `.env`:

```js
MAIL_CONNECTION=smtp
SMTP_PORT=465
SMTP_HOST=smtp.gmail.com
MAIL_USERNAME=youraddress@gmail.com
MAIL_PASSWORD=Y0urPa$$w0rd!
```

The Gmail SMTP provider was chosen to provide a free and simple mailer for starter projects. This provider is limited to sending 500 emails per day. You may also need to [change your Gmail account settings](https://hotter.io/docs/email-accounts/secure-app-gmail/) in regards to allowing your local development environment interact with this service.

#### Migrations

After your database is set up, you should run migrations. This will allow you to manage users and use CRUD operations for the example resources.

In the terminal:

`adonis migration:run`

The project does come with some faked resource data in a seeder. If you would like to auto populate this data, make sure to run migrations with the seed flag.

`adonis migration:run --seed`

### Start Creating

At this point you should be able to start customizing the application to your requirements.

### Current Features:

- User Module

  - Register, login, logout, and manage user profiles
  - New registration email with link to verify account
  - Forgot password/password reset
  - Authentication and Authorization

- Example CRUD

  - Adonis migration, model and controller
  - Adonis CRUD routes
  - SQlite3 Database with example resource table
  - Nuxt CRUD operations with Vuex methods

## Build Setup (Nuxt Client)

```bash
# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
