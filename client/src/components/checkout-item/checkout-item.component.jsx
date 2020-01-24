import React from 'react';
import { connect } from 'react-redux';
import './checkout-item.styles.scss';

// Redux related
import { addItem, removeItem, deleteItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item, addItem, removeItem, deleteItem }) => {
    const { name, imageUrl, price, quantity } = item;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(item)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(item)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={() => deleteItem(item)}>
                &#10005;
            </div>
        </div>
    );
};
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    deleteItem: item => dispatch(deleteItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
