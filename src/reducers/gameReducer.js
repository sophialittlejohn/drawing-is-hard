export const initialGameState = {
  task: null,
  round: null,
  score: null,
  inProgress: null,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      console.log("START_GAME");
      return { round: 1, score: 0, task: action.payload, inProgress: true };
    case "NEW_ROUND":
      console.log("NEW_ROUND");
      return { ...state, task: action.payload, round: state.round + 1 };
    case "WIN_ROUND":
      console.log("WIN_ROUND");
      return {
        ...state,
        score: state.score + 1,
        round: state.round + 1,
        task: action.payload,
      };
    case "GAME_OVER":
      console.log("GAME_OVER");
      return { ...state, inProgress: false, task: null };
    case "WIN_GAME":
      console.log("WIN_GAME");
      return { ...state, inProgress: false };
    default:
      throw new Error();
  }
};
