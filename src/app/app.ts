import { Component } from '@angular/core';
import { Logo } from '../component/logo';

@Component({
  imports: [Logo],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'chorder-tuner';
}
