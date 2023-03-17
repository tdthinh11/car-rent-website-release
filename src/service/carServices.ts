import LgAllNewRush from '@/assets/images/Car/LgAllNewRush.png';
import LgAllNewTerios from '@/assets/images/Car/LgAllNewTerios.png';
import LgCRV from '@/assets/images/Car/LgCR-V.png';
import LgKoenigsegg from '@/assets/images/Car/LgKoenigsegg.png';
import LgMGZXExcite from '@/assets/images/Car/LgMGZXExcite.png';
import LgMGZXExclusice from '@/assets/images/Car/LgMGZXExclusice.png';
import LgMGZS from '@/assets/images/Car/LgNewMGZS-1.png';
import LgNewMGZS from '@/assets/images/Car/LgNewMGZS.png';
import LgRollsRuyce from '@/assets/images/Car/LgNissanGT-R-1.png';
import LgNissanGTR from '@/assets/images/Car/LgNissanGT-R.png';
import SmAllNewRush from '@/assets/images/Car/SmAllNewRush.png';
import SmCRV from '@/assets/images/Car/SmCRV.png';
import SmKoenigsegg from '@/assets/images/Car/SmKoenigsegg.png';
import { GET_POPULAR_CARS, GET_RECOMMEND_CARS } from '@/utils/contain';
import { getUrl } from '@/utils/helper';

import api from './axios';
import mock from './mock-adapter';

export type carType = {
  [key: string]: unknown;
  id: number;
  name: string;
  typeBusiness: 'popular' | 'recommend';
  type: 'Sport' | 'Sedan' | 'SUV' | 'Hatchback';
  imgSm?: string;
  imgLg?: string;
  gas: string;
  capacity: number;
  price: number;
  isLiked: boolean;
};

const listPopular: carType[] = [
  {
    typeBusiness: 'popular',
    id: 1,
    name: 'Koenigsegg',
    type: 'Sport',
    imgSm: SmKoenigsegg,
    imgLg: LgKoenigsegg,
    gas: '90',
    capacity: 2,
    price: 99,
    isLiked: false,
  },
  {
    typeBusiness: 'popular',
    id: 2,
    name: 'Nissan GT - R',
    type: 'Sport',
    imgSm: LgNissanGTR,
    imgLg: LgNissanGTR,
    gas: '80',
    capacity: 2,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'popular',
    id: 3,
    name: 'Rolls - Royce',
    type: 'Sedan',
    imgSm: LgRollsRuyce,
    imgLg: LgRollsRuyce,
    gas: '70',
    capacity: 4,
    price: 96,
    isLiked: true,
  },
  {
    typeBusiness: 'popular',
    id: 4,
    name: 'Nissan GT - R',
    type: 'Sport',
    imgSm: LgNissanGTR,
    imgLg: LgNissanGTR,
    gas: '80',
    capacity: 80,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'popular',
    id: 5,
    name: 'Rolls - Royce',
    type: 'Sedan',
    imgSm: LgRollsRuyce,
    imgLg: LgRollsRuyce,
    gas: '70',
    capacity: 4,
    price: 96,
    isLiked: true,
  },
  {
    typeBusiness: 'popular',
    id: 6,
    name: 'Koenigsegg',
    type: 'Sport',
    imgSm: SmKoenigsegg,
    imgLg: LgKoenigsegg,
    gas: '90',
    capacity: 2,
    price: 99,
    isLiked: false,
  },
];

const listRecommend: carType[] = [
  {
    typeBusiness: 'recommend',
    id: 1,
    name: 'All New Rush',
    type: 'Sport',
    imgSm: SmAllNewRush,
    imgLg: LgAllNewRush,
    gas: '70',
    capacity: 6,
    price: 72,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 2,
    name: 'CR - V',
    type: 'Sport',
    imgSm: SmCRV,
    imgLg: LgCRV,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: true,
  },
  {
    typeBusiness: 'recommend',
    id: 3,
    name: 'All New Terios',
    type: 'SUV',
    imgSm: SmKoenigsegg,
    imgLg: LgAllNewTerios,
    gas: '90',
    capacity: 6,
    price: 74,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 4,
    name: 'CR - V',
    type: 'Sport',
    imgSm: SmCRV,
    imgLg: LgCRV,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 5,
    name: 'MG ZX Exclusice',
    type: 'Hatchback',
    imgSm: SmAllNewRush,
    imgLg: LgMGZXExclusice,
    gas: '70',
    capacity: 4,
    price: 76,
    isLiked: true,
  },
  {
    typeBusiness: 'recommend',
    id: 6,
    name: 'New MG ZS',
    type: 'SUV',
    imgSm: SmKoenigsegg,
    imgLg: LgNewMGZS,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 7,
    name: 'MG ZX Excite',
    type: 'Hatchback',
    imgSm: SmAllNewRush,
    imgLg: LgCRV,
    gas: '90',
    capacity: 4,
    price: 74,
    isLiked: true,
  },
  {
    typeBusiness: 'recommend',
    id: 8,
    name: 'New MG ZS',
    type: 'SUV',
    imgSm: SmAllNewRush,
    imgLg: LgMGZS,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 9,
    name: 'New MG ZS',
    type: 'SUV',
    imgSm: SmKoenigsegg,
    imgLg: LgNewMGZS,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: false,
  },
  {
    typeBusiness: 'recommend',
    id: 10,
    name: 'MG ZX Excite',
    type: 'Hatchback',
    imgSm: SmAllNewRush,
    imgLg: LgCRV,
    gas: '90',
    capacity: 4,
    price: 74,
    isLiked: true,
  },
  {
    typeBusiness: 'recommend',
    id: 11,
    name: 'New MG ZS',
    type: 'SUV',
    imgSm: SmAllNewRush,
    imgLg: LgMGZXExcite,
    gas: '80',
    capacity: 6,
    price: 80,
    isLiked: false,
  },
];

mock.onGet(getUrl(GET_POPULAR_CARS)).reply(() => {
  // let typeBusiness = ''
  // const carId = config.url?.split('/')[config.url?.split('/')?.length - 1]

  // if (config.url?.includes(BUS_TYPE.POPULAR) || config.url?.includes(BUS_TYPE.RECOMMEND)) {
  //   typeBusiness = config.url?.includes(BUS_TYPE.POPULAR) ? BUS_TYPE.POPULAR : BUS_TYPE.RECOMMEND
  // }

  // const id: number | undefined = carId !== undefined ? parseInt(carId, 10) : carId
  return [200, listPopular];
});

mock.onGet(getUrl(GET_RECOMMEND_CARS)).reply(() => {
  return [200, listRecommend];
});

class CarServices {
  getPopularCars = () => api.get(GET_POPULAR_CARS);
  getRecommendCars = () => api.get(GET_RECOMMEND_CARS);
}

export const carServices = new CarServices();
