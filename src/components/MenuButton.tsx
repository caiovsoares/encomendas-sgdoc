import { Button, FlexProps } from "@chakra-ui/react"

export const MenuButton = (props: FlexProps) => {
    return(
        <Button 
        margin={2}
        marginTop={4}
        padding={0}
        variant='solid'
        width='calc(100% - 20px)'
        overflow='clip'
        bg='menuButton'
        color='menuButtonText'
        justifyContent='left'>
        {props.children}
    </Button>  
    )
}