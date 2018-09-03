import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFloatBallComponent } from './ngx-float-ball.component';

describe('NgxFloatBallComponent', () => {
  let component: NgxFloatBallComponent;
  let fixture: ComponentFixture<NgxFloatBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFloatBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFloatBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
