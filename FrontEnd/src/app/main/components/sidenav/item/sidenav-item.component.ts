import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IMenuSidenavItem } from "../../../../settings/models/menu.interface";

@Component({
  selector: "sidenav-item",
  templateUrl: "./sidenav-item.component.html",
  styleUrls: ["./sidenav-item.component.scss"],
})
export class SidenavItemComponent implements OnInit {
  @Input() item: IMenuSidenavItem;
  @Input() isSidenavExpanded: boolean;
  @Input() classResolution: string;

  @Output() toggle = new EventEmitter<any>();

  constructor(public router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  toggleSidenav() {
    if (this.classResolution === "mobile-theme") {
      this.toggle.emit();
    }
  }

  makeAction(event:any) {
    window.open(event.url);
  }

  getRouterLink(url: string): string {
    return url;
  }
}
