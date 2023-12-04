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

INSERT INTO "game"("id", "name") VALUES
(1, 'Returnal'),
(2, 'Hadès'),
(3, 'League of Legends'),
(4, 'Super Mario Smash Bros Ultimate'),
(5, 'PUBG: Battlegrounds'),
(6, 'Valorant');

INSERT INTO "type_event"("id", "name") VALUES
(1, 'Tournoi'),
(2, 'Speedrun'),
(3, 'Concours'),
(4, 'Roleplay'),
(5, 'Autre');

INSERT INTO "event"(
  "id", 
  "title", 
  "start_date", 
  "end_date", 
  "banner", 
  "location", 
  "status", 
  "description", 
  "rules", 
  "contact", 
  "result", 
  "type", 
  "game", 
  "organizer"
  ) VALUES
(1, 'Returnal - Speedrun by VERSUS', '01/01/2024', '01/01/2024', null, 'En ligne', 'draft', 'Compétition de speedrun du jeu Returnal', null, 'ramirez@versus.gg', null, 2, 1, 1);

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
(1, 1, 1);

COMMIT;