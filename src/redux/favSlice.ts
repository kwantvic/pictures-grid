import { createSlice} from '@reduxjs/toolkit';

interface InitialStateParams {
    arrIdFav: number[]
}

const initialState: InitialStateParams = {
    arrIdFav: []
}

const favSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addLocalFav(state, action) {
            state.arrIdFav = [...state.arrIdFav, ...action.payload];
        },
        addFav(state, action) {
            state.arrIdFav.push(action.payload);
        },
        delFav(state, action) {
            state.arrIdFav = state.arrIdFav.filter(function (n) {return n !== action.payload});
        }
    }
});

export const {addLocalFav, addFav, delFav} = favSlice.actions;
export default favSlice.reducer;