import { CheckoutActionType, CheckoutState, PayloadAction, ReducerHandler } from "./checkout.type";

// Reducer
const reducerHandlers: ReducerHandler = {
  [CheckoutActionType.SET_AREA]: (state, action) => ({
    ...state,
    area: action.payload.area,
  }),

  [CheckoutActionType.SET_FETCHING]: (state, action) => ({
    ...state,
    isFetching: action.payload.isFetching,
  }),
};

export function reducer(state: CheckoutState, action: PayloadAction<CheckoutState>) {
  if (!reducerHandlers[action.type]) return state;
  return reducerHandlers[action.type](state, action);
}

// Actions
export const setArea = (payload: Partial<CheckoutState>) => ({
  type: CheckoutActionType.SET_AREA,
  payload,
});

export const setFetching = (payload: Partial<CheckoutState>) => ({
  type: CheckoutActionType.SET_FETCHING,
  payload,
});
