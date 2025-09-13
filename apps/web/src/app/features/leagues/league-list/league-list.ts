import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueService, League } from '../league.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'league-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './league-list.html',
  styleUrls: ['./league-list.scss']
})
export class LeagueListComponent implements OnInit {
  leagues: League[] = [];
  displayedColumns: string[] = ['logoUrl', 'name', 'nation', 'description', 'actions'];

  constructor(private leagueService: LeagueService, private router: Router) {}

  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  editLeague(league: League) {
    this.router.navigate(['/leagues', 'edit', league.id]);
  }

  goToSeasons(league: League) {
    this.router.navigate(['/seasons'], { queryParams: { league: league.id } });
  }

  addLeague() {
    this.router.navigate(['/leagues', 'new']);
  }
}
