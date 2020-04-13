/**
 * [1, 2, 3, 4, 5, 6] can be decoded to
 * [
 *   [0, 1, 2, 3],
 *   [1, 0, 4, 5],
 *   [2, 4, 0, 6],
 *   [3, 5, 6, 0],
 * ]
 */
export const list2symMatrix = <T>(len: number, list: T[]): T[][] => {
  const symMatrix = [];
  let l = 0;
  // decode to upper triangular matrix
  for (let i = 0; i < len; i += 1) {
    const r = l + len - 1 - i;
    symMatrix.push([...Array(i + 1).fill(0), ...list.slice(l, r)]);
    l = r;
  }
  // decode to symmetric matrix
  for (let i = 1; i < len; i += 1) {
    for (let j = 0; j < i; j += 1) {
      symMatrix[i][j] = symMatrix[j][i];
    }
  }
  return symMatrix;
};

export const sleep = (timeout: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export const promiseWait = async <T1, T2>(
  list: T1[],
  func: (params: T1) => Promise<T2>,
  limit: number,
  timeout: number
): Promise<T2[]> => {
  const tail = list.splice(limit);
  const head = list.map(el => func(el));
  let res = await Promise.all(head);
  if (tail.length) {
    await sleep(timeout);
    const nextRes = await promiseWait(tail, func, limit, timeout);
    res = [...res, ...nextRes];
  }
  return res;
};
