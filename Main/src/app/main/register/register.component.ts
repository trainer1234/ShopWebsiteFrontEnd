import { Component, OnInit } from '@angular/core';
import {Manufacture} from '../../shared/models/manufacture';
import {ManufactureService} from '../../shared/services/manufacture.service';
import {AccountService} from '../../shared/services/account.service';
import {Account} from '../../shared/models/account'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userName: string;
  public password: string;
  public confirmPassword: string;
  public selectedIncome: number;
  public selectedHobbies: Manufacture[] = [];
  public selectHobbiesMark: boolean[] = [];
  public manufactures: Manufacture[] = [];  

  constructor(public manufactureService: ManufactureService, private accountService: AccountService,
    private router: Router) {

   }

  ngOnInit() {
    this.manufactureService.getManufacture().subscribe(
      data => {
        this.manufactures = data['content'];
      },
      err => {
        console.log(err);
      }
    );  
  }

  register(){
    if(this.password != this.confirmPassword){
      alert('Xác nhận mật khẩu không khớp!');
      return;
    }

    for(let i = 0; i< this.manufactures.length; i++){
      if(this.selectHobbiesMark[i]){
        this.selectedHobbies.push(this.manufactures[i]);
      }
    }

    let newAccount: Account = new Account();
    newAccount.userName = this.userName;
    newAccount.password = this.password;
    newAccount.income = this.selectedIncome;
    newAccount.role = 4;
    newAccount.hobbies = this.selectedHobbies;
    console.log(newAccount);
    this.accountService.addAccount(newAccount).subscribe(
      data => {
        alert('Đăng ký thành công!');
        sessionStorage.setItem('currentUser', this.userName);
        sessionStorage.setItem('accessToken', data['accessToken']);
        sessionStorage.setItem('role', data['role']);
        this.router.navigate(['/']);
      },
      err =>{
        console.log(err);
      }
    );
  }

  selectManufacture(index) {
    this.selectHobbiesMark[index] = !this.selectHobbiesMark[index];
  }
}
