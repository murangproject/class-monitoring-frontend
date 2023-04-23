import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-classes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './section-classes.component.html',
})
export class SectionClassesComponent {
  createSectionModalState: boolean = false;
  deleteSectionModalState: boolean = false;
  title = "";
  submitted = false;

  sectionForm: any = {
    section_name: '',
    section_code: '',
  };

  openCreateSectionModal() {
    this.createSectionModalState = true;
    this.title = "Create";
    this.sectionForm.reset();
    this.submitted = false;
  }

  openEditSectionModal() {
    this.createSectionModalState = true;
    this.title = "Edit";
    this.sectionForm.reset();
    this.submitted = false;
  }

  closeCreateSectionModal() {
    this.createSectionModalState = false;
    this.sectionForm.reset();
    this.submitted = false;
  }

  openDeleteSectionModal() {
    this.deleteSectionModalState = true;
    this.title = "Edit";
    this.sectionForm.reset();
    this.submitted = false;
  }

  closeDeleteSectionModal() {
    this.deleteSectionModalState = false;
    this.sectionForm.reset();
    this.submitted = false;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.sectionForm = this.formBuilder.group({
      section_name: ['', Validators.required],
      section_code: ['', Validators.required]
    });
  }

  get sectionFormControl() {
    return this.sectionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  }
}
