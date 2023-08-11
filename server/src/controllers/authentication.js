const {User} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthenticationController {
    async signUp(req, res) {
        const request = req.body;
        const user = await User.findOne({
            where: {
                username: request.username,
                email: request.email,
                password: request.password,
            }
        });

        if (request.password != request.passwordConfirm) {
            return res.json('Passwords must match !');
        }

        if (user) {
            return res.json('User existed !');
        }

        User.create({
            username: request.username,
            email: request.email,
            password: request.password,
        })
        .catch(err => {
            console.log(err);
        });
        return res.json('User created successfully !');
    }

    async signIn(req, res) {
        const request = req.body;
        const user = await User.findOne({
            where: {
                email: request.email,
                password: request.password,
            }
        });
        if (!user) {
            return res.json('User not found !');
        }

        const accessToken = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: 86400,
        });
        const refreshToken = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, process.env.REFRESH_TOKEN_SECRET_KEY);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.json('Signed in successfully !');
    }

    checkAuth(req, res) {
        const accessToken = req.cookies.accessToken;
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, function(err, result) {
            if (err) {
                return res.json('not authenticated !');
            }
            return res.json('authenticated !');
        })
    }

    refresh(req, res) {
        const refreshToken = req.cookies.refreshToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, function(err, result) {
            if (err) {
                return res.json('Refresh token is not valid !');
            }
            const accessToken = jwt.sign({
                id: result.id,
                username: result.username,
                email: result.email,
            }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: 86400,
            });
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });
            return res.json('Refreshed token successfully !');
        });
    }

    signOut(req, res) {
        res.cookie('accessToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.json('Signed out successfully !');
    }

    getInfo(req, res) {
        const accessToken = req.cookies.accessToken;
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, function(err, result) {
            if (err) {
                return res.json('jwt expired !');
            }
            return res.json({
                id: result.id,
                username: result.username,
                email: result.email,
            });
        })
    }

    async getUserById(req, res) {
        if (isNaN(req.params.id)) {
            return res.json('Param is not valid !');
        }
        const user = await User.findByPk(req.params.id);
        return res.json({
            username: user.username,
            email: user.email,
            description: user.description,
            avatar: user.avatar,
        });
    }

    async update(req, res) {
        const request = req.body;
        const file = req.file;
        const user = await User.findByPk(request.id);
        user.username = request.username;
        user.email = request.email;
        user.description = request.description;
        if (file) {
            user.avatar = file.path;
        }
        await user.save();
        return res.json('Updated successfully !');
    }
}

module.exports = new AuthenticationController;