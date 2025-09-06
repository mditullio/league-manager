import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService, Team } from '../team.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TeamColorsFlag } from '../team-colors-flag/team-colors-flag';

@Component({
  selector: 'team-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, TeamColorsFlag],
  templateUrl: './team-list.html',
  styleUrls: ['./team-list.scss']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
  displayedColumns: string[] = ['colors', 'shortName', 'name', 'city', 'nation', 'actions'];

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  editTeam(team: Team) {
    this.router.navigate(['/teams', 'edit', team.id]);
  }

  addTeam() {
    this.router.navigate(['/teams', 'new']);
  }
}
