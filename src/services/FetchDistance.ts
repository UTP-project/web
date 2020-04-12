import { yGet } from '../common/service';
import { AMAP_KEY_SERVICE } from '../common/const';

export interface FetchDistanceParams {
  key?: string;
  origins: string;
  destination: string;
  type?: 0 | 1 | 3;
}

export interface Result {
  origin_id: string;
  dest_id: string;
  distance: string;
  duration: string;
  info?: string;
  code?: string;
}

export interface FetchDistanceReturn {
  status: 0 | 1;
  info: string;
  results: Result[];
}
export const fetchDistance = async (
  params: FetchDistanceParams
): Promise<FetchDistanceReturn> => {
  const data = await yGet<FetchDistanceReturn>(
    'https://restapi.amap.com/v3/distance',
    {
      key: AMAP_KEY_SERVICE,
      ...params,
    }
  );
  return data;
};
