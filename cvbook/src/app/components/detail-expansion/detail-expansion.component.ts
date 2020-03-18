import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { CompanyService } from 'app/service/company.service';

@Component({
  selector: 'app-user-expansion',
  templateUrl: './detail-expansion.component.html',
  styleUrls: ['./detail-expansion.component.css']
})

export class DetailExpansionComponent implements OnInit {

  panelOpenState = false;
  @Input() public user: User;
  @Input() public displayedRows$: any;
  @Input() public isHistory: boolean;
  public color: any;
  public downloadDisabled: boolean;
  public isBookmarked: boolean;
  constructor(private router: Router, private kompanijaService: CompanyService) { }

  ngOnInit() {
    console.log(this.user);
    if (this.user.isFavourite === 0) {
      this.isBookmarked = false;
    } else {
      this.isBookmarked = true;
    }

    if (this.user.cv == null || this.user.cv === '') {
      this.downloadDisabled = true;
    } else {
      this.downloadDisabled = false;
    }
    this.displayedRows$.subscribe((userList) => {
      if (userList.indexOf(this.user) % 2 === 0) {
        this.color = '#A9DDFF';
      } else {
        this.color = 'white';
      }
    });
  }

  onOpen() {
    const company = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    this.kompanijaService.addToHistory(this.user.userID, company.kompanijaID).subscribe();
    this.router.navigateByUrl(`userdetails/${this.user.userID}`);
  }

  onDownloadCV() {
    const company = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    this.kompanijaService.addToDownloaded({userID: this.user.userID, kompanijaID: company.kompanijaID}).subscribe();
    window.location.href = this.user.cv;
  }

  onToggleBookmarked(marked) {
    this.isBookmarked = marked;
    const company = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    if (marked === true) {
      this.kompanijaService.addToFavourites({ userID: this.user.userID, kompanijaID: company.kompanijaID }).subscribe();
    } else {
      this.kompanijaService.removeFromFavourites({ userID: this.user.userID, kompanijaID: company.kompanijaID }).subscribe();
    }
  }
}
