import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private profileService: ProfileService){}
  profile;
  ngOnInit(): void {
    this.profile=this.profileService.getProfile()
  }
}
