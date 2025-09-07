import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface League {
  id?: string;
  name: string;
  nation?: { id: string; name: string };
  logoUrl?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class LeagueService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all leagues (optionally filtered by nation or name)
  getLeagues(nation?: string, name?: string): Observable<League[]> {
    let params: any = {};
    if (nation) params.nation = nation;
    if (name) params.name = name;
    return this.http.get<League[]>(`${this.baseUrl}/leagues`, { params });
  }

  // Get a single league by id
  getLeague(id: string): Observable<League> {
    return this.http.get<League>(`${this.baseUrl}/leagues/${id}`);
  }

  // Create a new league
  createLeague(league: League): Observable<League> {
    return this.http.post<League>(`${this.baseUrl}/leagues`, league);
  }

  // Update a league
  updateLeague(id: string, league: Partial<League>): Observable<League> {
    return this.http.put<League>(`${this.baseUrl}/leagues/${id}`, league);
  }

  // Delete a league
  deleteLeague(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/leagues/${id}`);
  }
}
