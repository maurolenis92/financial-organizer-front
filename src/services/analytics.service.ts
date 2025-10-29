import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  public trackEvent(eventName: string, eventCategory: string, eventLabel: string): void {
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  }

  public trackPageView(url: string): void {
    gtag('config', 'G-E47VVHTDBN', {
      page_path: url,
    });
  }
}
