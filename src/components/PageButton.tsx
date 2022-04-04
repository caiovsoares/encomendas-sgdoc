import { Button } from "@chakra-ui/react"

export const PageButton = (props) => {
    return(
    <Button boxShadow="md" size='sm' rounded="md" bgColor='menuButton' color='menuButtonText' marginInline='10px'>{props.children}</Button>
    )
}