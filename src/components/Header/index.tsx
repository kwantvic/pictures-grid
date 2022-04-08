import React, {ChangeEvent} from 'react';
import TextField from '@mui/material/TextField';
import {useLocation, useNavigate} from "react-router-dom";

import styles from "./Header.module.scss";
import {BasicSelect} from "../SelectedSorting";
import {useSearchValueSelector} from "../../redux/selectors";
import {useDispatch} from "react-redux";
import {changeSearchValue, resetItemsPerPage} from "../../redux/sortSlice";

export const Header: React.FC = React.memo(() => {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onChangeSearchValue(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(changeSearchValue(e.target.value));
        dispatch(resetItemsPerPage());
    }

    return (
        <div className={styles.wrapper}>
            <div onClick={() => navigate("/")} className={styles.name}>
                <p>TEST-PICTURES</p>
            </div>
            <div className={styles.right}>
                <div className={styles.sort}>
                    <BasicSelect/>
                </div>
                <div className={styles.search}>
                    <TextField value={useSearchValueSelector()}
                               onChange={(e) => onChangeSearchValue(e)}
                               placeholder="title search..."
                               disabled={path.includes("/about")}
                               className={styles.input}
                               id="outlined-basic" variant="outlined"/>
                </div>
            </div>
        </div>
    );
})