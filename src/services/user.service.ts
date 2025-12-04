import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable, tap } from 'rxjs';
import { Category, UserDetail, UserState } from '../app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClientService);
  private userProfile: WritableSignal<UserState> = signal({ userProfile: null });
  private categories: WritableSignal<Category[]> = signal([]);

  public userData = computed(() => this.userProfile());
  public userCategories = computed(() => this.categories());

  public getUserProfile(): Observable<UserDetail> {
    return this.http.get<UserDetail>('user').pipe(
      tap(userProfile => {
        this.categories.set(userProfile.categories);
        this.userProfile.set({
          userProfile,
          initialLetters: userProfile.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase(),
        });
      })
    );
  }
}
