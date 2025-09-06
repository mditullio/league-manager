import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService, Team } from '../team.service';
import { NationService, Nation } from '../../nations/nation.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TeamColorsFlag } from '../team-colors-flag/team-colors-flag';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'team-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    TeamColorsFlag
  ],
  templateUrl: './team-detail.html',
  styleUrls: ['./team-detail.scss']
})
export class TeamDetailComponent implements OnInit {
  onColorsInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const colors = input.split(',').map(c => c.trim()).filter(c => !!c);
    this.form.get('colors')?.setValue(colors);
  }
  form!: FormGroup;
  teamId: string | null = null;
  isNew = false;
  previewColors: string[] = [];
  nations: Nation[] = [];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private nationService: NationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id') || null;
    this.isNew = this.teamId == null;
    this.form = this.fb.group({
      name: ['', Validators.required],
      shortName: [''],
      logoUrl: [''],
      nation: [null, Validators.required],
      founded: [''],
      city: [''],
      stadium: [''],
      colors: [[]]
    });
    this.nationService.getNations().subscribe(nations => {
      this.nations = nations;
    });
    if (this.teamId) {
      this.teamService.getTeam(this.teamId).subscribe(team => {
        this.form.patchValue({
          ...team,
          nation: team.nation?.id,
          colors: team.colors || []
        });
        this.previewColors = team.colors || [];
      });
    }
    this.form.get('colors')?.valueChanges.subscribe(colors => {
      this.previewColors = colors || [];
    });
  }

  save() {
    const value = this.form.value;
    const team: Team = {
      ...value,
      nation: value.nation ? { id: value.nation, name: '' } : undefined,
      colors: value.colors || []
    };
    if (this.teamId) {
      this.teamService.updateTeam(this.teamId, team).subscribe(() => {
        this.router.navigate(['/teams']);
      });
    } else {
      this.teamService.createTeam(team).subscribe(() => {
        this.router.navigate(['/teams']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/teams']);
  }
}
