import { ToastOptions } from 'ng2-toastr';

export class ToastOptionsCustom extends ToastOptions {
  animate = 'flyRight';
  newestOnTop = false;  
  maxShown = 2;
  toastLife = 2000;
}