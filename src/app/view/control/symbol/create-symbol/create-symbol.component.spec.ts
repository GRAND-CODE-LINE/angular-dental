import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSymbolComponent } from './create-symbol.component';

describe('CreateSymbolComponent', () => {
  let component: CreateSymbolComponent;
  let fixture: ComponentFixture<CreateSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
