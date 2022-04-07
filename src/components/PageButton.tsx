import { Button } from "@chakra-ui/react"

export const PageButton = (props) => {
    return(
    <Button 
        boxShadow="lg" 
        size='sm' 
        rounded="md" 
        bgColor='menuButton' 
        _hover={{bg:'menuButtonHover'}}
        color='menuButtonText' 
        marginInline='10px'>{props.children}</Button>
    )
}