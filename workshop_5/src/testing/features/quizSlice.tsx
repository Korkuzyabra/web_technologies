import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
    lists: string[][]; // хранит перемещаемые элементы каждого списка ответов
}

const initialState: ListsState = {
    lists: [],
};

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<{index: number; items: string[]}>)=>{
            const { index, items } = action.payload;
            state.lists.splice(index, 0, items);
        },
        setDraggedItems: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
            const { index, items } = action.payload;
            if (index >= 0 && index < state.lists.length) {
                state.lists[index] = items; // обновляем конкретный список
            }
        },
    },
});

// Экспортируем действия и редьюсер
export const { addList, setDraggedItems } = listsSlice.actions;
export default listsSlice.reducer;