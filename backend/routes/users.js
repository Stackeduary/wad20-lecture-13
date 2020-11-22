const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const db = require('../mysql/connection');
const jwt = require('jsonwebtoken');

const SECRET = 'tQ1uJ0KonS';

function hashPassword(password, salt) {
    return crypto.createHash('sha256').update(password + salt).digest('hex')
}

function createAccessToken(id, email) {
    let payload = {id, email};

    //create the access token with the shorter lifespan
    return  jwt.sign(payload, SECRET, {
        algorithm: "HS256",
        expiresIn: 120
    });
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch(err) {
        return false;
    }
}

router.post('/login', (request, response) => {

    let email = request.body.email;
    let password = request.body.password;

    const invalidCredentials = {
        code: 'invalid_credentials',
        message: 'User with such credentials can not be found'
    };

    const noCredentials = {
        code: 'no_credentials',
        message: 'Please provide email and password'
    };

    if (!email || !password) {
        response.json(noCredentials, 400);
        return;
    }

    db.query('SELECT * FROM user WHERE email = ?', [email], (err, rows) => {

        if (err) throw err;

        if (!rows.length) {
            response.json(invalidCredentials, 404);
            return;
        }

        let user = rows[0];

        let hashed = hashPassword(password, user.salt);

        if (hashed !== user.password) {
            response.json(invalidCredentials, 404);
            return;
        }

        response.json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accessToken: createAccessToken(user.id, user.email)
        })
    });
});

router.get('/:userId/notes', (request, response) => {

    let userId = request.params.userId;
    let accessToken = request.headers.authorization.slice(7);

    let authorized = verifyAccessToken(accessToken);

    if (!authorized) {
        response.json({ code: 'unauthorized'}, 401);
        return;
    }

    if (userId != authorized.id) {
        response.json({ code: 'unauthorized'}, 401);
        return;
    }

    db.query('SELECT * FROM note WHERE user_id = ? AND delete_time IS NULL', [userId], (err, rows) => {

        if (err) throw err;

        response.json(rows);
    });
});

module.exports = router;
