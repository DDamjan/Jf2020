import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { User } from '../../models/User';


@Component({
  selector: 'app-user-expansion',
  templateUrl: './detail-expansion.component.html',
  styleUrls: ['./detail-expansion.component.css']
})

export class DetailExpansionComponent implements OnInit {

  panelOpenState = false;
  @Input() public user: User;
  downloadDisabled: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('this.user');
    console.log(this.user);

    if (this.user.cv !== '') {
      this.downloadDisabled = false;
    } else {
      this.downloadDisabled = true;
    }
  }

  onOpen() {
    this.router.navigateByUrl(`userdetails/${this.user.userID}`);
  }

  onDownloadCV() {
      window.location.href = this.user.cv;
  }
}
