import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecpieStarterComponent } from './recpie-starter.component';

describe('RecpieStarterComponent', () => {
  let component: RecpieStarterComponent;
  let fixture: ComponentFixture<RecpieStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecpieStarterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecpieStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
