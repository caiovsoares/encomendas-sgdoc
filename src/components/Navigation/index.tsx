import { Button, Flex, Image, Img } from "@chakra-ui/react"
import { useState } from "react"
import { ButtonNavigation } from "./ButtonNavigation";
import { BiGift, BiHome, BiUserCircle, } from 'react-icons/bi'
import { useSession, signIn, signOut } from "next-auth/react"
import { ButtonNavigationSession } from "./ButtonNavigationSession";

export const Navigation = () => {

    const [isOpen, changeMenuState] = useState(false);
    const { data: session, status } = useSession()

    return (
        <Flex
            direction='column'
            height='100%'
            boxShadow='0px 0px 10px 5px #1A365D'
            bg='navigation'
            alignItems='center'

            width={isOpen ? '200px' : '70px'}
            transition='width 1s'
            onMouseEnter={() => changeMenuState(true)}
            onMouseLeave={() => changeMenuState(false)}
        >
            <Img src='gladio.png' alt='Gládio Alado' mt={5} height='80px' objectFit='contain' width='calc(100% - 10px)' />
            <ButtonNavigation href='/' icon={<BiHome size='30px' />}>Início </ButtonNavigation>
            {session?.user?.permission?.editMail && <ButtonNavigation href='/encomendas' icon={<BiGift size='30px' />}>Encomendas</ButtonNavigation>}
            {session?.user?.permission?.editReceiver && <ButtonNavigation href='/' icon={<BiUserCircle size='30px' />}>Destinatarios </ButtonNavigation>}
            <ButtonNavigationSession session={session} signIn={signIn} signOut={signOut}/>
        </Flex>
    )
}