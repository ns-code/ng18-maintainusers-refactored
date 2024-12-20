import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './data/user.data';
import { StateMgmtService } from './service/state-mgmt.service';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [CommonModule, RouterLink, MatGridListModule, MatButtonModule, FormsModule, ReactiveFormsModule]
})
export class UsersComponent implements OnInit {


  users = signal<User[]>([]);
  myForm: FormGroup;
  toDeleteIds = new Set<bigint>();
  deleteUserRes$: Observable<any>[] = [];

  constructor(private appDataStateService: StateMgmtService, private fb: FormBuilder) {

    this.myForm = this.fb.group({
      selectedOptions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.appDataStateService.users;
  }

  onCheckboxChange(e: any, userId: bigint): void {
    this.toDeleteIds.add(userId);
  }

  deleteSelectedIds(): void {
    this.appDataStateService.deleteUsers([...this.toDeleteIds]!);
  }
}
