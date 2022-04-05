import { Input } from '@chakra-ui/react'
import React from 'react'

export const GlobalFilter = ({filter, setFilter}) => {

    return(
        <Input boxShadow='sm' borderColor='gray.400' placeholder="Nome, Rastreio ou outro dado" value={filter || ''} onChange={e => setFilter(e.target.value)} w='300px'/>
    )

}