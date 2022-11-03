import { Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const CategoryProductList = ({ data }) => {
  return (
   <Grid container spacing={2}>
    {data.products?.length > 0 && data.products.map((product)=> {
        return(
            <Grid item key={product._id} xs={4} style={{marginTop:'50px'}}>
                <ProductCard  product={product}/>
            </Grid>
        )
    })}
   </Grid>
  )
}

export default CategoryProductList