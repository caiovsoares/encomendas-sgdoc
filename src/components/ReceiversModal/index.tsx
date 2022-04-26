import { Modal, ModalOverlay } from '@chakra-ui/react';
import { ReceiverDetailModal } from './ReceiverDetailModal';
import { ReceiverEditModal } from './ReceiverEditModal';
import { ReceiverRegisterManyModal } from './ReceiverRegisterManyModal';
import { ReceiverRegisterModal } from './ReceiverRegisterModal';

const ReceiversModal = ({
  onClose,
  isOpen,
  receiver,
  type,
  user,
  setModalType,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && (
        <ReceiverDetailModal
          user={user}
          receiver={receiver}
          setModalType={setModalType}
        />
      )}

      {type === 'register' && (
        <ReceiverRegisterModal onClose={onClose} user={user} />
      )}

      {type === 'edit' && (
        <ReceiverEditModal receiver={receiver} onClose={onClose} user={user} />
      )}
      {type === 'registerMany' && (
        <ReceiverRegisterManyModal onClose={onClose} user={user} />
      )}
    </Modal>
  );
};

export default ReceiversModal;
