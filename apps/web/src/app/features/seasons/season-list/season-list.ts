import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonService, SeasonDto } from '../season.service';
import { LeagueService, League } from '../../leagues/league.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'season-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatSelectModule, RouterModule],
  templateUrl: './season-list.html',
  styleUrls: ['./season-list.scss']
})
export class SeasonListComponent implements OnInit {
  leagues: League[] = [];
  selectedLeagueId: string | null = null;
  seasons: SeasonDto[] = [];
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'actions'];

  constructor(
    private seasonService: SeasonService,
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const leagueId = params.get('league');
      this.selectedLeagueId = leagueId;
      this.leagueService.getLeagues().subscribe(leagues => {
        this.leagues = leagues.sort((a, b) => a.name.localeCompare(b.name));
        if (leagueId) {
          this.onLeagueChange();
        }
      });
    });
  }

  onLeagueChange() {
    if (this.selectedLeagueId) {
      this.router.navigate([], {
        queryParams: { league: this.selectedLeagueId },
        queryParamsHandling: 'merge', // preserves other params
        replaceUrl: true // avoids pushing a new history entry
      });
      this.seasonService.getSeasonsByLeague(this.selectedLeagueId).subscribe(seasons => {
        this.seasons = seasons.sort((a, b) => a.name.localeCompare(b.name));
      });
    } else {
      this.seasons = [];
      this.router.navigate([], {
        queryParams: { league: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }

  editSeason(season: SeasonDto) {
    this.router.navigate(['/seasons', 'edit', season.id]);
  }

  addSeason() {
    if (this.selectedLeagueId) {
      this.router.navigate(['/seasons', 'new'], { queryParams: { leagueId: this.selectedLeagueId } });
    }
  }
}
