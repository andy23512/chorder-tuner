import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchSector } from './switch-sector';

describe('SwitchSector', () => {
  let component: SwitchSector;
  let fixture: ComponentFixture<SwitchSector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchSector],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchSector);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('center', { x: 0, y: 0 });
    fixture.componentRef.setInput('direction', 'cw');
    fixture.componentRef.setInput('degree', 0);
    fixture.componentRef.setInput('positionCode', 0);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
