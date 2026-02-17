import { inject, Injectable, signal } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { DialogConfig, DialogType } from './dialog.models';

interface StackItem {
  data: DialogConfig;
  ref?: MatDialogRef<DialogComponent>;
  resolve?: (value: boolean) => void;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);
  private readonly stack = signal<StackItem[]>([]);

  isAnyDialogOpen(): boolean {
    return this.stack().length > 0;
  }
  isLeavePageDialogOpen(): boolean {
    if (!this.isAnyDialogOpen()) return false;

    const arr = this.stack();
    const current = arr[arr.length - 1];
    return current.data.type === DialogType.LEAVE;
  }

  open(data: DialogConfig): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const current = this.getTop();

      if (current && current.data.priority < data.priority) {
        current.ref?.close();
      }

      const item: StackItem = { data, resolve };

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.closeOnNavigation = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '250px';
      dialogConfig.data = data;
      const ref = this.dialog.open(DialogComponent, dialogConfig);

      item.ref = ref;

      this.stack.update((s) => [...s, item]);

      ref.afterClosed().subscribe((result) => {
        resolve(!!result);
        this.remove(ref);
        this.restorePrevious();
      });
    });
  }

  private getTop(): StackItem | undefined {
    const s = this.stack();
    return s[s.length - 1];
  }

  private remove(ref: MatDialogRef<DialogComponent>) {
    this.stack.update((s) => s.filter((item) => item.ref !== ref));
  }

  private restorePrevious(): void {
    const previous = this.getTop();
    if (!previous || previous.ref) return;

    const ref = this.dialog.open(DialogComponent, {
      data: previous.data,
      disableClose: true,
    });

    previous.ref = ref;

    ref.afterClosed().subscribe((result) => {
      previous.resolve?.(!!result);
      this.remove(ref);
      this.restorePrevious();
    });
  }

  closeAll() {
    this.dialog.closeAll();
    this.stack.set([]);
  }

  onDelete() {
    console.log('onDelete - ');
  }
}
