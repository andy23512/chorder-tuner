import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Switch } from './switch';

describe('Switch', () => {
  let component: Switch;
  let fixture: ComponentFixture<Switch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Switch],
    }).compileComponents();

    fixture = TestBed.createComponent(Switch);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('center', { x: 0, y: 0 });
    fixture.componentRef.setInput('rotationDirection', 'cw');
    fixture.componentRef.setInput('positionCodeMap', { n: 0, e: 1, s: 2, w: 3, c: 4 });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
