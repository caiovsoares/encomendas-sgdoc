import { Modal, ModalOverlay } from '@chakra-ui/react';
import { Mail, Cadet, WorkPlace, Staff } from '../../interfaces';
import { MailDetailModal } from './MailDetailModal';
import { MailEditModal } from './MailEditModal';
import { MailReceiveModal } from './MailReceiveModal';
import { MailRegisterModal } from './MailRegisterModal';

type MailsModalProps = {
  onClose: () => void;
  isOpen: boolean;
  mail: Mail;
  type: string;
  receivers: (Staff | Cadet | WorkPlace)[];
  receiveMails: Mail[];
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};

const MailsModal = ({
  onClose,
  isOpen,
  mail,
  type,
  receivers,
  receiveMails,
  setModalType,
}: MailsModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && (
        <MailDetailModal
          onClose={onClose}
          mail={mail}
          setModalType={setModalType}
        />
      )}

      {type === 'register' && (
        <MailRegisterModal onClose={onClose} receivers={receivers} />
      )}

      {type === 'receive' && (
        <MailReceiveModal
          onClose={onClose}
          receiveMails={receiveMails}
          receivers={receivers}
        />
      )}

      {type === 'edit' && (
        <MailEditModal mail={mail} onClose={onClose} receivers={receivers} />
      )}
    </Modal>
  );
};

export default MailsModal;
