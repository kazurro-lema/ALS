import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanFormComponent } from './ban-form.component';

describe('BanFormComponent', () => {
  let component: BanFormComponent;
  let fixture: ComponentFixture<BanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
