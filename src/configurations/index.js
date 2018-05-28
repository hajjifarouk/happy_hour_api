if (process.env.NODE_ENV === 'test') {
    module.exports = {
        JWT_SECRET: 'happyhourjwtsecret',
        oauth: {
            google: {
                clientID: 'number',
                clientSecret: 'string',
            },
            facebook: {
                clientID: 'number',
                clientSecret: 'string',
            },
        },
    };
} else {
    module.exports = {
        JWT_SECRET: '',
        oauth: {
            google: {
                clientID: '881910879578-vlq49n9m5ltv565fa1cfrnjnuj410np3.apps.googleusercontent.com',
                clientSecret: 'PZCcGvDlcbLoH3Mt8i8DPbfe',
            },
            facebook: {
                clientID: '625890587765973',
                clientSecret: 'b275cd628989763b133747700cda21dc',
            },
        },
    };
}