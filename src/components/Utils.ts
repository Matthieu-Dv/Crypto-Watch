export const isStableCoin = (coin: string): boolean => {
  let stables: string[] = [
    'usdt',
    'usdc',
    'busd',
    'dai',
    'ust',
    'mim',
    'tusd',
    'usdp',
    'usdn',
    'fei',
    'tribe',
    'gusd',
    'frax',
    'lusd',
    'husd',
    'ousd',
    'xsgd',
    'usdx',
    'eurs',
    'cusdc',
    'cdai',
    'usdd',
    'ibeur',
    'eurt',
    'flexusd',
    'alusd',
    'susd',
  ];

  // Renvoie 'false' si le coin est une stablecoin, 'true' sinon
  return !stables.includes(coin);
};
