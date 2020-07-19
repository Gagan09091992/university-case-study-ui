import { Component, OnInit } from "@angular/core";
import { StorageService } from "../services/storage-service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication-service.service";
import { User } from "../model/user"
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public userData: User;
  public userName: string;
  constructor(  private storage: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userData = this.storage.getUserDetails();
    if (this.userData && this.userData.username) {
      this.userName = this.userData.username;
    } else {
      this.router.navigate(["/"]);
    }
  }
// Redirect to discussion,message or blog section.
redirect(section: string) {
  switch (section) {
    case 'discussion': this.router.navigate(['discussion']); break;
    case 'blog': this.router.navigate(['blog']); break;
    case 'message': this.router.navigate(['message']); break;
  }
}

goToHome() {
  this.router.navigate(["home"]);
}

// On log out
logout() {
  this.authenticationService.logout();
}
}
