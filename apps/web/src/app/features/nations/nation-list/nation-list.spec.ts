import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationList } from './nation-list';

describe('NationList', () => {
  let component: NationList;
  let fixture: ComponentFixture<NationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
