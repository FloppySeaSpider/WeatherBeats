-- CREATE DATABASE
CREATE database WeatherBeatsDB;

-- CREATE TABLES FOR THE USERS DATABASE
CREATE TABLE `FavoriteSongs`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `song_name` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `FavoriteSongs` ADD PRIMARY KEY `favoritesongs_user_id_primary`(`user_id`);
CREATE TABLE `User`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email_address` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `profile_picture` BIGINT NOT NULL,
    `spotify_Oauth_id` BIGINT NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `User` ADD PRIMARY KEY `user_user_id_primary`(`user_id`);
ALTER TABLE
    `FavoriteSongs` ADD CONSTRAINT `favoritesongs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);