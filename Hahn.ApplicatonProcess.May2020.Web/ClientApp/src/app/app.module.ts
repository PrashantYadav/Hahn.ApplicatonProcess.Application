import { ApplicantService } from './Services/applicant.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicantComponent } from './Applicant/applicant/applicant.component';
import { ApplicantsComponent } from './Applicant/applicants/applicants.component';
import { ApplicantAddEditComponent } from './Applicant/applicant-add-edit/applicant-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicantComponent,
    ApplicantsComponent,
    ApplicantAddEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ApplicantsComponent, pathMatch: 'full' },
      { path: 'applicant/:id', component: ApplicantComponent },
      { path: 'add', component: ApplicantAddEditComponent },
      { path: 'applicant/edit/:id', component: ApplicantAddEditComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [ApplicantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
