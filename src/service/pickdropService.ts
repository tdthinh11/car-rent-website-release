import { listLocation } from '@/model/selection';
import { GET_LOCATION } from '@/utils/constant';
import { getUrl } from '@/utils/helper';

import api from './axios';
import mock from './mock-adapter';

mock.onGet(getUrl(GET_LOCATION)).reply(() => {
  return [200, [...listLocation]];
});

class PickDropService {
  getLocationList = () => api.get(GET_LOCATION);
}

export const pickDropService = new PickDropService();
