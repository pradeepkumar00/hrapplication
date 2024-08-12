export const ADS_CONTEXT = {
    BANNER: {
      type: 'banner',
      adId: '35wlqen1',
    },
    BILLBOARD: {
      type: 'billboard',
      adId: 'u13fy64n',
    },
    VIDEO: {
        type: 'video',
        adId: '2g9fi81e',
      },
  };

export const gameLevel={
  easy: {tables: [0,0,1,0,1,1,2], gap: [10,30]},
  meduimTransition: {tables: [1,2,0,1,2,0,2], gap: [20,40]},
  medium:  {tables : [2,1,2,0,2,1,1], gap: [10,50]},
  hardTransition: {tables :[1,2,1,0,2,0,2], gap: [35,65]},
  hard: {tables :[2,1,2,1,2,0,2], gap: [10,80]}
}