import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { DialogPresets } from './dialog/dialog.models';
import { DialogService } from './dialog/dialog.service';

export const canDeactivateGuard: CanDeactivateFn<any> = async (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  const dialogService = inject(DialogService);
  const router = inject(Router);

  if (!dialogService.isAnyDialogOpen()) {
    return true;
  } else if (dialogService.isLeavePageDialogOpen()) {
    return false;
  } else {
    dialogService.open({
      ...DialogPresets.leavePage(),
      onConfirm: async () => {
        dialogService.closeAll();
        await router.navigate(['/home']);
      },
    });
  }

  return false;
};
