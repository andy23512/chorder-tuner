import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarButton } from './toolbar-button';

describe('ToolbarButton', () => {
  let component: ToolbarButton;
  let fixture: ComponentFixture<ToolbarButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
