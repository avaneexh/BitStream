import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, onClose, message, severity = 'success' }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} variant="filled">
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
