export interface GenericModalData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
}
