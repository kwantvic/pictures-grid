import {useSelector} from "react-redux";
import {createSelector} from "reselect";

import {RootState} from "./index";
import {createFavArr, isDefined, sortByName, sortByNumber} from "../utils/functional";
import {ItemImg} from "./imgSlice";

export function useImagesSelector() {
    return useSelector((state: RootState) => state.images.itemsImg);
}

export function useStatusSelector() {
    return useSelector((state: RootState) => state.images.status);
}

export function useErrorSelector() {
    return useSelector((state: RootState) => state.images.errorDescription);
}

export function useFavImgSelector() {
    return useSelector((state: RootState) => state.favorite.arrIdFav);
}

export function useSortSelector() {
    return useSelector((state: RootState) => state.sort.sortBy);
}

export function useSearchValueSelector() {
    return useSelector((state: RootState) => state.sort.searchValue);
}

export function useItemsPerPageSelector() {
    return useSelector((state: RootState) => state.sort.itemsPerPage);
}

export const selectArrImg = createSelector(
    (state: RootState) => state.images.itemsImg,
    (state: RootState) => state.favorite.arrIdFav,
    (state: RootState) => state.sort.sortBy,
    (state: RootState) => state.images.status,
    (state: RootState) => state.sort.searchValue,
    (_: RootState, isNav: boolean) => isNav,
    (itemsImg, arrIdFav, sortBy, status, searchValue, isNav) => {
        if (status === 1 && itemsImg.length) {
            if (!isNav && sortBy === 0) {
                if (searchValue.length) {
                    return itemsImg.filter((obj: ItemImg) => obj.title.toLowerCase().includes(searchValue));
                }
                else return itemsImg;
            } else if (!isNav && sortBy === 1)
                if (searchValue.length)
                    return itemsImg.slice().sort(sortByNumber).filter((obj) => obj.title.toLowerCase().includes(searchValue));
                else return itemsImg.slice().sort(sortByNumber);
            else if (!isNav && sortBy === 2)
                if (searchValue.length)
                    return itemsImg.filter((obj) => obj.title.toLowerCase().includes(searchValue)).filter(isDefined);
                else return itemsImg.slice().sort(sortByName);
            else if (isNav && sortBy === 0 && arrIdFav.length)
                if (searchValue.length)
                    return createFavArr(itemsImg, arrIdFav).filter((obj) => obj.title.toLowerCase().includes(searchValue)).filter(isDefined);
                else {
                    return createFavArr(itemsImg, arrIdFav);
                }
            else if (isNav && sortBy === 1 && arrIdFav.length)
                if (searchValue.length)
                    return createFavArr(itemsImg, arrIdFav).slice().sort(sortByNumber).filter((obj) => obj.title.toLowerCase().includes(searchValue)).filter(isDefined);
                else return createFavArr(itemsImg, arrIdFav).slice().sort(sortByNumber);
            else if (isNav && sortBy === 2 && arrIdFav.length)
                if (searchValue.length)
                    return createFavArr(itemsImg, arrIdFav).slice().sort(sortByNumber).filter((obj) => obj.title.toLowerCase().includes(searchValue)).filter(isDefined);
                else return createFavArr(itemsImg, arrIdFav).slice().sort(sortByNumber);
            else
                return false;
        } else {
            return false;
        }
    });