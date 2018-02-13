import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamReceiptComponent } from './team-receipt.component';

describe('TeamReceiptComponent', () => {
  let component: TeamReceiptComponent;
  let fixture: ComponentFixture<TeamReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
