import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingBarsComponent } from './racing-bars.component';

describe('RacingBarsComponent', () => {
  let component: RacingBarsComponent;
  let fixture: ComponentFixture<RacingBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacingBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
