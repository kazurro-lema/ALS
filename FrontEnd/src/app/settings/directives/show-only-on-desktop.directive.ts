import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[showOnlyOnDesktop]'
})
export class ShowOnlyOnDesktopDirective implements OnDestroy {
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
          this.viewContainer.clear();
        } else if (!this.viewContainer.get(0)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
