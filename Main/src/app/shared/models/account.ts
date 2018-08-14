import {Manufacture} from '../../shared/models/manufacture';

export class Account {
  id: string;
  userName: string;
  password: string;
  role: number;
  income: number;
  hobbies: Manufacture[];
  isModify = false;
  isAddNew = false;
}
