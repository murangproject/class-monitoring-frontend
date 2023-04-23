import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subject-management.component.html',
})
export class SubjectManagementComponent {
  createSubjectModalState: boolean = false;
  deleteSubjectModalState: boolean = false;
  title = "";
  submitted = false;

  subjectForm: any = {
    subject_code: '',
    subject_name: '',
    units: '',
  };

  openCreateSubjectModal() {
    this.createSubjectModalState = true;
    this.title = "Create";
    this.subjectForm.reset();
    this.submitted = false;
  }

  openEditSubjectModal() {
    this.createSubjectModalState = true;
    this.title = "Edit";
    this.subjectForm.reset();
    this.submitted = false;
  }

  closeCreateSubjectModal() {
    this.createSubjectModalState = false;
    this.subjectForm.reset();
    this.submitted = false;
  }

  openDeleteSubjectModal() {
    this.deleteSubjectModalState = true;
    this.title = "Edit";
    this.subjectForm.reset();
    this.submitted = false;
  }

  closeDeleteSubjectModal() {
    this.deleteSubjectModalState = false;
    this.subjectForm.reset();
    this.submitted = false;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      subject_code: ['', Validators.required],
      subject_name: ['', Validators.required],
      units: ['', Validators.required]
    });
  }

  get subjectFormControl() {
    return this.subjectForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }
}
