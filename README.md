# VERSUS - Back

## Endpoints de l'API

- **(GET)** Récupérer tous les événements : `/events`
- **(GET)** Récupérer un événement : `/event/1`
- **(POST)** Créer un événement : `/event`
- **(PATCH)** Modifier un événement : `/event/1`
- **(PATCH)** S'inscrire à un événement : `/event/1/register`
- **(DELETE)** Supprimer un événement : `/event/1`

## Création de la base de données en local

Pour installer la base de données de VERSUS en local, il suffit de suivre ces quelques étapes.

- Lancer le serveur Postgres en local : `sudo -i -u postgres psql`
- Créer l'utilisateur "versus" : `CREATE ROLE versus WITH LOGIN PASSWORD 'versus';`
  - `\du` pour vérifier
- Créer la base de donnée "versus" : `CREATE DATABASE versus WITH OWNER versus;`
  - `\l` pour vérifier
- Se connecter à la base de donnée : `\c versus versus`
  - `\conninfo` pour vérifier

## Script SQL (création + seeding)

- Pour créer les tables : `npm run db:create`
- Pour alimenter les tables : `npm run db:seed`
- Pour réaliser les deux en même temps : `npm run db:reset`
