let database = {

  state: {
    win: false, //player id aka "player_1" ou "player_2"
  },

  player_1: {
    position: {
      x: 0,
      y: 0,
    },
  },
  player_2: {
    position: {
      x: 0,
      y: 0,
    },
  },

  target_1: {
    position: {
      x: 0,
      y: 0,
    },
  },

  target_2: {
    position: {
      x: 0,
      y: 0,
    },
  },

  grid: [
    {angle: 0},
    {angle: 0},
    {angle: 90},
    {angle: 0},
    {angle: 0},
    {angle: 0},
    {angle: 0},
    {angle: 0},
    {angle: 180},
    {angle: 0},
    {angle: 0},
  ]
};
