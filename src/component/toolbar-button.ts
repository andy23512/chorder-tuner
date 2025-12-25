import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Icon } from '../model/icon.model';

@Component({
  selector: 'app-toolbar-button',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './toolbar-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButton {
  public tooltip = input.required<string>();
  public icon = input.required<Icon>();
  public disabled = input<boolean>(false);
  public menu = input<MatMenu | null>(null);
  @Output() public buttonClick = new EventEmitter();
  public menuTrigger = viewChild<MatMenuTrigger>('menuTrigger');

  public onButtonClick() {
    this.buttonClick.emit();
    const menu = this.menu();
    const menuTrigger = this.menuTrigger();
    if (menu && menuTrigger) {
      menuTrigger.openMenu();
    }
  }
}
