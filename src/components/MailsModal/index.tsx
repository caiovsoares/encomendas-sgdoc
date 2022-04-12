import { Modal, ModalOverlay } from "@chakra-ui/react";
import { MailDetailModal } from "./MailDetailModal";

const MailsModal = ({onClose, isOpen, mail, type}) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay backdropFilter='blur(5px)'/>
            {type === 'detail' && (
                <MailDetailModal mail={mail}/>
            )}
            
            {type === 'register' && (
                <MailDetailModal mail={mail}/>
            )}
            
            {type === 'receive' && (
                <MailDetailModal mail={mail}/>
            )}
            
            {type === 'search' && (
                <MailDetailModal mail={mail}/>
            )}

            
        </Modal>
    )
}

export default MailsModal;