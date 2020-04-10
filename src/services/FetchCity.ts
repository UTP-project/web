import { yGet } from '../common/service';
import { AMAP_KEY_SERVICE } from '../common/const';

export interface FetchCityParams {
  key?: string;
  keywords: string;
  page?: number;
  offset?: number;
  subdistrict?: number;
}

export interface District {
  citycode: string;
  adcode: string;
  name: string;
  center: string;
  level: string;
  district: District;
}

export interface FetchCityReturn {
  status: 0 | 1;
  info: string;
  infocode: number;
  count: number;
  districts: District[];
}
export const fetchCity = async (
  params: FetchCityParams
): Promise<FetchCityReturn> => {
  const data = await yGet<FetchCityReturn>(
    'https://restapi.amap.com/v3/config/district',
    {
      key: AMAP_KEY_SERVICE,
      subdistrict: 0,
      ...params,
    }
  );
  return data;
};
