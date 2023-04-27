import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniFilterComponent } from './mini-filter.component';

describe('MiniFilterComponent', () => {
  let component: MiniFilterComponent;
  let fixture: ComponentFixture<MiniFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
