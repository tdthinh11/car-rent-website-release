import { notification } from 'antd';

export const Notification = (
  type: 'success' | 'warning' | 'info' | 'error',
  message: string,
  description = '',
  duration = 4.5,
) => {
  notification[type]({
    message: message,
    description: description,
    duration: duration,
  });
};
