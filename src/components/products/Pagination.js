import React from 'react'
import{Pagination} from '@mui/material'

const PaginationComponent = ({totalPages, page, changePage}) => {
    return(
        <Pagination
          count={totalPages}
          page={page}
          onChANGE={(_, value) => {
            changePage("page", + value)
          }}
        />
    )
}


export default PaginationComponent