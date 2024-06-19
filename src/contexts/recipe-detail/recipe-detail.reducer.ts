import { PayloadAction, RecipeDetailActionType, RecipeDetailState, ReducerHandler } from "./recipe-detail.type";

// Reducer
const reducerHandlers: ReducerHandler = {
  SET_RECIPE: (state: RecipeDetailState, action: PayloadAction<RecipeDetailState>): RecipeDetailState => {
    const { recipe } = action.payload;

    return {
      ...state,
      recipe,
    };
  },
};

export function reducer(state: RecipeDetailState, action: PayloadAction<RecipeDetailState>) {
  if (!reducerHandlers[action.type]) return state;
  return reducerHandlers[action.type](state, action);
}

// Actions
export function setRecipe(payload: RecipeDetailState): PayloadAction<RecipeDetailState> {
  return {
    type: RecipeDetailActionType.SET_RECIPE,
    payload,
  };
}
