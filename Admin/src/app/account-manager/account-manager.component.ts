import {Component, OnInit} from '@angular/core';
import {Manufacture} from '../shared/models/manufacture';
import {DataTableResource} from 'angular-2-data-table';
import {AuthService} from '../shared/services/auth.service';
import {Property} from '../shared/models/property';
import {Account} from '../shared/models/account';
import {AccountService} from '../shared/services/account.service';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {
  accounts: Account[] = [];
  currentPageAccounts: Account[] = [];

  manufactures: Manufacture[] = [];
  properties: Property[] = [];

  accountsCount: number;
  accountsResource = new DataTableResource(this.accounts);

  pageLimit = 10;

  isAddNewAccount = false;
  isModifyAccount = false;
  isAddNewProperty = false;

  selectedAccount: Account = new Account();
  newProperty: Property = new Property();

  constructor(private authService: AuthService, private accountService: AccountService) {

    this.accountService.getAllAccounts().subscribe(
      data => {
        this.accounts = data['content'];
        console.log(this.accounts);

        this.accountsResource = new DataTableResource(this.accounts);
        this.accountsResource.count().then(count => this.accountsCount = count);
        this.updateDataTable();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  reload(event) {
    this.accountsResource.query(event).then(accounts => this.currentPageAccounts = accounts);
  }

  addNewAccount(item: Account) {
    if (this.isModifyAccount || this.isAddNewAccount) {
      return;
    }

    this.isAddNewAccount = true;
    item = new Account();
    item.role = {
      id: 0,
      name: 'none',
    };
    this.selectedAccount = item;
    this.selectedAccount.isAddNew = true;

    this.accounts.push(this.selectedAccount);
    this.accountsResource = new DataTableResource(this.accounts);
    this.accountsResource.count().then(count => this.accountsCount = count);

    const query = {
      limit: this.pageLimit,
      offset: (this.accounts.length % this.pageLimit) && this.accounts.length ?
        (this.accounts.length - this.accounts.length % this.pageLimit) : this.accounts.length - this.pageLimit
    };
    this.accountsResource.query(query).then(accounts => this.currentPageAccounts = accounts);
  }

  finish(item: Account) {
    console.log(item);
    switch (this.selectedAccount.role.id) {
      case 1:
        this.selectedAccount.role.name = 'Quản trị viên';
        break;
      case 2:
        this.selectedAccount.role.name = 'Quản lý';
        break;
      case 3:
        this.selectedAccount.role.name = 'Nhân viên';
        break;
      default:
        this.selectedAccount.role.name = 'Khách hàng';
        break;
    }
    if (this.isAddNewAccount) {
      this.finishAddNew(item);
    } else {
      this.finishEdit(item);
    }
  }

  finishAddNew(item: Account) {
    this.accountService.addAccount(this.selectedAccount).subscribe(
      data => {
        item.isAddNew = false;
        this.isAddNewAccount = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  edit(item: Account) {
    console.log(item);
    item.isModify = true;
    this.selectedAccount = item;
    this.isModifyAccount = true;
  }

  finishEdit(item: Account) {
    this.accountService.editAccount(item).subscribe(
      data => {
        item.isModify = false;
        this.isModifyAccount = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  remove(item: Account) {
    if (confirm('Bạn có chắc chắn muốn xóa ?')) {
      this.accountService.removeAccount(item.userName).subscribe(
        data => {
          this.accounts.splice(this.accounts.indexOf(item), 1);
          this.updateDataTable();
        },
        err => {
          console.log(err);
        }
      );
    }
    this.accountsResource = new DataTableResource(this.accounts);
    this.accountsResource.count().then(count => this.accountsCount = count);
    this.updateDataTable();
  }

  updateDataTable() {
    const query = {
      limit: this.pageLimit,
      offset: (this.accounts.length % this.pageLimit) && this.accounts.length ?
        ((this.accounts.length - this.accounts.length % this.pageLimit) < 0 ? 0 : 0)
        : ((this.accounts.length - this.pageLimit) < 0 ? 0 : 0)
    };
    this.accountsResource.query(query).then(accounts => this.currentPageAccounts = accounts);
  }

}
