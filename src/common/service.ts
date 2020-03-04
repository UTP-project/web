export interface HttpProps {
  url: string;
  options: RequestInit;
  params?: object;
  data?: object;
  method?: string;
}
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const statusHandler = (res: Response): Promise<Response> => {
  if (res.ok) {
    return Promise.resolve(res);
  }
  return Promise.reject(new Error(res.statusText));
};

const json = <T>(res: Response): Promise<T> => {
  return res.json();
};

const http = <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const headers = options.headers || {};
  return fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...headers,
    },
  })
    .then(statusHandler)
    .then(json)
    .then((data: T) => {
      // Data transformation such as unwrapping a top level data attribute.
      return data;
    })
    .catch(err => {
      throw err;
    });
};

const wrapperHttp = <T>({
  url,
  params = {},
  data,
  options,
  method,
}: HttpProps): Promise<T> => {
  const paramsString = new URLSearchParams({ ...params }).toString();
  const finalUrl = paramsString ? `${url}?${paramsString}` : url;
  const finalOptions = {
    ...options,
    method,
  };
  if (data) {
    finalOptions.body = JSON.stringify(data);
  }
  return http(finalUrl, finalOptions);
};

export const yGet = <T>(
  url: string,
  params: object,
  options: object = {}
): Promise<T> => wrapperHttp({ url, params, options });

export const yPost = <T>(
  url: string,
  data: object,
  options: object = {}
): Promise<T> => wrapperHttp({ url, data, options, method: 'POST' });

export const yPut = <T>(
  url: string,
  data: object,
  options: object = {}
): Promise<T> => wrapperHttp({ url, data, options, method: 'PUT' });

export const yDelete = <T>(url: string, options: object = {}): Promise<T> =>
  wrapperHttp({ url, options, method: 'DELETE' });
