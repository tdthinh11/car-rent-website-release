import { listLocation } from '@/assets/data/selection';
import { GET_LIST_PICK_UP } from '@/utils/contain';
import { getUrl } from '@/utils/helper';

import api from './axios';
import mock from './mock-adapter';

mock.onGet(getUrl(GET_LIST_PICK_UP)).reply(() => {
  return [200, [...listLocation]];
});

class PickDropService {
  getLocationList = () => api.get(GET_LIST_PICK_UP);
}

export const pickDropService = new PickDropService();
