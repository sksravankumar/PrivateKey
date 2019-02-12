import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';

import { AlertService, AuthenticateService, MenuService } from './services';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';

  currentUser: User;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];

  constructor(
    private alertService: AlertService,
    private authenticateService: AuthenticateService,
    private menuService: MenuService,
    private router: Router
  ) {
    this.authenticateService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        // remove tooltip
      }
    });

    this.authenticateService.currentUser.subscribe(x => {
      if(x) {
        /* it is the list of routes that the breadcrumb will detect and show the menu accordingly */
        this.menu = this.menuService.getMenu();
        this.listenRouting();
      }
    })
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      /* here routeUrl is the path that the url is requesting */
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // breadcrumb menu
        target = this.menu;
        this.breadcrumbList.length = 0;
        // routeUrl.slice(1) will first take out the first string. Example if the url is /home then it will show just home
        routerList = routerUrl.slice(1).split('/'); // after split, the separated strings will be kept in an array.
        routerList.forEach((router, index) => {
          /* here it is checked if the url in the browser exists in the breadcrumb menu list */
          target = target.find(page => page.requestedPath.slice(1) === router);
          // the result is pushed in the breadcrumb list menu
          if (target) {
            this.breadcrumbList.push({
              name: target.name,
              path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(1)}`
            });
          }

          /* here the target.children is assigned to target so that the loop does not have to go through
          the children array to compare requestedPath and get the name and path
          example: home/active-products. here home is parent and active-products is children*/
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });
      }
    });
  }

  logout() {
    event.preventDefault();
    this.authenticateService.logout()
    .pipe(first())
    .subscribe(
      response => {
        this.router.navigate(['/']);
      }, error => {
        this.alertService.error(error);
      });
  }
}
