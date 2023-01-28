import { Modal, ModalOverlay } from '@chakra-ui/react';
import { Staff, User, Permission } from '../../interfaces';
import { UserDetailModal } from './UserDetailModal';
import { UserEditModal } from './UserEditModal';
import { UserRegisterModal } from './UserRegisterModal';

type UsersModalProps = {
  onClose: () => void;
  isOpen: boolean;
  user: User;
  type: string;
  permissions: Permission[];
  staffs: Staff[];
};

const UsersModal = ({
  onClose,
  isOpen,
  user,
  type,
  permissions,
  staffs,
}: UsersModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && <UserDetailModal user={user} />}

      {type === 'register' && (
        <UserRegisterModal
          onClose={onClose}
          permissions={permissions}
          staffs={staffs}
        />
      )}

      {type === 'edit' && (
        <UserEditModal
          user={user}
          onClose={onClose}
          permissions={permissions}
        />
      )}
    </Modal>
  );
};

export default UsersModal;
