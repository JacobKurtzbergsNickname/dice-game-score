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

  it('emits trimmed name and updates draft on save', () => {
    const emitted: string[] = [];
    component.nameChange.subscribe((v) => emitted.push(v));
    component.draftName = '  Alex  ';

    component.saveName();

    expect(emitted).toEqual(['Alex']);
    expect(component.draftName).toBe('Alex');
  });

  it('emits empty string and clears draft on remove', () => {
    const emitted: string[] = [];
    component.nameChange.subscribe((v) => emitted.push(v));
    component.draftName = 'Alex';

    component.removeName();

    expect(emitted).toEqual(['']);
    expect(component.draftName).toBe('');
  });
});
