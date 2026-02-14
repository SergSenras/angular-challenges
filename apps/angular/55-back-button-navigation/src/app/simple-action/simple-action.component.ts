import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DialogPresets } from '../dialog/dialog.models';
import { DialogService } from '../dialog/dialog.service';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent {
  readonly dialogService = inject(DialogService);

  openDialog(): void {
    const confirmed = this.dialogService.open(DialogPresets.deleteImage());
    if (!confirmed) return;
    this.dialogService.onDelete();
  }
}
