import { CanMatch, Route, UrlSegment, CanMatchFn } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') == null;
    }
    return false; // or any default behavior for server-side
  }
}
