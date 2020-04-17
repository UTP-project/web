import { ArrayLngLat } from 'react-amap';
import { yPost } from '../common/service';

export interface FetchRouteData {
  locations?: ArrayLngLat[];
  dist_matrix: number[][];
  dur_matrix: number[][];
  day_limit_time?: number;
}

export interface FetchRouteReturn {
  status: 0 | 1;
  info: string;
  routes?: number[][];
}

export const fetchRoute = async (
  data: FetchRouteData
): Promise<FetchRouteReturn> => {
  const res = await yPost<FetchRouteReturn>('/api/core/route', {
    ...data,
  });
  return res;
};
