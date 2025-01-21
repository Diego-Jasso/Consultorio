import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { menuData } from './menu-data';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  menu= menuData;
  constructor(private authService: AuthService,
    private router: Router) { }

  getHeaderClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'header-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'header-md-screen';
    }
    return styleClass;
  }

  logOut(exit:boolean) {
    if (exit) {
      this.authService.logOut();
    }
  }
}
