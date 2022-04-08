import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useDispatch} from "react-redux";

import styles from "./SelectedSorting.module.scss";
import {useSortSelector} from "../../redux/selectors";
import {changeSortBy, resetItemsPerPage, resetSearchValue} from "../../redux/sortSlice";
import {useLocation} from "react-router-dom";

export const BasicSelect: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(changeSortBy(e.target.value));
        dispatch(resetSearchValue());
        dispatch(resetItemsPerPage());
    };

    return (
        <div className={styles.wrapper}>
            <p>Sort by:</p>
            <Select className={styles.select}
                    labelId="demo-simple-select-label"
                    disabled={path.includes("/about")}
                    id="demo-simple-select"
                    value={String(useSortSelector())}
                    onChange={handleChange}>
                <MenuItem value={0}>default</MenuItem>
                <MenuItem value={1}>album number</MenuItem>
                <MenuItem value={2}>abc</MenuItem>
            </Select>
        </div>
    );
})
