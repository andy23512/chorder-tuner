import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyLabelComponent } from './key-label.component';

describe('KeyLabelComponent', () => {
  let component: KeyLabelComponent;
  let fixture: ComponentFixture<KeyLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyLabelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('x', 0);
    fixture.componentRef.setInput('y', 0);
    fixture.componentRef.setInput('labels', []);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
