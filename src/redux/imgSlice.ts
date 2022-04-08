import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {imgApi} from "../api";
import {LoadingStatus} from "../modules/loadingStatus";

export interface ItemImg {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

interface InitialStateParams {
    status: LoadingStatus,
    itemsImg: ItemImg[],
    errorDescription: string
}

export const fetchAllImg = createAsyncThunk(
    "itemsCards/imagesListLoading",
    async () => (
        await imgApi.getItemsImg()
            .then((resp) => {
                return resp;
            })
    )
);

const initialState: InitialStateParams = {
    status: LoadingStatus.idle,
    itemsImg: [],
    errorDescription: ""
}

const imgSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        resetError(state, {payload}) {
            state.errorDescription = payload
        }
    },
    extraReducers: {
        [fetchAllImg.pending.type]: (state) => {
            state.status = LoadingStatus.loading;
        },
        [fetchAllImg.fulfilled.type]: (state, {payload}) => {
            state.itemsImg = payload;
            state.status = LoadingStatus.idle;
        },
        [fetchAllImg.rejected.type]: (state, action) => {
            state.errorDescription = action.error.message ? action.error.message : "Error loading data.";
            state.status = LoadingStatus.loading;
        }
    }
});

export const {resetError} = imgSlice.actions;
export default imgSlice.reducer;