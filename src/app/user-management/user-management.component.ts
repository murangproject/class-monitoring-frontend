import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from './data-access/users.service';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  activeUsers$ = this.userService.getActive();
  invitedUsers$ = this.userService.getInvited();
  submitted = false;
  title = '';

  activeUserForm: any = {
    first_name: '',
    middle_name: '',
    last_name: '',
    role_name: '',
  };

  // Select
  selectedId: number = -1;

  // Tabs
  tab: 'active' | 'invited' = 'active';

  // Modals
  createActiveUserModalState: boolean = false;
  deleteUserModalState: boolean = false;
  updateActiveUserModalState: boolean = false;

  // Toast
  toastModalState: boolean = false;
  toastMessage: string = '';
  toastColor: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.activeUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role_name: ['', Validators.required],
    });

    this.userService.init();
  }

  get userFormControl() {
    return this.activeUserForm.controls;
  }

  select(id: number) {
    this.selectedId = id;
  }

  openDeleteUserModal() {
    this.deleteUserModalState = true;
    this.activeUserForm.reset();
    this.submitted = false;
  }

  closeDeleteUserModal() {
    this.deleteUserModalState = false;
    this.selectedId = -1;
    this.activeUserForm.reset();
    this.submitted = false;
  }

  openUpdateActiveUserModal() {
    this.updateActiveUserModalState = true;
    this.activeUsers$
      .pipe(
        tap(users =>
          this.activeUserForm.patchValue(
            users.find(user => user.id === this.selectedId)
          )
        )
      )
      .subscribe();
      this.activeUserForm.reset();
      this.submitted = false;
  }

  openCreateActiveUserModal() {
    this.title = 'Create'
    this.createActiveUserModalState = true;
    this.activeUserForm.reset();
    this.submitted = false;
  }

  openEditActiveUserModal() {
    this.title = 'Edit'
    this.createActiveUserModalState = true;
    this.activeUserForm.reset();
    this.submitted = false;
  }

  closeCreateActiveUserModal() {
    this.createActiveUserModalState = false;
    this.activeUserForm.reset();
    this.submitted = false;
  }

  closeUpdateActiveUserModal() {
    this.updateActiveUserModalState = false;
    this.activeUserForm.reset();
    this.selectedId = -1;
    this.submitted = false;
  }

  // onSubmitUpdateActiveUser() {
  //   this.submitted = true;
  //   if (this.activeUserForm.invalid) return;

  //   this.userService
  //     .updateInvitedUser(this.selectedId, this.activeUserForm.value)
  //     .subscribe({
  //       next: () => {
  //         this.toastUtil('User updated successfully', true);
  //         this.userService.init();
  //         this.closeUpdateActiveUserModal();
  //       },
  //       error: () => {
  //         this.toastUtil('User update failed', false);
  //         this.userService.init();
  //         this.closeUpdateActiveUserModal();
  //       },
  //     });
  //     this.activeUserForm.reset();
  //     this.submitted = false;
  // }

  deleteUser() {
    this.userService.delete(this.selectedId).subscribe({
      next: () => {
        this.toastUtil('User deleted successfully', true);
        this.userService.init();
        this.closeDeleteUserModal();
      },
      error: () => {
        this.toastUtil('User deletion failed', false);
        this.userService.init();
        this.closeDeleteUserModal();
      },
    });

    this.activeUserForm.reset();
    this.submitted = false;
  }

  onSubmitCreateUser() {
    if (this.activeUserForm.invalid) return;

    this.userService
      .updateInvitedUser(this.selectedId, this.activeUserForm.value)
      .subscribe({
        next: () => {
          this.toastUtil('User updated successfully', true);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
        error: () => {
          this.toastUtil('User update failed', false);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
      });
    // this.submitted = true;
    // this.createActiveUserModalState = true;
    // if (this.activeUserForm.invalid) return;

    // this.userService.create(this.activeUserForm.value).subscribe({
    //   next: () => {
    //     this.toastUtil('User created successfully', true);
    //     this.userService.init();
    //     this.closeCreateActiveUserModal();
    //   },
    //   error: () => {
    //     this.toastUtil('User creation failed', false);
    //     this.userService.init();
    //     this.closeCreateActiveUserModal();
    //   },
    // });
    // this.activeUserForm.reset();
    // this.submitted = false;
  }

  onSubmitEditUser() {
    this.submitted = true;
    this.createActiveUserModalState = true;
    if (this.activeUserForm.invalid) return;

    this.userService
      .updateInvitedUser(this.selectedId, this.activeUserForm.value)
      .subscribe({
        next: () => {
          this.toastUtil('User updated successfully', true);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
        error: () => {
          this.toastUtil('User update failed', false);
          this.userService.init();
          this.closeUpdateActiveUserModal();
        },
      });
      this.activeUserForm.reset();
      this.submitted = false;
  }

  // openEditActiveUserModal() {
  //   this.title = 'Edit'
  //   this.createActiveUserModalState = true;
  //   if (this.activeUserForm.invalid) return;

  //   this.userService
  //     .updateInvitedUser(this.selectedId, this.activeUserForm.value)
  //     .subscribe({
  //       next: () => {
  //         this.toastUtil('User updated successfully', true);
  //         this.userService.init();
  //         this.closeUpdateActiveUserModal();
  //       },
  //       error: () => {
  //         this.toastUtil('User update failed', false);
  //         this.userService.init();
  //         this.closeUpdateActiveUserModal();
  //       },
  //     });
  //     this.activeUserForm.reset();
  //     this.submitted = false;
  // }

  toastUtil(message: string, success: boolean) {
    this.toastModalState = true;
    this.toastColor = success;
    this.toastMessage = message;
    new Promise(resolve => setTimeout(resolve, 4000)).then(() => {
      this.toastModalState = false;
      this.toastMessage = '';
    });
  }

  getRoleName(role_type: string) {
    switch (role_type) {
      case 'admin':
        return 'Admin';
      case 'committee_chair':
        return 'Committee Chair';
      case 'committee_member':
        return 'Committee Member';
      case 'stakeholder':
        return 'Stakeholder';
      default:
        return 'Unknown';
    }
  }
}
