import { MenuItem, Select } from '@mui/material'
import React from 'react'

const Sort = ({ sort,changeSort,changePage }) => {
  return (
    <Select value={sort} onChange={(e) =>{
        changeSort('sort', e.target.value)
        changePage('page', 1)
    }}>
        <MenuItem value={'price,desc'}>ფასის კლებადობა</MenuItem>
        <MenuItem value={'price,asc'}>ფასის ზრდადობა</MenuItem>
        <MenuItem value={'name,asc'}>A-Z</MenuItem>
        <MenuItem value={'name,desc'}>Z-A</MenuItem>
    </Select>
  )
}

export default Sort