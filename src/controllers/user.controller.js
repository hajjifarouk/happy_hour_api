const JWT = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../configurations');
const mongoose = require('mongoose');


signToken = user => {
    return JWT.sign({
        iss: 'HappyHour',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password, role } = req.value.body;
        // Check if there is a user with the same email
        const foundUser = await User.findOne({ "local.email": email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use'});
        }
        // Create a new user
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            method: 'local',
            role: role,
            local: {
                email: email,
                password: password,
            }
        });
        await newUser.save();
        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ user: newUser,token:token });
    },
    updateProfile: async (req, res, next) => {
        User.findOne({_id: req.params.id})
            .then( result => {
                const updateOps = {};
                for (var key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        updateOps[key] = req.body[key];
                    }
                }
                User.update({_id: result._id}, {$set: updateOps})
                    .then(result => {

                        // Generate token
                        const token = signToken(req.user);
                        res.status(200).json({ user: result,token:token });
                    })
                    .catch(error => {
                        res.status(500).json({message: error.message});
                    });
            })
            .catch(error => {
                res.status(404).json({message: error.message});
            });
    },
    signIn: async (req, res, next) => {
        User.findOne({'local.email':req.body.email})
            .then(result => {
                if(!!result){
                    if(result.isValidPassword(req.body.email)){
                        const token = signToken(result);
                        res.status(200).json({ user: result,token:token });
                    }
                    else{
                        res.status(403).json({message:'user credentials are wrong check password !'});
                    }
                }
                else {
                    res.status(404).json({message:'user not found check email !'});
                }
            })
            .catch(error =>{
                res.status(500).json({message: error.message});
            });
    },
    googleOAuth: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    facebookOAuth: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },
    secret: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({ secret: "resource" });
    }
}