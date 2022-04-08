import {ItemImg} from "../redux/imgSlice";

export function isDefined<ItemImg>(argument: ItemImg | undefined): argument is ItemImg {
    return argument !== undefined
}

export const createFavArr = (imgArr: ItemImg[], favArr: number[]) => {
    return favArr.map((i) => imgArr.find((obj) => obj.id === i)).filter(isDefined) as ItemImg[];
};

export const sortByName = (a: ItemImg, b: ItemImg) => {
    let nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase();
    if (nameA < nameB)
        return -1;
    if (nameA > nameB)
        return 1;
    return 0;
};

export const sortByNumber = (a: ItemImg, b: ItemImg) => {
    return a!.albumId - b!.albumId;
}
