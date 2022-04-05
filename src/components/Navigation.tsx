import { Flex, Img } from "@chakra-ui/react"
import { useState } from "react"
import { MenuButton } from "./MenuButton";
import { BiGift, BiHome, BiUserCircle , } from 'react-icons/bi'

export const Navigation = () => {

    const [isOpen, changeMenuState]  = useState(false);

    return (
        <Flex
        direction='column'
            height='100%'
            boxShadow='0px 0px 10px 5px #1A365D'
            bg='navigation'
            alignItems='center'

            width={isOpen?'200px':'70px'}
            transition='width 1s'
            onMouseEnter={() => changeMenuState(true)}
            onMouseLeave={() => changeMenuState(false)}
        >
            <Img src='gladio.png' alt='Gládio Alado' mt={5} height='80px' objectFit='contain' width='calc(100% - 10px)'/>
            <MenuButton href='/' icon={<BiHome size='30px'/>}>Início </MenuButton>
            <MenuButton href='/encomendas' icon={<BiGift size='30px'/>}>Encomendas</MenuButton>
            <MenuButton href='/' icon={<BiUserCircle size='30px'/>}>Destinatarios </MenuButton>
        </Flex>
    )
}