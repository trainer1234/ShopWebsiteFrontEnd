export class RegisterDto {
  id: string;
  userName: string;
  password: string;
  role: number;
  isModify = false;
  isAddNew = false;
}
