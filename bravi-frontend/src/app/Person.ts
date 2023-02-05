export interface Person {
  id: number;
  name: String;
  cpf: String;
  email: String;
  contacts: Contact[];
}

export interface Contact {
  type: String;
  number: String
}
