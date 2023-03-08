import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrModifyGameComponent } from './add-or-modify-game.component';

describe('AddOrModifyGameComponent', () => {
  let component: AddOrModifyGameComponent;
  let fixture: ComponentFixture<AddOrModifyGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrModifyGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrModifyGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
