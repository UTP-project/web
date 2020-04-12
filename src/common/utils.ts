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
