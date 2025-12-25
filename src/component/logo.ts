import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  private readonly r1 = 16;
  protected readonly r2 = 7;
  private readonly tickLineLength = 3;
  public cShapePath = `
	  M ${this.r1 * Math.cos((45 / 180) * Math.PI)} ${-this.r1 * Math.sin((45 / 180) * Math.PI)}
		A ${this.r1} ${this.r1} 0 1 0 ${this.r1 * Math.cos((45 / 180) * Math.PI)} ${this.r1 * Math.sin((45 / 180) * Math.PI)}
	`;
  public tickLines = [45, 90, 135, 180, 225, 270, 315].map((angle) => ({
    x1: this.r1 * Math.cos((angle / 180) * Math.PI),
    y1: this.r1 * Math.sin((angle / 180) * Math.PI),
    x2: (this.r1 - this.tickLineLength) * Math.cos((angle / 180) * Math.PI),
    y2: (this.r1 - this.tickLineLength) * Math.sin((angle / 180) * Math.PI),
  }));
  public pointerLineAngle = Math.floor(Math.random() * 270 + 45);
  public pointerLineEnd = {
    x: this.r2 * Math.cos((this.pointerLineAngle / 180) * Math.PI),
    y: this.r2 * Math.sin((this.pointerLineAngle / 180) * Math.PI),
  };
}
