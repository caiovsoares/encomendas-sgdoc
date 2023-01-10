import { Modal, ModalOverlay } from '@chakra-ui/react';
import { Cadet, Mail, Staff, WorkPlace } from '../../@types';
import { MailDetailModal } from './MailDetailModal';
import { MailEditModal } from './MailEditModal';
import { MailReceiveModal } from './MailReceiveModal';
import { MailRegisterModal } from './MailRegisterModal';

type MailsModalProps = {
  onClose: () => void;
  isOpen: boolean;
  mail: Mail;
  type: string;
  cadets: Cadet[];
  workPlaces: WorkPlace[];
  staffs: Staff[];
  receiveMails: Mail[];
  setModalType: React.Dispatch<React.SetStateAction<string>>;
};

const MailsModal = ({
  onClose,
  isOpen,
  mail,
  type,
  cadets,
  workPlaces,
  staffs,
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
          receiveMails={receiveMails}
          cadets={cadets}
          workPlaces={workPlaces}
          staffs={staffs}
        />
      )}

      {type === 'edit' && (
        <MailEditModal
          mail={mail}
          onClose={onClose}
          cadets={cadets}
          workPlaces={workPlaces}
          staffs={staffs}
        />
      )}
    </Modal>
  );
};

export default MailsModal;
