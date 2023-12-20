BEGIN;

INSERT INTO "role"("name") VALUES
('admin'),
('member');

INSERT INTO "user"("username", "username_slug", "email", "password", "avatar", "role_id") VALUES
('ramirez', 'ramirez', 'rami@hotmail.com', 'Ramirez1!', null, 2),
('sasha_de_porte_de_la_chapelle', 'sasha_de_porte_de_la_chapelle', 'sasha@hotmail.com', 'Password1!', null, 2),
('william', 'william', 'william@hotmail.com', 'Password1!', null, 2),
('maximedu92', 'maximedu92', 'maxime@hotmail.com', 'Password1!', null, 2),
('kimB', 'kimb', 'kim@hotmail.com', 'Password1!', null, 2);

INSERT INTO "social"("name", "link", "user_id") VALUES
('Discord', 'http://discordapp.com/users/1090616418468380723', 1),
('Twitch', 'https://www.twitch.tv/sasha', 2);

INSERT INTO "team"("name") VALUES
('Versus'),
('Le 18ème'),
('From Porte de la Chapelle to Saint-Michel'),
('Les Cheesecake'),
('Suresnes 92'),
('Kiko the Best');

INSERT INTO "platform"("name") VALUES
('PC'),
('PS5'),
('PS4'),
('Xbox Series'),
('Xbox One'),
('Nintendo Switch'),
('Mobile'),
('Rétro'),
('Cross platform');

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
('Trackmania by VERSUS', 'trackmania-by-versus', '2024/01/01', '2024/01/01', 'https://static-cdn.jtvnw.net/ttv-boxart/687129551_IGDB-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/687129551_IGDB-285x380.jpg', 'En ligne', 'published', 'Tournoi Trackmania by VERSUS. Quoi de mieux que commencer la nouvelle année en devenant le roi du bitume ! Cash prize : 100 000 $. Ne manquez pas ca et inscrivez-vous !', 'Pas de règles quand il y a 100K en jeu !', 'ramirez@versus.gg', 1, 1, 1, 1), 
('NYE GTA Online', 'nye-gta-online', '2023/12/31', '2024/01/01', 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg', 'En ligne', 'published', 'Pas de plan pour la Saint-Sylvestre ? Marre des soirées galères ? Rejoins cet event communautaire pour fêter la nouvelle année !', 'Mets ton plus bel outfit', 'ramirez@versus.gg', 4, 2, 1, 1), 
('COD Warzone by VERSUS', 'cod-warzone-by-versus', '2024/01/21', '2024/01/21', 'https://static-cdn.jtvnw.net/ttv-boxart/1337444628_IGDB-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/1337444628_IGDB-285x380.jpg', 'En ligne', 'published', 'Tournoi Call of Duty - Warzone par la communauté VERSUS ! Soit le dernier à survivre et fait gagner ta team ! Un cash prize ? Non encore mieux, instruis-toi avec L''Odyssée d''Homère !', 'Constitue une équipe de 3 et évite de jouer meta !', 'ramirez@versus.gg', 1, 3, 9, 1), 
('Tournoi Smash Bros #112', 'tournoi-smash-bros-112', '2024/02/01', '2024/02/01', 'https://static-cdn.jtvnw.net/ttv-boxart/504461_IGDB-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/504461_IGDB-285x380.jpg', 'En ligne', 'published', 'Tournoi Super Smash Bros. Ultimate #112 ! Participe à ce tournoi à rayonnement départemental et gagne ce super lot : un CDD de 3 mois en tant que développeur Fullstack JS !', 'RAS juste échauffe bien tes pouces.', 'ramirez@versus.gg', 1, 4, 6, 1), 
('LOL by VERSUS #001', 'lol-by-versus-001', '2024/01/12', '2024/01/12', 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg', 'En ligne', 'published', 'Le 1er tournoi League of Legends host by VERSUS ! Ne manque pas cet event, un tournoi qui deviendra incontournable des les prochaines années. Marque l''histoire en devenant avec ton équipe les 1ers vainqueurs ! Lot en récompense : une conférence Mantine.UI host by Kim B. et dégustation de takoyaki avec Maxime MB !', 'Consulter Sasha pour le réglement', 'ramirez@versus.gg', 1, 7, 1, 1), 
('Valorant Winter Cup', 'valorant-winter-cup', '2024/01/18', '2024/01/18', 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg', 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg', 'En ligne', 'published', '12ème édition de la Valorant Winter Cup. 20 équipes et 3 places qualificatives pour le podium à la Valorant Season Cup 2024 à L.A !', 'Le match est joué sur une map de deux manches de 12 rounds, la partie termine lorsque l''une des équipes atteint 13 rounds. En cas d''égalité à la fin du match, un overtime sera joué.', 'ramirez@versus.gg', 1, 6, 1, 1);

INSERT INTO "user_has_team"("user_id", "team_id") VALUES
(1, 1),
(1, 6),
(2, 2),
(2, 3),
(5, 1),
(5, 4),
(4, 5);

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