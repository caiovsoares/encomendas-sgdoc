import { Box, Button} from "@chakra-ui/react"
import Link from "next/link"

export const MenuButton = ({href, children, icon}) => {
    return(
    <Link href={href}>
        <Button 
            margin={2}
            marginTop={4}
            padding={0} 
            variant='ghost'
            width='calc(100% - 20px)'
            overflow='clip'
            color='menuButtonText'
            justifyContent='left'>
            <Box w='30px' h='30px' margin='10px'>{icon}</Box>
            {children}
        </Button>  
    </Link>
    )
}