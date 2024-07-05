import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemenuComponent } from './createmenu.component';

describe('CreatemenuComponent', () => {
  let component: CreatemenuComponent;
  let fixture: ComponentFixture<CreatemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemenuComponent]
    });
    fixture = TestBed.createComponent(CreatemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
