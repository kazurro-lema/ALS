import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInscriptionComponent } from './event-inscription.component';

describe('EventInscriptionComponent', () => {
  let component: EventInscriptionComponent;
  let fixture: ComponentFixture<EventInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
