import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClosetComponent } from './add-closet.component';

describe('AddClosetComponent', () => {
  let component: AddClosetComponent;
  let fixture: ComponentFixture<AddClosetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClosetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClosetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
