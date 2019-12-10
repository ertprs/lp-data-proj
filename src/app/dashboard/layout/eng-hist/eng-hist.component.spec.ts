import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngHistComponent } from './eng-hist.component';

describe('EngHistComponent', () => {
  let component: EngHistComponent;
  let fixture: ComponentFixture<EngHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
