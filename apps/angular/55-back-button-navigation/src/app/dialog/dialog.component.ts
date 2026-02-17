import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dialog',
  templateUrl: './dialog.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly dialogData = inject(MAT_DIALOG_DATA);

  onReject() {
    this.dialogRef.close(false);
  }

  async onConfirm(): Promise<void> {
    await this.dialogData.onConfirm?.();
    this.dialogRef.close(true);
  }
}
