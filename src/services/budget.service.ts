import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClientService } from './http/http-client.service';
import { Observable, tap } from 'rxjs';
import { Budget, BudgetDetail, BudgetState } from '../app/models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private http = inject(HttpClientService);
  private budgetState: WritableSignal<BudgetState> = signal({
    budgets: [],
    activeBudgetId: null,
  });

  public budgets = computed(() => this.budgetState());

  public getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>('budgets').pipe(
      tap(budgets => {
        this.budgetState.set({ budgets, activeBudgetId: null });
      })
    );
  }

  public createBudget(budgetData: Partial<BudgetDetail>): Observable<unknown> {
    return this.http.post<unknown>('budgets', { body: budgetData });
  }

  public getBudgetById(budgetId: string): Observable<BudgetDetail> {
    return this.http.get<BudgetDetail>(`budgets/${budgetId}`);
  }

  public deleteBudget(budgetId: string): Observable<unknown> {
    return this.http.delete<unknown>(`budgets/${budgetId}`);
  }

  public updateBudget(budgetId: string, budgetData: BudgetDetail): Observable<unknown> {
    return this.http.put<unknown>(`budgets/${budgetId}`, {
      body: budgetData,
    });
  }
}
