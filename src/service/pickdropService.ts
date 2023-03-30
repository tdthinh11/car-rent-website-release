import { listLocation } from '@/assets/data/selection';
import { GET_LOCATION } from '@/utils/contain';
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
