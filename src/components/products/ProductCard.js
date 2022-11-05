import { Button, Card, CardActions, CardContent, Link, Rating, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../../app/instance';
import { ProductContext } from '../../context/ProductContext'
import { userContext } from '../../context/userContext';
import { cartContext } from '../../context/cartContext';
import { isUserAdmin } from '../../app/util';

const ProductCard = ({product}) => {
  const [productRating, setProductRating] = useState(product.averageRating);
  const { userData } = useContext(userContext)
  const { addToCart,removeFromCart,cartState } = useContext(cartContext) 
  const { getData, setSelectedProduct } = useContext(ProductContext)
  const location = useLocation();
  const navigate = useNavigate();
  const onRatingChange = async(e) => {
    e.preventDefault();
    setProductRating(e.target.value)
    try {
      await instance.post(`/products/${product._id}/users/${userData._id}/rate`,{rating: +e.target.value})
      const endpoint = location.pathname !=='/' ? `${location.pathname}${location.search}` : '/products'
      await getData(endpoint)
    } catch (error) {
      
    }
  }
  const isProductInCart = cartState.cart?.find((cartItem) => cartItem.product?._id === product._id)
  const onEditHandler =(e, product) => {
    e.preventDefault();
    setSelectedProduct(product)
    navigate(`/products/${product._id}edit`)
  }
  return (
    <Card>
        <CardContent>
            <img  src={product.image} width='100' height='100'/>
            <Link to = {`/products/categories/${product.category}/${product.name}`} state={{id: product._id, category: product.category}}>
                <Typography>{product.name}</Typography>
            </Link>
            <Typography>
                ${product.price}
            </Typography>
            <Rating 
            value={productRating}
            onChange={onRatingChange}
            precision={0.5}
            />
        </CardContent>
        <CardActions>
          {isProductInCart ? (
            <>
            <Button onClick={() =>removeFromCart(product?._id)}>-</Button>
            <Typography>{isProductInCart.quantity}</Typography>
            <Button onClick={() => addToCart(product)}>+</Button>
            </>
          ) : (
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          )}
          {isUserAdmin() && <Button onClick={(e) => onEditHandler(e,product)}>Edit</Button>}
        </CardActions>
    </Card>
  )
}

export default ProductCard
