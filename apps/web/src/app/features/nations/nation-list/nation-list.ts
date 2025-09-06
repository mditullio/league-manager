import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NationService, Nation } from '../nation.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'nation-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './nation-list.html',
  styleUrls: ['./nation-list.scss']
})
export class NationListComponent implements OnInit {
  nations: Nation[] = [];
  displayedColumns: string[] = ['name', 'code', 'flagUrl'];

  constructor(private nationService: NationService) {}

  ngOnInit() {
    this.nationService.getNations().subscribe(nations => {
      this.nations = nations;
    });
  }
}
