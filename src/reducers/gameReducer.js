export const initialGameState = {
  task: null,
  round: null,
  score: null,
  started: false,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return { round: 1, score: 0, task: action.payload, started: true };
    case "NEW_ROUND":
      return { ...state, task: action.payload, round: state.round + 1 };
    case "WIN_ROUND":
      return {
        ...state,
        score: state.score + 1,
        round: state.round + 1,
        task: action.payload,
      };
    case "GAME_OVER":
      return { ...state, started: false, task: null };
    default:
      throw new Error();
  }
};
