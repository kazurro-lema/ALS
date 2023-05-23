import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[showOnlyOnMobile]'
})
export class ShowOnlyOnMobileDirective implements OnDestroy {
  subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.subscription = this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(distinctUntilChanged())
      .subscribe((result) => {
        if (result.matches) {
          if (!this.viewContainer.get(0)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
