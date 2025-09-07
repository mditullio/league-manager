import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LeagueService, League } from '../league.service';
import { NationService, Nation } from '../../nations/nation.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'league-detail',
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
  templateUrl: './league-detail.html',
  styleUrls: ['./league-detail.scss']
})
export class LeagueDetailComponent implements OnInit {
  form!: FormGroup;
  leagueId?: string | null;
  isNew = false;
  nations: Nation[] = [];

  constructor(
    private fb: FormBuilder,
    private leagueService: LeagueService,
    private nationService: NationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  this.leagueId = this.route.snapshot.paramMap.get('id') || null;
  this.isNew = !this.leagueId;
    this.form = this.fb.group({
      name: ['', Validators.required],
      nation: [null, Validators.required],
      logoUrl: [''],
      description: ['']
    });
    this.nationService.getNations().subscribe(nations => {
      this.nations = nations;
    });
    if (!this.isNew && this.leagueId) {
      this.leagueService.getLeague(this.leagueId).subscribe(league => {
        this.form.patchValue({
          ...league,
          nation: league.nation?.id
        });
      });
    }
  }

  save() {
    const value = this.form.value;
    const league: League = {
      ...value,
      nation: value.nation ? { id: value.nation, name: '' } : undefined
    };
    if (!this.isNew && this.leagueId) {
      this.leagueService.updateLeague(this.leagueId, league).subscribe(() => {
        this.router.navigate(['/leagues']);
      });
    } else {
      this.leagueService.createLeague(league).subscribe(() => {
        this.router.navigate(['/leagues']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/leagues']);
  }
}
