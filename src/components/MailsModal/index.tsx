import { Modal, ModalOverlay } from '@chakra-ui/react';
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
  cadets,
  workPlaces,
  staffs,
  receiveMails,
  setModalType,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && (
        <MailDetailModal
          onClose={onClose}
          user={user}
          mail={mail}
          setModalType={setModalType}
        />
      )}

      {type === 'register' && (
        <MailRegisterModal
          onClose={onClose}
          cadets={cadets}
          workPlaces={workPlaces}
          staffs={staffs}
        />
      )}

      {type === 'receive' && (
        <MailReceiveModal
          onClose={onClose}
          user={user}
          receiveMails={receiveMails}
          rec={[]}
        />
      )}

      {type === 'search' && <MailSearchModal mail={mail} />}

      {type === 'edit' && (
        <MailEditModal mail={mail} onClose={onClose} rec={[]} user={user} />
      )}
    </Modal>
  );
};

export default MailsModal;
