import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CompanyService } from 'app/service/company.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() public type: any;
  @Input() public title: any;
  @Input() public data: any;
  public isPersonalData: boolean;
  public isResidence: boolean;
  public isPermanentResidence: boolean;
  public isHighSchoolEducation: boolean;
  public isHigherEducation: boolean;
  public isWorkExperience: boolean;
  public isInternshipExperience: boolean;
  public isComputerSkills: boolean;
  public isProjectWork: boolean;
  public isLanguages: boolean;
  public isOtehrSkills: boolean;

  public downloadDisabled: boolean;
  public picPath: string;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    if (this.data !== undefined) {
      this.isPersonalData = this.type === 'personalData';
      this.isResidence = this.type === 'residence';
      this.isPermanentResidence = this.type === 'permanentResidence';
      this.isHighSchoolEducation = this.type === 'highSchoolEducation';
      this.isHigherEducation = this.type === 'higherEducation';
      this.isWorkExperience = this.type === 'workExperience';
      this.isInternshipExperience = this.type === 'internshipExperience';
      this.isComputerSkills = this.type === 'computerSkills';
      this.isProjectWork = this.type === 'projectsWork';
      this.isLanguages = this.type === 'languages';
      this.isOtehrSkills = this.type === 'otherSkills';
      if (this.isWorkExperience) {
        console.log(this.data.iskustvo.ostaleVestine);
      }

      if (this.isPersonalData) {
        if (this.data.licniPodaci.profilnaSlika === null) {
          this.picPath = 'assets/defaultProfileImg.png';
        } else {
          this.picPath = this.data.licniPodaci.profilnaSlika;
        }
        if (this.data.licniPodaci.cv == null) {
          this.downloadDisabled = true;
        } else {
          this.downloadDisabled = false;
        }
      }
    }

  }

  onReturn() {
    this.router.navigate(['cvoverview']);
  }

  onDownloadCV() {
    window.location.href = this.data.licniPodaci.cv;
  }
}
