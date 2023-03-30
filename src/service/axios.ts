import Axios from 'axios';

import { DOMAIN } from '@/utils/contain';

const axiosInstance = Axios.create({
  baseURL: DOMAIN,
});

export default axiosInstance;
