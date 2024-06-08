import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastOptions {
  position?: 'top-center';
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined; // Because we're not using progress
  theme?: 'light' | 'dark';
  onClose?: () => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastCallback = (type: ToastType) => void; 

const showToast = (
  type: ToastType,
  message: string,
  callback?: ToastCallback, 
  options?: ToastOptions
) => {
  toast[type](message, {
    position: 'top-center',
    ...options, 
    onClose: () => {
      if (callback) {
        callback(type); 
      }
    },
  });
};

export default showToast;
