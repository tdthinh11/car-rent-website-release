import MockAdapter from 'axios-mock-adapter';

import axiosInstance from './axios';

const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

export default mock;
