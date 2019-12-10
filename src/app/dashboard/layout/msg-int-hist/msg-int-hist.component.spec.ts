import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgIntHistComponent } from './msg-int-hist.component';

describe('MsgIntHistComponent', () => {
  let component: MsgIntHistComponent;
  let fixture: ComponentFixture<MsgIntHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgIntHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgIntHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
