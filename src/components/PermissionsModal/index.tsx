import { Modal, ModalOverlay } from '@chakra-ui/react';
import { Permission } from '../../interfaces';
import { PermissionEditModal } from './PermissionEditModal';
import { PermissionRegisterModal } from './PermissionRegisterModal';

type PermissionsModalProps = {
  onClose: () => void;
  isOpen: boolean;
  type: string;
  permission: Permission;
};

const PermissionsModal = ({
  onClose,
  isOpen,
  type,
  permission,
}: PermissionsModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />

      {type === 'register' && <PermissionRegisterModal onClose={onClose} />}

      {type === 'edit' && (
        <PermissionEditModal onClose={onClose} permission={permission} />
      )}
    </Modal>
  );
};

export default PermissionsModal;
