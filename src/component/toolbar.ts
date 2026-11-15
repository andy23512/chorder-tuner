import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { LoadButton } from './load-button';
import { Logo } from './logo';

@Component({
  selector: 'app-toolbar',
  imports: [Logo, LoadButton, MatIconButton, MatIcon, MatTooltip],
  templateUrl: './toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class Toolbar {}
