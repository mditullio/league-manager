import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'team-colors-flag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flag" [ngStyle]="{ width: width + 'px', height: height + 'px' }">
      <ng-container *ngFor="let color of colors; let i = index">
        <div class="band" [ngStyle]="getBandStyle(i)"></div>
      </ng-container>
    </div>
  `,
  styleUrl: './team-colors-flag.scss'
})
export class TeamColorsFlag {
  @Input() colors: string[] = [];
  @Input() width = 32;
  @Input() height = 20;

  getBandStyle(index: number) {
    const bandWidth = this.width / (this.colors.length || 1);
    return {
      background: this.colors[index],
      width: bandWidth + 'px',
      height: this.height + 'px',
      display: 'inline-block',
      margin: '0',
      padding: '0',
      border: '0px solid #ccc',
      boxSizing: 'border-box',
    };
  }
}
