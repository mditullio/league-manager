import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Nation {
  id?: string;
  name: string;
  code?: string;
  flagUrl?: string;
  flagEmoji?: string;
}

@Injectable({ providedIn: 'root' })
export class NationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNations(): Observable<Nation[]> {
    return this.http.get<Nation[]>(`${this.baseUrl}/nations`);
  }

  getNation(id: string): Observable<Nation> {
    return this.http.get<Nation>(`${this.baseUrl}/nations/${id}`);
  }

  createNation(nation: Nation): Observable<Nation> {
    return this.http.post<Nation>(`${this.baseUrl}/nations`, nation);
  }

  updateNation(id: string, nation: Partial<Nation>): Observable<Nation> {
    return this.http.put<Nation>(`${this.baseUrl}/nations/${id}`, nation);
  }

  deleteNation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/nations/${id}`);
  }
}
