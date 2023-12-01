# VERSUS - Back

Pour installer la base de données de VERSUS en local, il suffit de suivre ces quelques étapes.

## Création de la base de données en local

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
