import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { instance } from '../../../app/instance'

const Search = () => {
    const [value, setValue] = useState("")


    useEffect(()=>{
       const timeId = setTimeout(()=>{
          const fillterByName = async()=>{
            const {data} = await instance.get(`/products/search/?name=${value}`)
          };
          if(value) {
            fillterByName();
          }
        },500)
       return()=>{
        clearTimeout(timeId);
       }
    },[value])

  return (
    <div>
        <TextField value={value} onChange={(e) =>setValue(e.target.value)}/>
    </div>
  )
}

export default Search