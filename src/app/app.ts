import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from '../component/toolbar';

@Component({
  imports: [Toolbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
