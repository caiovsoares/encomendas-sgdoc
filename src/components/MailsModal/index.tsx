import { Modal, ModalOverlay } from '@chakra-ui/react';
import { MailDetailModal } from './MailDetailModal';
import { MailReceiveModal } from './MailReceiveModal';
import { MailRegisterModal } from './MailRegisterModal';

const MailsModal = ({
  onClose,
  isOpen,
  mail,
  type,
  user,
  receivers,
  receiveMails,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && <MailDetailModal user={user} mail={mail} />}

      {type === 'register' && (
        <MailRegisterModal onClose={onClose} user={user} rec={receivers} />
      )}

      {type === 'receive' && (
        <MailReceiveModal
          onClose={onClose}
          user={user}
          receiveMails={receiveMails}
          rec={receivers}
        />
      )}

      {type === 'search' && <MailDetailModal user={user} mail={mail} />}
    </Modal>
  );
};

export default MailsModal;
