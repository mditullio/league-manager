import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationService, Nation } from '../nation.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'nation-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './nation-list.html',
  styleUrls: ['./nation-list.scss']
})
export class NationListComponent implements OnInit {
  nations: Nation[] = [];
  displayedColumns: string[] = ['flagUrl', 'code', 'name', 'actions'];

  constructor(private nationService: NationService, private router: Router) {}

  ngOnInit() {
    this.nationService.getNations().subscribe(nations => {
      this.nations = nations.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  editNation(nation: Nation) {
    this.router.navigate(['/nations', 'edit', nation.id]);
  }

  addNation() {
    this.router.navigate(['/nations', 'new']);
  }
}
