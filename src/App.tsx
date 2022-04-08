import React from "react";
import {useDispatch} from "react-redux";
import {Route, Routes} from 'react-router-dom';

import {Header} from "./components/Header";
import {fetchAllImg} from "./redux/imgSlice";
import {ItemsCard} from "./components/ItemsCard";
import {About} from "./components/About";
import {addLocalFav} from "./redux/favSlice";
import {ActionAlerts} from "./components/UiComponenets/ActionAlerts";
import {useErrorSelector} from "./redux/selectors";

export const App: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAllImg());
        if (localStorage.getItem("arrFavImg")) {
            let arr: number[] = JSON.parse(localStorage.getItem("arrFavImg")!);
            (arr.length > 0) && dispatch(addLocalFav(arr));
        } else {
            let arr: number[] = [];
            localStorage.setItem("arrFavImg", JSON.stringify(arr));
        }
    }, [dispatch])

    return (
        <div>
            <ActionAlerts severity={"error"} errorDescription={useErrorSelector()}/>
            <Header/>
            <Routes>
                <Route path="" element={<ItemsCard/>}/>
                <Route path="favorite" element={<ItemsCard/>}/>
                <Route path="about/*" element={<About/>}/>
            </Routes>
        </div>
    );
})