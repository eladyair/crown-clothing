const path = require('path');
const express = require('express');
const cors = require('cors');

// If the server is running locally (in develop)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECERT_KEY);

// Initializing the server
const app = express();

// Initializing the json middleware, to enable parsing incoming json requests
app.use(express.json());
// Initializing the cross origin middleware, to enable receving requests from our client app that runs on a diffrent port
app.use(cors());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.post('/payments', (req, res) => {
    // Setting up the data that will be send to stripe from the request that comes in
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeError, stripeRes) => {
        if (stripeError) {
            res.status(500).send({ error: stripeError });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});

// 5000 is the port to run the server locally
// If this port number is set to another one, make sure to set it as well in client/package.json => "proxy" key
const PORT = process.env.PORT || 5000;

// Running the server
app.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server started on port ${PORT}`);
});
