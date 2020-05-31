import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAddEditComponent } from './applicant-add-edit.component';

describe('ApplicantAddEditComponent', () => {
  let component: ApplicantAddEditComponent;
  let fixture: ComponentFixture<ApplicantAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
