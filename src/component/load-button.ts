import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconGuardPipe } from '../pipe/icon-guard.pipe';
import { LayoutLoader } from '../service/layout-loader';
import { ToolbarButton } from './toolbar-button';

@Component({
  selector: 'app-load-button',
  imports: [ToolbarButton, MatMenuModule, MatIconModule, IconGuardPipe],
  templateUrl: './load-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadButton {
  private readonly layoutLoader = inject(LayoutLoader);
  private readonly fileInput =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  public loadFromDevice() {
    this.layoutLoader.loadFromDevice();
  }

  public openFileSelectionDialog() {
    this.fileInput().nativeElement.click();
  }

  public onFileInputChange() {
    if (typeof FileReader === 'undefined') {
      return;
    }
    const fileInputElement = this.fileInput().nativeElement;
    if (
      fileInputElement.files === null ||
      fileInputElement.files.length === 0
    ) {
      return;
    }
    const file = fileInputElement.files[0];
    this.layoutLoader.loadFromFile(file);
  }

  public loadFromDefault(device: 'cc1' | 'm4g') {
    this.layoutLoader.loadFromDefault(device);
  }
}
