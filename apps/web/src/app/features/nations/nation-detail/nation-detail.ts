import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NationService, Nation } from '../nation.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-nation-detail',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './nation-detail.html',
    styleUrl: './nation-detail.scss'
})
export class NationDetailComponent implements OnInit {
    form: FormGroup;
    nationId: string | null = null;
    isNew = false;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private nationService: NationService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            code: [''],
            flagUrl: [''],
            flagEmoji: ['']
        });
    }

    ngOnInit() {
        this.nationId = this.route.snapshot.paramMap.get('id');
        this.isNew = this.nationId == null;
        if (!this.isNew && this.nationId) {
            this.loading = true;
            this.nationService.getNation(this.nationId).subscribe(nation => {
                this.form.patchValue(nation);
                this.loading = false;
            });
        }
    }

    save() {
        if (this.form.invalid) return;
        const nation: Nation = this.form.value;
        if (this.isNew) {
            this.nationService.createNation(nation).subscribe(() => {
                this.router.navigate(['/nations']);
            });
        } else if (this.nationId) {
            this.nationService.updateNation(this.nationId, nation).subscribe(() => {
                this.router.navigate(['/nations']);
            });
        }
    }

    cancel() {
        this.router.navigate(['/nations']);
    }
}
