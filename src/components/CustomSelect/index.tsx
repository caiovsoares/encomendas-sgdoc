import { Select } from '@chakra-ui/react';

export default function CustomSelect({
  field,
  entities,
  fieldName,
  placeholder,
  value,
}) {
  return (
    <Select {...field} placeholder={placeholder}>
      {entities.map((entity) =>
        entity[fieldName] ? (
          <option
            selected={entity[fieldName] == value}
            value={`${entity.id}`}
          >{`${entity[fieldName]}`}</option>
        ) : (
          <option
            selected={entity == value}
            value={`${entity}`}
          >{`${entity}`}</option>
        )
      )}
    </Select>
  );
}
