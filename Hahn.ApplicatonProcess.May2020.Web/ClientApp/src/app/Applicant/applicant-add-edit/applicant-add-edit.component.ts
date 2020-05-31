import { Component, OnInit } from '@angular/core';
import { Applicant } from '../../Models/applicant.model';
import { ApplicantService } from '../../Services/applicant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-add-edit',
  templateUrl: './applicant-add-edit.component.html',
  styleUrls: ['./applicant-add-edit.component.css']
})
export class ApplicantAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formName: string;
  formFamilyName: string;
  formAddress: string;
  formCountryOfOrigin: string;
  formEmailAddress: string;
  formAge: string;
  formHired: string;
  formId: number;
  errorMessage: any;
  existingApplicant: Applicant;

  constructor(private applicantService: ApplicantService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formName = "name";
    this.formFamilyName = "familyName";
    this.formAddress = "address";
    this.formEmailAddress = "eMailAdress";
    this.formAge = "age";
    this.formHired = "hired";
    this.formCountryOfOrigin = "countryOfOrigin";

    if (this.avRoute.snapshot.params[idParam]) {
      this.formId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        familyName: ['', [Validators.required, Validators.minLength(5)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        countryOfOrigin: ['', [Validators.required]],
        eMailAdress: ['', [Validators.required, Validators.email]],
        age: [0, [Validators.required, Validators.min(20), Validators.max(60)]],
        hired: [false]
      }
    )
  }

  ngOnInit() {

    if (this.formId > 0) {
      this.actionType = 'Edit';
      this.applicantService.getApplicant(this.formId)
        .subscribe(data => (
          this.existingApplicant = data,
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formFamilyName].setValue(data.familyName),
          this.form.controls[this.formCountryOfOrigin].setValue(data.countryOfOrigin),
          this.form.controls[this.formAddress].setValue(data.address),
          this.form.controls[this.formEmailAddress].setValue(data.eMailAdress),
          this.form.controls[this.formAge].setValue(data.age),
          this.form.controls[this.formHired].setValue(data.hired)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let applicant: Applicant = {
        id: 0,
        name: this.form.get(this.formName).value,
        familyName: this.form.get(this.formFamilyName).value,
        address: this.form.get(this.formAddress).value,
        countryOfOrigin: this.form.get(this.formCountryOfOrigin).value,
        eMailAdress: this.form.get(this.formEmailAddress).value,
        age: Number(this.form.get(this.formAge).value),
        hired: this.form.get(this.formHired).value
      };

      this.applicantService.saveApplicant(applicant)
        .subscribe((data) => {
          this.router.navigate(['/applicant', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let applicant: Applicant = {
        id: this.existingApplicant.id,
        name: this.existingApplicant.name,
        familyName: this.existingApplicant.familyName,
        address: this.existingApplicant.address,
        countryOfOrigin: this.existingApplicant.countryOfOrigin,
        eMailAdress: this.existingApplicant.eMailAdress,
        age: this.existingApplicant.age,
        hired: this.existingApplicant.hired
      };
      this.applicantService.updateApplicant(applicant.id, applicant)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get name() {
    return this.form.get(this.formName);
  }
  get familyName() { return this.form.get(this.formFamilyName); }
  get address() { return this.form.get(this.formAddress); }
  get countryOfOrigin() { return this.form.get(this.formCountryOfOrigin); }
  get emailAddress() { return this.form.get(this.formEmailAddress); }
  get age() { return this.form.get(this.formAge); }
  get hired() { return this.form.get(this.formHired); }


}
