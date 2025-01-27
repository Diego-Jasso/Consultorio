import { Component,Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { BodyComponent } from '../body/body.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SidenavComponent,BodyComponent]
})
export class LayoutComponent {

  constructor(private router: Router,
    private authService: AuthService) { }

  @Input() Logged = false;
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
