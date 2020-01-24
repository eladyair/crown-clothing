import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStipe = price * 100;
    const publishableKey = 'pk_test_dyO8U0GP3Lv50pvHHpj9rsZe00NDY1yfTL';

    const onToken = token => {
        axios({
            url: 'payments',
            method: 'post',
            data: {
                amount: priceForStipe,
                token
            }
        })
            .then(response => {
                alert('Payment successful');
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert('There was an issue with your payment. Please sure you are using the provided credit card.');
            });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CROWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStipe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
