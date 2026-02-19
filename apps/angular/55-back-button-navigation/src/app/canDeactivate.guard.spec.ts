import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { canDeactivateGuard } from './canDeactivate.guard';
import { DialogService } from './dialog/dialog.service';

describe('CanDeactivateGuard', () => {
  const dialogServiceSpy = {
    isAnyDialogOpen: jest.fn(),
    isLeavePageDialogOpen: jest.fn(),
    open: jest.fn(),
    closeAll: jest.fn(),
  };
  const routerSpy = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    jest.clearAllMocks();
  });

  it('should check if there are open dialogs', async () => {
    dialogServiceSpy.isAnyDialogOpen.mockReturnValue(false);
    const result = await TestBed.runInInjectionContext(() =>
      canDeactivateGuard({} as any, {} as any, {} as any, {} as any),
    );
    expect(dialogServiceSpy.isAnyDialogOpen).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.open).not.toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('should check if there is open LeavePage dialog', async () => {
    dialogServiceSpy.isAnyDialogOpen.mockReturnValue(true);
    dialogServiceSpy.isLeavePageDialogOpen.mockReturnValue(true);
    const result = await TestBed.runInInjectionContext(() =>
      canDeactivateGuard({} as any, {} as any, {} as any, {} as any),
    );
    expect(dialogServiceSpy.isAnyDialogOpen).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.isLeavePageDialogOpen).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.open).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
  it('should open a new dialog if there are open dialogs but non of them is LeavePage dialog', async () => {
    dialogServiceSpy.isAnyDialogOpen.mockReturnValue(true);
    dialogServiceSpy.isLeavePageDialogOpen.mockReturnValue(false);
    dialogServiceSpy.open.mockImplementation(({ onConfirm }) => {
      onConfirm();
      return Promise.resolve(true);
    });
    const result = await TestBed.runInInjectionContext(() =>
      canDeactivateGuard({} as any, {} as any, {} as any, {} as any),
    );
    expect(dialogServiceSpy.isAnyDialogOpen).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.isLeavePageDialogOpen).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.open).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});
