import axios from 'axios';

const uuid = 'a665534e-e4f9-4762-a299-1465f799f527';

export const apiJsonPlaceholder = axios.create({
  timeout: 10000,
  baseURL: 'https://jsonplaceholder.typicode.com/',
});
export const apiProvadev = axios.create({
  timeout: 10000,
  baseURL: 'https://provadev.xlab.digital/api/v1/',
  params: {
    uuid,
  },
});
