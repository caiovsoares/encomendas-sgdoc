import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useState } from 'react';
import { MailDetailModal } from './MailDetailModal';
import { MailEditModal } from './MailEditModal';
import { MailReceiveModal } from './MailReceiveModal';
import { MailRegisterModal } from './MailRegisterModal';
import { MailSearchModal } from './MailSearchModal';

const MailsModal = ({
  onClose,
  isOpen,
  mail,
  type,
  user,
  receivers,
  receiveMails,
  setModalType,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && (
        <MailDetailModal user={user} mail={mail} setModalType={setModalType} />
      )}

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

      {type === 'search' && <MailSearchModal mail={mail} />}

      {type === 'edit' && (
        <MailEditModal
          mail={mail}
          onClose={onClose}
          rec={receivers}
          user={user}
        />
      )}
    </Modal>
  );
};

export default MailsModal;
