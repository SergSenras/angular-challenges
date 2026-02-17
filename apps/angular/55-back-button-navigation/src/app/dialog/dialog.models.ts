export enum DialogType {
  LEAVE,
  DELETE,
  DELETE_SENSITIVE,
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
  type: DialogType;
  title: string;
  content: string;
  priority: DialogPriority;
  onConfirm?: () => void | Promise<void>;
  onReject?: () => void;
}

export const DialogPresets = {
  deleteImage(): DialogConfig {
    return {
      type: DialogType.DELETE,
      title: 'Delete',
      content: 'Are you sure you want to delete an image?',
      priority: DialogPriority.MEDIUM,
    };
  },
  deleteSensitive(): DialogConfig {
    return {
      type: DialogType.DELETE_SENSITIVE,
      title: 'Delete',
      content: 'Are you sure you want to delete this sensitive content?',
      priority: DialogPriority.MEDIUM,
    };
  },
  leavePage(): DialogConfig {
    return {
      type: DialogType.LEAVE,
      title: 'Leave page',
      content: 'Are you sure you want to leave current page?',
      priority: DialogPriority.HIGH,
    };
  },
};
