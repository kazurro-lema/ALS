import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MENUSIDENAV } from '../../../settings/config/menu-sidenav.config';
import { IMenuSidenav } from '../../../settings/models/menu.interface';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('collapseExpandMenu', [
      state('collapsed', style({ width: '80px' })),
      state('expanded', style({ width: '308px' })),
      transition('collapsed <=> expanded', animate('250ms ease')),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  @Input() classResolution: string;

  @Output() toggleSidenav = new EventEmitter<any>();

  animating = false;

  public menu: IMenuSidenav;
  public isExpanded = false;

  public resizer = new Subject();

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.menu = MENUSIDENAV;

    this.resizer
      .asObservable()
      .pipe(debounceTime(600))
      .subscribe(() => {
        window.dispatchEvent(new Event('resize'));
      });
  }

  toggleSideNav() {
    this.isExpanded = !this.isExpanded;
    this.toggleSidenav.emit(this.isExpanded);
    this.resizer.next(true);
  }

  animationStart() {
    this.animating = true;
    this.tick();
  }

  animationDone() {
    this.animating = false;
  }

  tick() {
    if (this.animating) requestAnimationFrame(() => this.tick());
  }

  logout() {
    this.auth.clearStorage();
    this.router.navigate(['./login']);
    this.toastrService.success(
      this.translate.instant('COMPONENT.TOAST.LOGOUT_SUCCESSFULLY')
    );
  }

  canBeShown(authLevelRequired: string){
    return this.auth.checkAuthLevel(authLevelRequired);
  }
}
