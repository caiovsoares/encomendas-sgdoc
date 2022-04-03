import { AtSignIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Flex, Img } from "@chakra-ui/react"
import { useState } from "react"
import { MenuButton } from "./MenuButton";
import { BiGift, BiHome, BiUserCircle , } from 'react-icons/bi'

export const Navigation = () => {

    const [isOpen, changeMenuState]  = useState(false);

    return (
        <Flex
        direction='column'
            height='100%'
            borderRightRadius={20}
            bg='navigation'
            alignItems='center'

            width={isOpen?'200px':'70px'}
            transition='width 1s'
            onMouseEnter={() => changeMenuState(true)}
            onMouseLeave={() => changeMenuState(false)}
        >
            <Img src='gladio.png' alt='Gládio Alado' mt={5} height='80px' objectFit='contain' width='calc(100% - 10px)'/>
            <MenuButton>{<Box w='30px' h='30px' margin='10px'><BiHome  size='30px'/></Box>}Início </MenuButton>
            <MenuButton>{<Box w='30px' h='30px' margin='10px'><BiGift  size='30px'/></Box>}Encomendas </MenuButton>
            <MenuButton>{<Box w='30px' h='30px' margin='10px'><BiUserCircle  size='30px'/></Box>}Destinatarios </MenuButton>
        </Flex>
    )
}