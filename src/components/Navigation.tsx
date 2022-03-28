import { AtSignIcon, EmailIcon } from "@chakra-ui/icons";
import { Flex, Img } from "@chakra-ui/react"
import { useState } from "react"
import { MenuButton } from "./MenuButton";

export const Navigation = () => {

    const [isOpen, changeMenuState]  = useState(false);

    return (
        <Flex
        direction='column'
            height='100%'
            borderRightRadius={20}
            bg='navigation'
            alignItems='center'

            width={isOpen?'170px':'70px'}
            transition='width 1s'
            onMouseEnter={() => changeMenuState(true)}
            onMouseLeave={() => changeMenuState(false)}
        >
            <Img src='gladio.png' alt='Gládio Alado' mt={5} height='80px' objectFit='contain' width='calc(100% - 10px)'/>
            <MenuButton>{<EmailIcon w='30px' h='30px' marginInline='10px'/>}Encomendas</MenuButton>            
            <MenuButton>{<AtSignIcon w='30px' h='30px' marginInline='10px'/>}Destinatarios</MenuButton>
        </Flex>
    )
}