# 🎮 VERSUS BackEnd
**Community application allowing game players and their communities to quickly organize events together.**

<br />

Versus is a training project developed in one month *(4 Sprints)* with the same stack and under the same conditions as a real project.

:flower_playing_cards:[Link to the FrontEnd Repository](https://github.com/O-clock-Cheesecake/projet-5-versus)

<br />

## Technological Stack
Application Programming Interface built using [Express](https://expressjs.com/fr/), [PostgreSQL](https://www.postgresql.org/) and [Sequelize](https://sequelize.org/) through [Node](https://nodejs.org/en).

<br />

## Dependencies
- [dotenv](https://www.npmjs.com/package/dotenv)
- [eslint](https://www.npmjs.com/package/eslint)
- [nodemon](https://www.npmjs.com/package//nodemon)

<br />

## :arrow_right: Endpoints

### Event

- **(GET)** Get all events : `/events`
- **(GET)** Get an event : `/event/1`
- **(POST)** Create a new event : `/event`
- **(DELETE)** Delete an event : `/event/1`
- **(PATCH)** Update an event : `/event/1`
- **(PATCH)** Register at an event  : `/event/1/register`
- **(PATCH)** Unregister from an event : `/event/1/unregister`

### User

- **(GET)** Get an user : `/user/1`
- **(PATCH)** Update an user : `/user/1`
- **(GET)** Get all events of an user : `/user/1/events`
- **(GET)** Get all teams of an user : `/user/1/teams`

### Preferences

- **(PATCH)** Update user prefered platforms : `/user/1/preferences/platforms`
- **(PATCH)** Update user prefered games : `/user/1/preferences/games`

### Authentification

- **(POST)** Create a new user : `/signup`
- **(POST)** Sign-in : `/login`

<br />

## :computer: Local Database Initialization

Launch the Postgres server

```bash
  sudo -i -u postgres psql
```

Create a new user

```bash
  CREATE ROLE versus WITH LOGIN PASSWORD 'versus';
```
  (\du - to get all the users)

Create the database

```bash
  CREATE DATABASE versus WITH OWNER versus;
```
  (\du - to get all the databases)

Connect to the database

```bash
  \c versus versus;
```
  (\conninfo - to check the db)

<br />

## :computer: Database Creation and Seeding 

Create the tables

```bash
  npm run db:create
```

Populate the tables

```bash
  npm run db:seed
```

Reset the database
```bash
  npm run db:reset
```

<br />

## :notebook_with_decorative_cover: Acknowledgements

 - [Documents d'élaboration du projet](https://github.com/O-clock-Cheesecake/projet-5-versus/wiki)
 - [Cahier des charges](https://docs.google.com/document/d/1bTD5kVhkD7utuCIPbLkuoNbhCruBuwi9tcCYeXgs8Hc/edit#heading=h.k2mrd19y696k)

<br />

## :coffee: Authors

- [@Sasha-Polgar](https://github.com/Sasha-Polgar)
- [@mMormin](https://github.com/mMormin)
- [@KimberleyBonix](https://github.com/KimberleyBonix)
- [@rami-rostom](https://github.com/rami-rostom)
- [@WilliamViranin](https://github.com/WilliamViranin)