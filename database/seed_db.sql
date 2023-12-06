BEGIN;

INSERT INTO "role"("id", "name") VALUES
(1, 'admin'),
(2, 'member');

INSERT INTO "user"("id", "username", "email", "password", "avatar", "role_id") VALUES
(1, 'ramirez', 'rami@versus.gg', 'ramirez', null, 2),
(2, 'sasha_de_porte_de_la_chapelle', 'sasha@versus.gg', 'sasha', null, 2);

INSERT INTO "social"("id", "name", "link", "user_id") VALUES
(1, 'Discord', 'http://discordapp.com/users/1090616418468380723', 1),
(2, 'Twitch', 'https://www.twitch.tv/sasha', 2);

INSERT INTO "team"("id", "name") VALUES
(1, 'Versus'),
(2, 'Le 18ème');

INSERT INTO "platform"("id", "name") VALUES
(1, 'PC'),
(2, 'Playstation 5'),
(3, 'Playstation 4'),
(4, 'Xbox Series'),
(5, 'Xbox One'),
(6, 'Nintendo Switch'),
(7, 'Mobile'),
(8, 'Rétro');

INSERT INTO "game"("id", "name", "thumbnail") VALUES
(1, 'Trackmania', 'https://static-cdn.jtvnw.net/ttv-boxart/687129551_IGDB-285x380.jpg'),
(2, 'GTA V', 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg'),
(3, 'Call of Duty', 'https://static-cdn.jtvnw.net/ttv-boxart/1337444628_IGDB-285x380.jpg'),
(4, 'Super Mario Smash Bros Ultimate', 'https://static-cdn.jtvnw.net/ttv-boxart/504461_IGDB-285x380.jpg'),
(5, 'PUBG: Battlegrounds', 'https://static-cdn.jtvnw.net/ttv-boxart/493057-285x380.jpg'),
(6, 'Valorant', 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg'),
(7, 'League of Legends', 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg'),
(8, 'Minecraft', 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg'),
(9, 'Star Citizen', 'https://static-cdn.jtvnw.net/ttv-boxart/71375_IGDB-285x380.jpg'),
(10, 'Fortnite', 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg');

INSERT INTO "type_event"("id", "name") VALUES
(1, 'Tournoi'),
(2, 'Speedrun'),
(3, 'Concours'),
(4, 'Roleplay'),
(5, 'Autre');

INSERT INTO "event"(
  "id", 
  "title",
  "title_slug", 
  "start_date", 
  "end_date", 
  "banner",
  "thumbnail", 
  "location", 
  "status", 
  "description", 
  "rules", 
  "contact", 
  "type_event_id", 
  "game_id", 
  "user_id"
  ) VALUES
(1, 'Returnal - Speedrun by VERSUS', null, '01/01/2024', '01/01/2024', null, null, 'En ligne', 'draft', 'Compétition de speedrun du jeu Returnal', null, 'ramirez@versus.gg', 2, 1, 1);

INSERT INTO "user_has_team"("id", "user_id", "team_id") VALUES
(1, 1, 1);

INSERT INTO "user_like_team"("id", "user_id", "team_id") VALUES
(1, 1, 2);

INSERT INTO "user_like_user"("id", "user_id", "user_liked_id") VALUES
(1, 1, 2);

INSERT INTO "user_like_platform"("id", "user_id", "platform_id") VALUES
(1, 1, 1),
(2, 1, 2);

INSERT INTO "user_like_game"("id", "user_id", "game_id") VALUES
(1, 1, 1),
(2, 1, 2);

INSERT INTO "game_has_platform"("id", "game_id", "platform_id") VALUES
(1, 1, 1),
(2, 1, 2);

INSERT INTO "event_has_user"("id", "event_id", "user_id") VALUES
(1, 1, 1),
(2, 1, 2);

COMMIT;