import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgIntQueryComponent } from './msg-int-query.component';

describe('MsgIntQueryComponent', () => {
  let component: MsgIntQueryComponent;
  let fixture: ComponentFixture<MsgIntQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgIntQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgIntQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
