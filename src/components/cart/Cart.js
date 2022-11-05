import { Button, Typography } from '@mui/material';
import React from 'react'
import { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { userContext } from '../../context/userContext';
import CartItem from './CartItem';

const Cart = () => {
    const { cartState, saveTocart } = useContext(cartContext);
    const { userData } = useContext(userContext);
  return (
    <div>{cartState.cart?.length > 0 ? cartState.cart?.map((cartItem) => {
        return <CartItem  key={cartItem.product._id} cartItem={cartItem}/>
    }): <Typography>Empty Cart</Typography>}
    
    {userData && <Button onClick={() =>saveTocart(userData._id) }>Save</Button>}
    </div>
  )
}

export default Cart