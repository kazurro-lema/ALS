export interface IMenuSidenav {
  top: IMenuSidenavItem[];
  bottom: IMenuSidenavItem[];
}

export interface IMenuSidenavItem {
  id: string;
  url: string;
  icon: IMenuIcon;
  label: string;
  auth_level?: string
}

export interface IMenuIcon {
  label: string;
}
