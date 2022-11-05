import { TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import instance from '../../../app/instance'

const Search = () => {
    const [value,setValue] = useState("")
    useEffect(() => {
        const timerId = setTimeout(() => {
            const filterByName = async() => {
                const { data } = await instance.get(`/products/search?name=${value}`) 
            }
            if(value){
                filterByName()
            }
        },500)
        return () => {
            clearTimeout(timerId)
        }
    },[value])
  return (
   <TextField value={value} onChange={(e) => setValue(e.target.value)}/>
  )
}

export default Search