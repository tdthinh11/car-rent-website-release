import Axios from 'axios';

import { DOMAIN } from '@/utils/constant';

const axiosInstance = Axios.create({
  baseURL: DOMAIN,
});

export default axiosInstance;
