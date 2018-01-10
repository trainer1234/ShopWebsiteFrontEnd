export class Account {
  id: string;
  userName: string;
  password: string;
  role: {
    id: number,
    name: string
  };
  isModify = false;
  isAddNew = false;
}
