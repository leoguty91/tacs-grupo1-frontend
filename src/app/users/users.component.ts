import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatDialog, MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { User } from '../_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('userTable') eventTable: MatTable<Element>;
  @ViewChild(MatSort) sort: MatSort;
  users: User[];
  events: Event[];
  dataSourceUsers: MatTableDataSource<User>;
  displayedUserColumns = ['username', 'firstname', 'lastname', 'email', 'lastAccess', 'telegramUserId', 'action'];

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getAllUsers().pipe(first()).subscribe(page => {
      this.spinner.hide();
      this.users = page.content;
      this.dataSourceUsers = new MatTableDataSource(this.users);
      if (this.users.length > 0) {
        this.dataSourceUsers.sort = this.sort;
      } else {
        this.snackbar.open('No users found', '', { duration: 3000 });
      }
    });
  }

  applyFilterUser(filterValue: string) {
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
  }

  showTotaLists(user: User) {
    this.userService.getTotalLists(user).pipe(first()).subscribe(response => {
      console.log(response);
      this.snackbar.open(`Total lists: ${response.totalLists}`, '', { duration: 3000 });
    });
  }

  showTotalAlarms(user: User) {
    this.userService.getTotalAlarms(user).pipe(first()).subscribe(response => {
      this.snackbar.open(`Total alarms: ${response.totalAlarms}`, '', { duration: 3000 });
    });
  }

}