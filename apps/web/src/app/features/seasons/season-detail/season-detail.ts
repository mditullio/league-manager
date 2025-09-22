import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeasonService, SeasonDto } from '../season.service';
import { LeagueService, League } from '../../leagues/league.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'season-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './season-detail.html',
  styleUrls: ['./season-detail.scss']
})
export class SeasonDetailComponent implements OnInit {
  form!: FormGroup;
  seasonId?: string | null;
  isNew = false;
  leagues: League[] = [];

  constructor(
    private fb: FormBuilder,
    private seasonService: SeasonService,
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.seasonId = this.route.snapshot.paramMap.get('id') || null;
    this.isNew = !this.seasonId;
    this.form = this.fb.group({
      name: ['', Validators.required],
      league: [null, Validators.required],
      startDate: [''],
      endDate: ['']
    });
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
    });
    if (!this.isNew && this.seasonId) {
      this.seasonService.getSeason(this.seasonId).subscribe(season => {
        this.form.patchValue({
          ...season,
          league: season.league?.id
        });
      });
    }
  }

  save() {
    const value = this.form.value;
    const season: SeasonDto = {
      ...value,
      league: value.league ? { id: value.league, name: '' } : undefined
    };
    if (!this.isNew && this.seasonId) {
      this.seasonService.updateSeason(this.seasonId, season).subscribe(() => {
        this.router.navigate(['/seasons'], { queryParams: { league: value.league } });
      });
    } else {
      this.seasonService.createSeason(value.league, season).subscribe(() => {
        this.router.navigate(['/seasons'], { queryParams: { league: value.league } });
      });
    }
  }

  cancel() {
    const value = this.form.value;
    this.router.navigate(['/seasons'], { queryParams: { league: value.league } });
  }
}
