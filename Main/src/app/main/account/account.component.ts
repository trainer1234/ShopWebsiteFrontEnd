import { Component, OnInit } from '@angular/core';
import {Manufacture} from '../../shared/models/manufacture';
import {ManufactureService} from '../../shared/services/manufacture.service';
import {AccountService} from '../../shared/services/account.service';
import {Account} from '../../shared/models/account'
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public currentAccount: Account;
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
    this.accountService.getCurrentUser().subscribe(
      data => {
        this.currentAccount = data['content'];
        console.log(this.currentAccount);
        this.userName = this.currentAccount.userName;
        this.selectedIncome = this.currentAccount.income;
        this.selectedHobbies = this.currentAccount.hobbies;     
        if(this.selectedHobbies !== null){
          for(let i = 0; i< this.manufactures.length; i++){                    
            if(this.selectedHobbies.some(x => x.id === this.manufactures[i].id)){
              this.selectHobbiesMark[i] = true;            
            }          
          }        
        }           
      },
      err => {
        console.log(err);
      }
    );

    this.manufactureService.getManufacture().subscribe(
      data => {
        this.manufactures = data['content'];
      },
      err => {
        console.log(err);
      }
    );  
  }

  update(){
    if(this.password != this.confirmPassword){
      alert('Xác nhận mật khẩu không khớp!');
      return;
    }

    this.selectedHobbies = [];
    
    for(let i = 0; i< this.manufactures.length; i++){
      if(this.selectHobbiesMark[i]){
        this.selectedHobbies.push(this.manufactures[i]);
      }
    }

    let newAccount: Account = this.currentAccount;    
    newAccount.password = this.password;
    newAccount.income = this.selectedIncome;
    newAccount.role = 4;
    newAccount.hobbies = this.selectedHobbies;
    console.log(newAccount);
    this.accountService.editAccount(newAccount).subscribe(
      data => {
        alert('Chỉnh sửa thành công!');                
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
