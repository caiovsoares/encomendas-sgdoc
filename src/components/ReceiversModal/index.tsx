import { Modal, ModalOverlay } from '@chakra-ui/react';
import { ReceiverDetailModal } from './ReceiverDetailModal';
import { ReceiverEditModal } from './ReceiverEditModal';
import { ReceiverRegisterManyModal } from './ReceiverRegisterManyModal';
import { ReceiverRegisterModal } from './ReceiverRegisterModal';

const ReceiversModal = ({ onClose, isOpen, receiver, type, setModalType }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay backdropFilter='blur(5px)' />
      {type === 'detail' && (
        <ReceiverDetailModal
          onClose={onClose}
          receiver={receiver}
          setModalType={setModalType}
        />
      )}

      {type === 'register' && <ReceiverRegisterModal onClose={onClose} />}

      {type === 'edit' && (
        <ReceiverEditModal receiver={receiver} onClose={onClose} />
      )}
      {type === 'registerMany' && (
        <ReceiverRegisterManyModal onClose={onClose} />
      )}
    </Modal>
  );
};

export default ReceiversModal;
