import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/login', title: 'Login',  icon: 'ni-key-25 text-info', class: '' },
    { path: '/links-uteis', title: 'Links Úteis',  icon: 'ni-bulb-61 text-green', class: '' },
    { path: '/marcas', title: 'Marcas',  icon: 'ni-collection text-red', class: '' },
    { path: '/operadoras', title: 'Operadoras',  icon: 'ni-settings-gear-65 text-blue', class: '' },
    { path: '/unidades', title: 'Unidades',  icon: 'ni-building text-red', class: '' },
    { path: '/usuarios', title: 'Usuários',  icon: 'ni-circle-08 text-green', class: '' },
    { path: '/pesquisacip', title: 'Pesquisa CIP',  icon: 'ni-bullet-list-67 text-blue', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
