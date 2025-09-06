import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Team {
  id?: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
  nation?: { id: string; name: string };
  founded?: number;
  city?: string;
  stadium?: string;
  colors?: string[];
}

@Injectable({ providedIn: 'root' })
export class TeamService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all teams (optionally filtered by nation or name)
  getTeams(nation?: string, name?: string): Observable<Team[]> {
    let params: any = {};
    if (nation) params.nation = nation;
    if (name) params.name = name;
    return this.http.get<Team[]>(`${this.baseUrl}/teams`, { params });
  }

  // Get a single team by id
  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/teams/${id}`);
  }

  // Create a new team
  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/teams`, team);
  }

  // Update a team
  updateTeam(id: string, team: Partial<Team>): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/teams/${id}`, team);
  }

  // Delete a team
  deleteTeam(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teams/${id}`);
  }
}
