// linear congruential generator implementation
// also has other useful functions

const a = 7**5;
const m = 2**31 - 1;
// c = 0

const lcg = (x) => (a * x) % m;

const toFloat = (x) => (x - 1) / (m - 1);

const bound = (x) => {
  x = x % m;
  if (x <= 0) {
    x += m - 1;
  }
  return x;
};

export { lcg, toFloat, bound };