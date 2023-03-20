import { AxiosRequestConfig } from 'axios';

import { carType, listAllCar } from '@/assets/data/cars';
import { listLocation } from '@/assets/data/selection';
import { GET_LOCATION, GET_POPULAR_CARS, GET_RECOMMEND_CARS, SEARCH } from '@/utils/contain';
import { getUrl } from '@/utils/helper';

import api from './axios';
import mock from './mock-adapter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mock.onGet(getUrl(GET_POPULAR_CARS)).reply((config: AxiosRequestConfig<any>) => {
  const id = config?.url?.split('/')[config?.url?.split('/')?.length - 1];
  if (!id) {
    const listPopular = listAllCar.filter((car: carType) => car.typeBusiness === 'popular');
    return [200, listPopular];
  } else {
    return [200, listAllCar.find((car: carType) => car.id === id)];
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mock.onGet(getUrl(GET_RECOMMEND_CARS)).reply((config: AxiosRequestConfig<any> | undefined) => {
  const id = config?.url?.split('/')[config?.url?.split('/')?.length - 1];
  if (!id) {
    const listPopular = listAllCar.filter((car: carType) => car.typeBusiness === 'recommend');
    return [200, listPopular];
  } else {
    return [200, listAllCar.find((car: carType) => car.id === id)];
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
mock.onGet(getUrl(SEARCH)).reply((config: AxiosRequestConfig<any> | undefined) => {
  const listKeyToSearch = ['name', 'type', 'gas', 'capacity', 'price'];
  const query = config?.url?.split('?search=')[config?.url?.split('?search=')?.length - 1].trim();
  const searchKey: string = query ? query.toLowerCase() : '';

  const matchByKeyName = (item: carType, listKeyToSearch: string[], searchKey: string) => {
    return listKeyToSearch.find((key: string) => {
      return (item[key] as string).toString().toLowerCase().indexOf(searchKey) >= 0;
    });
  };

  const data = listAllCar.filter((item: carType) => {
    if (matchByKeyName(item, listKeyToSearch, searchKey)) {
      return item;
    }
  });

  return [200, data];
});

mock.onGet(getUrl(GET_LOCATION)).reply(() => {
  return [200, [...listLocation]];
});

class CarServices {
  getPopularCars = (id = '') => api.get(`${GET_POPULAR_CARS}/${id}`);
  getRecommendCars = (id = '') => api.get(`${GET_RECOMMEND_CARS}/${id}`);
  getSearchCar = (search = '') => api.get(`${SEARCH}?search=${search}`);
  getLocationList = () => api.get(GET_LOCATION);
}

export const carServices = new CarServices();
