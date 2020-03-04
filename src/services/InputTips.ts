import { yGet } from '../common/service';
import { AMAP_KEY_SERVICE } from '../common/const';

export interface InputTipsParams {
  key?: string;
  keywords: string;
  type?: string;
  location?: string;
  city?: string;
  citylimit?: boolean;
  datatype?: string;
}

export interface Tip {
  id: string;
  name: string;
  district: string;
  adcode: string;
  location: string;
  address: string;
}

export interface InputTipsReturn {
  status: 0 | 1;
  info: string;
  count: number;
  tips: Tip[];
}

export const getInputTips = async (
  params: InputTipsParams
): Promise<InputTipsReturn> => {
  const data = await yGet<InputTipsReturn>(
    'https://restapi.amap.com/v3/assistant/inputtips',
    {
      ...params,
      key: AMAP_KEY_SERVICE,
    }
  );
  return data;
};
