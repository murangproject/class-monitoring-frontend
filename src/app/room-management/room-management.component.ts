import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, RoomManagementComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './room-management.component.html',
})
export class RoomManagementComponent {
  createRoomModalState: boolean = false;
  deleteRoomModalState: boolean = false;
  title = "";
  submitted = false;

  roomForm: any = {
    room_code: '',
    floor: '',
    building: '',
  };

  openCreateRoomModal() {
    this.createRoomModalState = true;
    this.title = "Create";
    this.roomForm.reset();
    this.submitted = false;
  }

  openEditRoomModal() {
    this.createRoomModalState = true;
    this.title = "Edit";
    this.roomForm.reset();
    this.submitted = false;
  }

  closeCreateRoomModal() {
    this.createRoomModalState = false;
    this.roomForm.reset();
    this.submitted = false;
  }

  openDeleteRoomModal() {
    this.deleteRoomModalState = true;
    this.title = "Edit";
    this.roomForm.reset();
    this.submitted = false;
  }

  closeDeleteRoomModal() {
    this.deleteRoomModalState = false;
    this.roomForm.reset();
    this.submitted = false;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      room_code: ['', Validators.required],
      floor: ['', Validators.required],
      building: ['', Validators.required]
    });
  }

  get roomFormControl() {
    return this.roomForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }
}
