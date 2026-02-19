import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { DialogPresets } from './dialog.models';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let matDialog: MatDialog;

  let afterClosed$: Subject<boolean>;
  let dialogRefMock = {
    close: jest.fn(),
    afterClosed: jest.fn(),
  };
  let matDialogMock = {
    open: jest.fn(),
    closeAll: jest.fn(),
  };

  beforeEach(() => {
    afterClosed$ = new Subject<boolean>();
    dialogRefMock = {
      close: jest.fn(),
      afterClosed: jest.fn().mockReturnValue(afterClosed$.asObservable()),
    };
    matDialogMock = {
      open: jest.fn().mockReturnValue(dialogRefMock),
      closeAll: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useValue: matDialogMock },
      ],
    });

    matDialog = TestBed.inject(MatDialog);
    service = TestBed.inject(DialogService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    afterClosed$.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check for open dialogs', () => {
    expect(service.isAnyDialogOpen()).toBeFalsy();
  });
  it('should check for leave page dialog', () => {
    expect(service.isLeavePageDialogOpen()).toBeFalsy();
  });
  it('should call MatDialog.open', () => {
    const data = DialogPresets.deleteSensitive();
    service.open(data);
    expect(matDialog.open).toHaveBeenCalledWith(
      DialogComponent,
      expect.objectContaining({ data }),
    );
  });
  it('should mark dialog as open after calling open()', () => {
    expect(service.isAnyDialogOpen()).toBeFalsy();
    service.open(DialogPresets.deleteSensitive());
    expect(service.isAnyDialogOpen()).toBeTruthy();
  });
  it('should resolve the Promise with true after dialog is closed', async () => {
    expect(service.isAnyDialogOpen()).toBe(false);
    const promise = service.open(DialogPresets.deleteSensitive());
    expect(service.isAnyDialogOpen()).toBe(true);
    afterClosed$.next(true);
    afterClosed$.complete();
    const result = await promise;
    expect(result).toBe(true);
    expect(service.isAnyDialogOpen()).toBe(false);
  });
  it('should add new element to stack when open() is called', () => {
    expect(service.isAnyDialogOpen()).toBe(false);
    service.open(DialogPresets.deleteSensitive());
    expect(service.isAnyDialogOpen()).toBe(true);
  });
  it('should close the previous dialog if new dialog has higher priority', async () => {
    const dialogRefs: any[] = [];
    matDialogMock.open.mockImplementation((component, config) => {
      const dialogRef = {
        close: jest.fn(),
        afterClosed: jest
          .fn()
          .mockReturnValue(new Subject<boolean>().asObservable()),
      };
      dialogRefs.push(dialogRef);
      return dialogRef;
    });
    const firstDialog = DialogPresets.deleteSensitive();
    const secondDialog = DialogPresets.leavePage();

    expect(service.isAnyDialogOpen()).toBe(false);
    service.open(firstDialog);
    expect(service.isAnyDialogOpen()).toBe(true);
    expect(dialogRefs.length).toBe(1);
    service.open(secondDialog);
    expect(dialogRefs.length).toBe(2);
    expect(matDialog.open).toHaveBeenCalledWith(
      DialogComponent,
      expect.objectContaining({ data: secondDialog }),
    );
  });
  it('should display the previous dialog if new dialog has lower priority', () => {
    const dialogRefs: any[] = [];
    matDialogMock.open.mockImplementation((component, config) => {
      const dialogRef = {
        close: jest.fn(),
        afterClosed: jest
          .fn()
          .mockReturnValue(new Subject<boolean>().asObservable()),
      };
      dialogRefs.push(dialogRef);
      return dialogRef;
    });
    const firstDialog = DialogPresets.leavePage();
    const secondDialog = DialogPresets.deleteSensitive();

    expect(service.isAnyDialogOpen()).toBe(false);
    service.open(firstDialog);
    expect(service.isAnyDialogOpen()).toBe(true);
    expect(dialogRefs.length).toBe(1);
    service.open(secondDialog);
    expect(dialogRefs.length).toBe(2);
    expect(matDialog.open).toHaveBeenCalledWith(
      DialogComponent,
      expect.objectContaining({ data: firstDialog }),
    );
  });
  it('should display previous dialog after closing dialog with higher priority', () => {
    const dialogRefs: any[] = [];
    const afterClosedSubjects: Subject<boolean>[] = [];
    matDialogMock.open.mockImplementation((component, config) => {
      const afterClosed$ = new Subject<boolean>();
      afterClosedSubjects.push(afterClosed$);
      const dialogRef = {
        close: jest.fn(),
        afterClosed: jest.fn().mockReturnValue(afterClosed$.asObservable()),
      };
      dialogRefs.push(dialogRef);
      return dialogRef;
    });
    const firstDialog = DialogPresets.deleteSensitive(); // Lower priority
    const secondDialog = DialogPresets.leavePage(); // Higher priority

    expect(service.isAnyDialogOpen()).toBe(false);
    expect(service.isAnyDialogOpen()).toBe(false);
    service.open(firstDialog);
    expect(service.isAnyDialogOpen()).toBe(true);
    expect(dialogRefs.length).toBe(1);
    service.open(secondDialog);
    expect(dialogRefs.length).toBe(2);
    afterClosedSubjects[1].next(true);
    afterClosedSubjects[1].complete();
    expect(matDialog.open).toHaveBeenCalledWith(
      DialogComponent,
      expect.objectContaining({ data: firstDialog }),
    );
  });
  it('should close all dialogs when closeAll() is called', () => {
    service.open(DialogPresets.deleteSensitive());
    service.open(DialogPresets.leavePage());
    expect(service.isAnyDialogOpen()).toBe(true);
    service.closeAll();
    expect(matDialog.closeAll).toHaveBeenCalled();
    expect(service.isAnyDialogOpen()).toBe(false);
  });
});
