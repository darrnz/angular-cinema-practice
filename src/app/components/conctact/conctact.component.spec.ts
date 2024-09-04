import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConctactComponent } from './conctact.component';

describe('ConctactComponent', () => {
  let component: ConctactComponent;
  let fixture: ComponentFixture<ConctactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConctactComponent]
    });
    fixture = TestBed.createComponent(ConctactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
