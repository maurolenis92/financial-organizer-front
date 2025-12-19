/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

export interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  public screenSize$!: Observable<ScreenSize>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.screenSize$ = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map(result => ({
          isMobile:
            result.breakpoints[Breakpoints.XSmall] ||
            result.breakpoints[Breakpoints.Small],
          isTablet: result.breakpoints[Breakpoints.Medium],
          isDesktop:
            result.breakpoints[Breakpoints.Large] ||
            result.breakpoints[Breakpoints.XLarge],
          width: window.innerWidth,
        })),
        shareReplay(1) // Comparte el último valor con todos los subscribers
      );
  }

  // Método helper para obtener el valor actual sin subscribe
  public get isMobile(): boolean {
    return window.innerWidth < 768;
  }

  public get isTablet(): boolean {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }

  public get isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }
}
