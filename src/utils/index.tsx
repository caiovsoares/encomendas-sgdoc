import { Cadet, Staff, WorkPlace } from '../interfaces';

export function findReceiverName(receiver: Staff | WorkPlace | Cadet) {
  if (!receiver) return '';
  if ('classYear' in receiver) {
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.classYear;
    if (currentYear - classYear < 4) {
      return `C${currentYear - classYear + 1} ${receiver.warName} - ${
        receiver.fullName
      }`;
    } else {
      return `FORMADO ${classYear + 3} ${receiver.warName} - ${
        receiver.fullName
      }`;
    }
  } else if ('rank' in receiver)
    return `${receiver.rank} ${receiver.warName} - ${receiver.fullName}`;
  else return `${receiver.abbreviation} - ${receiver.name}`; //se for seção
}
export function findReceiverShortName(receiver: Staff | WorkPlace | Cadet) {
  if (!receiver) return '';
  if ('classYear' in receiver) {
    const currentYear = new Date().getUTCFullYear();
    const classYear = receiver.classYear;
    if (currentYear - classYear < 4) {
      return `C${currentYear - classYear + 1} ${receiver.warName}`;
    } else {
      return `FORMADO ${classYear + 3} ${receiver.warName}`;
    }
  } else if ('rank' in receiver) return `${receiver.rank} ${receiver.warName}`;
  else return `${receiver.abbreviation}`; //se for seção
}
export function invertStringDate(date: string) {
  return date ? date.split('/').reverse().join('/') : '';
}
export function convertToDefaultDate(date: string) {
  return date ? date.split('/').join('-') : '';
}
