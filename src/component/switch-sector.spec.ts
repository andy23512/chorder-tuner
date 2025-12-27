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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
