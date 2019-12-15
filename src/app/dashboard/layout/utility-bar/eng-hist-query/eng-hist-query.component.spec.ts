import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngHistQueryComponent } from './eng-hist-query.component';

describe('EngHistQueryComponent', () => {
  let component: EngHistQueryComponent;
  let fixture: ComponentFixture<EngHistQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngHistQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngHistQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
