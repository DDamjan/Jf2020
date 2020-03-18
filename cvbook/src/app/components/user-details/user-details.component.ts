import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as actions from '../../store/actions';
import { selectAllUser } from 'app/store/reducers/user.reducer';
import { CompanyService } from 'app/service/company.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public data: any;
  public isReady: boolean;
  public isNewUserDetails: boolean;
  public isBookmarked: boolean;
  public selectedIndex: any;

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#B5D6EB';
    this.isNewUserDetails = true;
    this.selectedIndex = 1;
    this.isBookmarked = false;

    const id = this.route.snapshot.paramMap.get('id');
    const lStorage = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    this.companyService.addToHistory(id, lStorage.kompanijaID).subscribe();
    this.store.dispatch(new actions.GetUser({userID: id, kompanijaID: lStorage.kompanijaID}));
    this.store.select(selectAllUser).subscribe(user => {
      if (user.length === 0) {
        this.isReady = false;
      } else {
        this.data = user[0];
        this.isBookmarked = user[0].isFavourite !== 0 ? true : false;
        console.log(this.data);
        this.isReady = true;
      }
    });
  }

  onToggleBookmarked() {
    this.isBookmarked = !this.isBookmarked;
    const company = JSON.parse(localStorage.getItem('CVBook-CurrentCompany'));
    if (this.isBookmarked === true) {
      this.companyService.addToFavourites({ userID: this.data.userID, kompanijaID: company.kompanijaID }).subscribe();
    } else {
      this.companyService.removeFromFavourites({ userID: this.data.userID, kompanijaID: company.kompanijaID }).subscribe();
    }
  }

  onReturn() {
    history.back();
  }
}
