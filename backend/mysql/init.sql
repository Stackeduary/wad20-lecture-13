CREATE DATABASE IF NOT EXISTS lecture13;
CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON lecture13.* TO 'user'@'localhost';

USE lecture13;

CREATE TABLE IF NOT EXISTS user
(
    id          INTEGER UNSIGNED AUTO_INCREMENT,
    firstname   VARCHAR(255) NULL,
    lastname    VARCHAR(255) NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    salt        VARCHAR(32)  NULL,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    delete_time DATETIME     NULL,
    CONSTRAINT user_pk
        PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS note
(
    id          INT AUTO_INCREMENT,
    user_id     INTEGER UNSIGNED NOT NULL,
    title       VARCHAR(255)     NULL,
    content     text             NULL,
    create_time DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    delete_time DATETIME         NULL,
    CONSTRAINT note_pk
        PRIMARY KEY (id)
);

INSERT INTO lecture13.user (id, firstname, lastname, email, password, salt)
VALUES (1, 'John', 'Doe', 'test@test.com', 'fefb8f39c4f6bcdf2aad9c16e5e02153630b4f74f349159a27621f08cf470793',
        'YwKmGdImueE4mFl6i5QUFKK6s9ZgZQmJ')
ON DUPLICATE KEY UPDATE firstname=VALUES(firstname),
                        lastname=VALUES(lastname),
                        email=VALUES(email),
                        password=VALUES(password),
                        salt=VALUES(salt);

INSERT INTO lecture13.user (id, firstname, lastname, email, password, salt)
VALUES (2, 'Foo', 'Bar', 'foo@bar.com', 'a44ad9c42868f055567a6c2f63dc1f78c61c031034b03fe38983521e7c7d2d7e',
        'TTZgF2s9hSQ6m3lvCtp3xUWVuUPjZfBY')
ON DUPLICATE KEY UPDATE firstname=VALUES(firstname),
                        lastname=VALUES(lastname),
                        email=VALUES(email),
                        password=VALUES(password),
                        salt=VALUES(salt);

INSERT INTO lecture13.note (id, user_id, title, content)
VALUES (1, 1, 'John\'s Note 1', 'John\'s Note 1 Content'),
        (2, 1, 'John\'s Note 2', 'John\'s Note 2 Content'),
        (3, 2, 'Foo\'s Note 1', 'Foo\'s Note 1 Content'),
        (4, 2, 'Foo\'s Note 2', 'Foo\'s Note 2 Content')
ON DUPLICATE KEY UPDATE user_id=VALUES(user_id),
                        title=VALUES(title),
                        content=VALUES(content);
