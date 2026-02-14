import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogPresets } from '../dialog/dialog.models';
import { DialogService } from '../dialog/dialog.service';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent {
  //readonly #dialog = inject(MatDialog);
  readonly dialogService = inject(DialogService);

  openDialog(): void {
    const confirmed = this.dialogService.open(DialogPresets.deleteSensitive());
    if (!confirmed) return;
    this.dialogService.onDelete();
  }
}
