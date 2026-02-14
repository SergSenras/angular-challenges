export enum DialogType {
  LEAVE,
  DELETE,
}

export enum DialogPriority {
  HIGH,
  MEDIUM,
  LOW,
}

export interface DialogAction<T = any> {
  label: string;
  value: T;
}

export interface DialogConfig<T = any> {
  title: string;
  content: string;
  priority: DialogPriority;
}

export const DialogPresets = {
  deleteImage(): DialogConfig {
    return {
      title: 'Delete',
      content: 'Are you sure you want to delete an image?',
      priority: DialogPriority.MEDIUM,
    };
  },
  deleteSensitive(): DialogConfig {
    return {
      title: 'Delete',
      content: 'Are you sure you want to delete this sensitive content?',
      priority: DialogPriority.MEDIUM,
    };
  },
  leavePage(): DialogConfig {
    return {
      title: 'Leave page',
      content: 'Are you sure you want to leave current page?',
      priority: DialogPriority.HIGH,
    };
  },
};
