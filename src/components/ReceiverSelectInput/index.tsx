import { Select } from '@chakra-ui/react';
import { Cadet, Staff, WorkPlace } from '../../interfaces';
import { findReceiverName } from '../../utils';

type ReceiverSelectInputProps = {
  receivers: (Staff | Cadet | WorkPlace)[];
  field: any;
  placeholder: string;
  value: string;
};

export default function ReceiverSelectInput({
  field,
  receivers,
  placeholder,
  value,
}: ReceiverSelectInputProps) {
  return (
    <Select {...field} placeholder={placeholder}>
      {receivers.map((receiver) => (
        <option
          selected={
            'warName' in receiver
              ? receiver.fullName == value
              : receiver.name == value
          }
          value={`${receiver.id}`}
        >{`${findReceiverName(receiver)}`}</option>
      ))}
    </Select>
  );
}
