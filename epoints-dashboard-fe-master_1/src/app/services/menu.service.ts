import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: 'Home', requestedPath: '/', path: '/home', children: [] },
      { name: 'Home', requestedPath: '/signup', path: '/home', children: [] },
      { name: 'Home', requestedPath: '/signup/verify', path: '/home', children: [] },

      {
        name: 'Home',
        requestedPath: '/home',
        path: '/home',
        children: [
          {
            name: 'Active Product Breakdown',
            requestedPath: '/active-products',
            path: '/active-products',
            children: []
          }
        ]
      },
    ];

    return menu;
  }
}
