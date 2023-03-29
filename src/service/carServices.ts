import { AxiosRequestConfig } from 'axios';

import { carType, listAllCar } from '@/model/cars';
import { listLocation } from '@/model/selection';
import { CATEGORY, CapacityCategory, GET_LOCATION, SEARCH, TypeCategory } from '@/utils/constant';
import { getUrl } from '@/utils/helper';

import api from './axios';
import mock from './mock-adapter';

export type categoryType = {
  name: string;
  value: number;
  isSelected: boolean;
  section: 'TYPE' | 'CAPACITY' | 'PRICE';
};

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

mock.onGet(getUrl(CATEGORY)).reply(() => {
  const capacityType: categoryType[] = [];
  const listType: categoryType[] = [];
  Object.keys(TypeCategory).forEach((item) => {
    listType.push({
      name: TypeCategory[item as keyof typeof TypeCategory],
      value: listAllCar.filter((car) => car.type.toLowerCase() === item.toLowerCase()).length,
      isSelected: false,
      section: 'TYPE',
    });
  });

  Object.keys(CapacityCategory).forEach((item) => {
    capacityType.push({
      name: item,
      value: listAllCar.filter(
        (car) =>
          car.capacity.toString() === CapacityCategory[item as keyof typeof CapacityCategory],
      ).length,
      isSelected: false,
      section: 'CAPACITY',
    });
  });

  return [200, [...listType, ...capacityType]];
});

class CarServices {
  getSearchCar = (search = '') => api.get(`${SEARCH}?search=${search}`);
  getLocationList = () => api.get(GET_LOCATION);
  getCategory = () => api.get(`${CATEGORY}`);
}

export const carServices = new CarServices();
