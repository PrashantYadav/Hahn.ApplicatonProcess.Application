import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../Services/applicant.service';
import { Applicant } from '../../Models/applicant.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  applicant$: Observable<Applicant>;
  postId: number;

  constructor(private applicantService: ApplicantService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadApplicant();
  }

  loadApplicant() {
    this.applicant$ = this.applicantService.getApplicant(this.postId);
  }

}
