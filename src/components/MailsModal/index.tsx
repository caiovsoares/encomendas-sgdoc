import { Modal, ModalOverlay } from '@chakra-ui/react';
import { MailDetailModal } from './MailDetailModal';
import { MailRegisterModal } from './MailRegisterModal';

const MailsModal = ({ onClose, isOpen, mail, type, user, receivers }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && <MailDetailModal user={user} mail={mail} />}

      {type === 'register' && (
        <MailRegisterModal onClose={onClose} user={user} rec={receivers} />
      )}

      {type === 'receive' && <MailDetailModal user={user} mail={mail} />}

      {type === 'search' && <MailDetailModal user={user} mail={mail} />}
    </Modal>
  );
};

export default MailsModal;
