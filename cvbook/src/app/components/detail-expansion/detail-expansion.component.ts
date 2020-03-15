import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-expansion',
  templateUrl: './detail-expansion.component.html',
  styleUrls: ['./detail-expansion.component.css']
})

export class DetailExpansionComponent implements OnInit {

  panelOpenState = false;
  @Input() public user: User;
  @Input() public displayedRows$: any;
  public color: any;
  public downloadDisabled: boolean;
  public isBookmarked: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.isBookmarked = false; // eYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY menjaj ovo
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
    } );
  }

  onOpen() {
    this.router.navigateByUrl(`userdetails/${this.user.userID}`);
  }

  onDownloadCV() {
      window.location.href = this.user.cv;
  }

  onToggleBookmarked(marked) {
    this.isBookmarked = marked;
  }
}
