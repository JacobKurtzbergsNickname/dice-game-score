import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameInputComponent } from './name-input.component';

describe('NameInputComponent', () => {
  let component: NameInputComponent;
  let fixture: ComponentFixture<NameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saves a trimmed name', () => {
    component.draftName = '  Alex  ';

    component.saveName();

    expect(component.name).toBe('Alex');
  });

  it('clears active and draft names', () => {
    component.name = 'Alex';
    component.draftName = 'Alex';

    component.removeName();

    expect(component.name).toBe('');
    expect(component.draftName).toBe('');
  });
});
