import { yGet } from '../common/service';
import { AMAP_KEY_SERVICE } from '../common/const';

export interface FetchViewpointParams {
  key?: string;
  keywords?: string;
  types?: string;
  city: string;
  citylimit?: boolean;
  children?: number;
  page?: number;
  offset?: number;
  extensions?: 'base' | 'all';
}

export interface BizExt {
  rating: string;
  cost: string | [];
}

export interface Photo {
  title: string;
  url: string;
}

export interface Poi {
  id: string;
  parent?: string;
  name: string;
  type: string;
  typecode: string;
  biz_type: string;
  address: string;
  location: string;
  entr_location: string;
  exit_location: string;
  alias: string;
  business_area: string;
  biz_ext: BizExt;
  photos: Photo[];
}

export interface FetchViewpointReturn {
  status: 0 | 1;
  info: string;
  count: number;
  pois: Poi[];
}
export const fetchViewpoint = async (
  params: FetchViewpointParams
): Promise<FetchViewpointReturn> => {
  const data = await yGet<FetchViewpointReturn>(
    'https://restapi.amap.com/v3/place/text',
    {
      key: AMAP_KEY_SERVICE,
      keywords: '旅游',
      types: '旅游',
      citylimit: true,
      extensions: 'all',
      ...params,
    }
  );
  return data;
};
