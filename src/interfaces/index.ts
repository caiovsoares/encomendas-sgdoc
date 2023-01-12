export interface WorkPlace {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Cadet {
  id: string;
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  classYear: number;
}

export interface Staff {
  id: string;
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  rank: string;
}

export interface Mail {
  id: string;
  tracking: string;
  sender: string;
  destiny: WorkPlace | Cadet | Staff;
  created_at: string;
  receiver: WorkPlace | Cadet | Staff;
  received_at: string;
  details: string;
}

export interface PublicMail {
  tracking: string;
  sender: string;
  destiny: string;
  created_at: string;
  receiver: string;
  received_at: string;
}

export interface User {
  fullName: string;
  warName: string;
  cpf: string;
  identity: string;
  rank: string;
  email: string;
  permission: {
    name: string;
    editPermission: boolean;
    editUser: boolean;
    editReceiver: boolean;
    editExpedition: boolean;
    editMail: boolean;
  };
}