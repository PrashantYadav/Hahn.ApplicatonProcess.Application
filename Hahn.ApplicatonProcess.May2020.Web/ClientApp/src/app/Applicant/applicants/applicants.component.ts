import { ApplicantService } from './../../Services/applicant.service';
import { Applicant } from './../../Models/applicant.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  applicants$: Observable<Applicant[]>;

  constructor(private applicantService: ApplicantService) {
  }

  ngOnInit() {
    this.loadApplicants();
  }

  loadApplicants() {
    this.applicants$ = this.applicantService.getApplicants();
  }

  delete(postId) {
    const ans = confirm('Do you want to delete applicant with id: ' + postId);
    if (ans) {
      this.applicantService.deleteApplicant(postId).subscribe((data) => {
        this.loadApplicants();
      });
    }
  }

}
