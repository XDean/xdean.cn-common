CREATE DATABASE IF NOT EXISTS xdean;

USE xdean;

CREATE TABLE IF NOT EXISTS obj_likes
(
    obj_id  VARCHAR(256)                        NOT NULL,
    user_id INT                                 NOT NULL,
    time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UNIQUE INDEX obj_likes_unique_idx (obj_id, user_id)
);

CREATE TABLE IF NOT EXISTS obj_reads
(
    obj_id  VARCHAR(256)                        NOT NULL,
    user_id INT                                 NOT NULL,
    time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UNIQUE INDEX obj_reads_unique_idx (obj_id, user_id)
);