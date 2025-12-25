import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadButton } from './load-button';
import { Logo } from './logo';

@Component({
  selector: 'app-toolbar',
  imports: [Logo, LoadButton],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class Toolbar {}
