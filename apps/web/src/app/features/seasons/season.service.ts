import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SeasonDto {
  id?: string;
  league?: { id: string; name?: string };
  name: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({ providedIn: 'root' })
export class SeasonService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all seasons for a league
  getSeasonsByLeague(leagueId: string): Observable<SeasonDto[]> {
    return this.http.get<SeasonDto[]>(`${this.baseUrl}/leagues/${leagueId}/seasons`);
  }

  // Get a single season by id
  getSeason(id: string): Observable<SeasonDto> {
    return this.http.get<SeasonDto>(`${this.baseUrl}/seasons/${id}`);
  }

  // Create a new season for a league
  createSeason(leagueId: string, season: SeasonDto): Observable<SeasonDto> {
    return this.http.post<SeasonDto>(`${this.baseUrl}/leagues/${leagueId}/seasons`, season);
  }

  // Update a season
  updateSeason(id: string, season: Partial<SeasonDto>): Observable<SeasonDto> {
    return this.http.patch<SeasonDto>(`${this.baseUrl}/seasons/${id}`, season);
  }

  // Delete a season
  deleteSeason(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/seasons/${id}`);
  }
}