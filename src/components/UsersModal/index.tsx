import { Modal, ModalOverlay } from '@chakra-ui/react';
import { Mail, Cadet, WorkPlace, Staff, User } from '../../interfaces';
import { UserDetailModal } from './UserDetailModal';
import { UserEditModal } from './UserEditModal';
import { UserRegisterModal } from './UserRegisterModal';

type UsersModalProps = {
  onClose: () => void;
  isOpen: boolean;
  user: User;
  type: string;
};

const UsersModal = ({ onClose, isOpen, user, type }: UsersModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && <UserDetailModal user={user} />}

      {/* {type === 'register' && (
        <UserRegisterModal onClose={onClose} receivers={receivers} />
      )}

      {type === 'edit' && (
        <UserEditModal mail={mail} onClose={onClose} receivers={receivers} />
      )} */}
    </Modal>
  );
};

export default UsersModal;
