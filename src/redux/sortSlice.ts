import { createSlice} from '@reduxjs/toolkit';
import {SortBy} from "../modules/sortBy";
import {initItemsPerPage} from "../utils/variables";

interface InitialStateParams {
    sortBy: SortBy,
    searchValue: string,
    itemsPerPage: number
}

const initialState: InitialStateParams = {
    sortBy: 0,
    searchValue: "",
    itemsPerPage: initItemsPerPage
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        changeSortBy(state, {payload}) {
            state.sortBy = payload;
        },
        resetSortBy(state) {
            state.sortBy = 0;
        },
        changeSearchValue(state, {payload}) {
            state.searchValue = payload;
        },
        resetSearchValue(state) {
            state.searchValue = "";
        },
        changeItemsPerPage(state, {payload}) {
            state.itemsPerPage = payload;
        },
        resetItemsPerPage(state) {
            state.itemsPerPage = initItemsPerPage;
        }

    }
});

export const {changeSortBy, resetSortBy, changeSearchValue, resetSearchValue, resetItemsPerPage, changeItemsPerPage} = sortSlice.actions;
export default sortSlice.reducer;