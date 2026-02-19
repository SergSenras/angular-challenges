import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let fixture: ComponentFixture<DialogComponent>;
  let component: DialogComponent;
  const dialogRefMock = {
    close: jest.fn(),
  };
  const mockData = {
    title: 'Test title',
    content: 'Test content',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and content from data', () => {
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('[mat-dialog-title]');
    const contentElement: HTMLElement = fixture.nativeElement.querySelector(
      '.mat-mdc-dialog-content',
    );
    expect(titleElement?.textContent.trim()).toBe(mockData.title);
    expect(contentElement?.textContent.trim()).toBe(mockData.content);
  });

  it('should close the dialog when close button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const rejectButton = buttons[0];
    rejectButton.triggerEventHandler('click');
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
