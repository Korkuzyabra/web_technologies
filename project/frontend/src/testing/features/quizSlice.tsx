import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
  results: { correct: number; total: number }[] | null;
}

const initialState: ListsState = {
  lists: [],
  results: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      state.lists[action.payload.index] = action.payload.items;
    },
    setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      state.lists[action.payload.index] = action.payload.items;
    },
    setAnswer: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      state.lists[action.payload.index] = action.payload.items;
    },
  },
});

export const { addList, setDraggedItems, setAnswer } = listsSlice.actions;
export default listsSlice.reducer;
