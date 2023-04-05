export interface WorkPlace {
  id: string;
  name: string;
  abbreviation: string;
  email: string;
}

export interface Cadet {
  id: string;
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  classYear: number;
  email: string;
}

export interface Staff {
  id: string;
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  rank: string;
  email: string;
}

export interface Mail {
  id: string;
  tracking: string;
  sender: string;
  destiny: WorkPlace | Cadet | Staff;
  created_at: string;
  receiver: (WorkPlace | Cadet | Staff)[];
  received_at: string;
  details: string;
  mailListDate: string;
}

export interface PublicMail {
  tracking: string;
  sender: string;
  destiny: string;
  created_at: string;
  receiver: string;
  received_at: string;
  mailListDate: string;
}

export interface User {
  id: string;
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  rank: string;
  email: string;
  login: string;
  permission: {
    id: string;
    name: string;
    editUser: boolean;
    editReceiver: boolean;
    editExpedition: boolean;
    editMail: boolean;
    editShippingCompany: boolean;
    editReport: boolean;
  };
}

export interface MailListReceivement {
  received_at: string;
  receiver: WorkPlace | Cadet | Staff;
}

export interface MailList {
  id: string;
  created_at: string;
  mails: MailListMail[];
  mailListReceivements: MailListReceivement[];
}

export interface MailListMail {
  id: string;
  tracking: string;
  sender: string;
  created_at: string;
  destiny: Staff | Cadet | WorkPlace;
}

export interface Expedition {
  id: string;
  cep: string;
  method: string;
  hasAR: boolean;
  returnedAR: boolean;
  contentType: string;
  contentInfo: string;
  tracking: string;
  details?: string;
  workPlace: WorkPlace;
  expeditionList: ExpeditionList;
  devolutionAt?: string;
}

export interface ExpeditionList {
  id: string;
  created_at: string;
  expeditions: ExpeditionListExpedition[];
}

export interface ExpeditionListExpedition {
  id: string;
  cep: string;
  method: string;
  hasAR: boolean;
  returnedAR: boolean;
  contentType: string;
  contentInfo: string;
  tracking: string;
  details?: string;
  workPlace: WorkPlace;
  devolutionAt?: string;
}

export interface Permission {
  id: string;
  name: string;
  editMail: boolean;
  editExpedition: boolean;
  editReceiver: boolean;
  editUser: boolean;
  editShippingCompany: boolean;
  editReport: boolean;
}

export interface Report {
  id: string;
  author: string;
  content: string;
  resolution: string;
  created_at: string;
  resolved_at: string;
}

export interface ShippingCompany {
  id: string;
  company: string;
  name: string;
  cpf: string;
  vehicle: string;
  plate: string;
}
