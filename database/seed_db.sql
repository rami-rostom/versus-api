BEGIN;

INSERT INTO "role"("name") VALUES
('admin'),
('member');

INSERT INTO "user"("username", "email", "password", "avatar", "role_id") VALUES
('ramirez', 'rami@versus.gg', 'Ramirez1!', null, 2),
('sasha_de_porte_de_la_chapelle', 'sasha@versus.gg', 'Password1!', null, 2);

INSERT INTO "social"("name", "link", "user_id") VALUES
('Discord', 'http://discordapp.com/users/1090616418468380723', 1),
('Twitch', 'https://www.twitch.tv/sasha', 2);

INSERT INTO "team"("name") VALUES
('Versus'),
('Le 18ème');

INSERT INTO "platform"("name") VALUES
('PC'),
('Playstation 5'),
('Playstation 4'),
('Xbox Series'),
('Xbox One'),
('Nintendo Switch'),
('Mobile'),
('Rétro'),
('Crossplatform');

INSERT INTO "game"("name", "thumbnail") VALUES
('Trackmania', 'https://static-cdn.jtvnw.net/ttv-boxart/687129551_IGDB-285x380.jpg'),
('GTA V', 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg'),
('Call of Duty', 'https://static-cdn.jtvnw.net/ttv-boxart/1337444628_IGDB-285x380.jpg'),
('Super Mario Smash Bros Ultimate', 'https://static-cdn.jtvnw.net/ttv-boxart/504461_IGDB-285x380.jpg'),
('PUBG: Battlegrounds', 'https://static-cdn.jtvnw.net/ttv-boxart/493057-285x380.jpg'),
('Valorant', 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg'),
('League of Legends', 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg'),
('Minecraft', 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-300x465.jpg'),
('Star Citizen', 'https://static-cdn.jtvnw.net/ttv-boxart/71375_IGDB-285x380.jpg'),
('Fortnite', 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg');

INSERT INTO "type_event"("name") VALUES
('Tournoi'),
('Speedrun'),
('Concours'),
('Roleplay'),
('Autre');

INSERT INTO "event"(
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
  "platform_id", 
  "user_id"
  ) VALUES
('Trackmania by VERSUS', 'trackmania-by-versus', '01/01/2024', '01/01/2024', null, null, 'En ligne', 'draft', 'Tournoi Trackmania by VERSUS', null, 'ramirez@versus.gg', 1, 1, 1, 1);

INSERT INTO "user_has_team"("user_id", "team_id") VALUES
(1, 1);

INSERT INTO "user_like_team"("user_id", "team_id") VALUES
(1, 2);

INSERT INTO "user_like_user"("user_id", "user_liked_id") VALUES
(1, 2);

INSERT INTO "user_like_platform"("user_id", "platform_id") VALUES
(1, 1),
(1, 2);

INSERT INTO "user_like_game"("user_id", "game_id") VALUES
(1, 1),
(1, 2);

INSERT INTO "game_has_platform"("game_id", "platform_id") VALUES
(1, 1),
(1, 2);

INSERT INTO "event_has_user"("event_id", "user_id") VALUES
(1, 1),
(1, 2);

COMMIT;