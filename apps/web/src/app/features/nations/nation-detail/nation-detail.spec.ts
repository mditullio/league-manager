import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationDetail } from './nation-detail';

describe('NationDetail', () => {
  let component: NationDetail;
  let fixture: ComponentFixture<NationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
