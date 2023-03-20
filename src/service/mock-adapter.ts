import MockAdapter from 'axios-mock-adapter';

import axiosInstance from './axios';

const mock = new MockAdapter(axiosInstance, { delayResponse: 300 });

export default mock;
