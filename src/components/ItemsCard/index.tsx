import React from 'react';
import {Button, CircularProgress} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "./ItemsCard.module.scss";
import {CardImg} from "../CardImg";
import {RootState} from "../../redux";
import {
    selectArrImg,
    useItemsPerPageSelector,
    useSearchValueSelector,
    useSortSelector,
    useStatusSelector
} from "../../redux/selectors";
import {ItemImg} from "../../redux/imgSlice";
import {initItemsPerPage, itemsPreloader} from "../../utils/variables";
import {changeItemsPerPage, resetItemsPerPage, resetSearchValue, resetSortBy} from "../../redux/sortSlice";
import {PreloaderCard} from "../UiComponenets/PreloaderCard";

export const ItemsCard: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const itemsSelector = useSelector((state: RootState) => selectArrImg(state, isFav()));
    const itemsPerPage = useItemsPerPageSelector();
    const status = useStatusSelector();
    const sort = useSortSelector();
    const searchValue = useSearchValueSelector();
    const [hasMoreItems, setHasMoreItems] = React.useState(true);

    React.useEffect(() => {
        setHasMoreItems(true);
        if (itemsSelector) {
            if (itemsSelector.length < initItemsPerPage) {
                dispatch(changeItemsPerPage(itemsSelector.length));
            }
        }
    }, [itemsSelector, dispatch])

    const showItems = (itemsSelector: ItemImg[]) => {
        const items = [];
        if (itemsSelector.length) {
            for (let i = 0; i < itemsPerPage; i++) {
                if (itemsSelector[i] === undefined) return;
                items.push(<CardImg key={itemsSelector[i].id} data={itemsSelector[i]}/>);
            }
            return items;
        } else return;
    };

    const loadMore = () => {
        if (itemsSelector) {
            if (itemsSelector.length <= itemsPerPage) {
                setHasMoreItems(false);
            } else {
                dispatch(changeItemsPerPage(itemsPerPage + initItemsPerPage));
            }
        } else
            return null;
    };

    function isFav() {
        return path === "/favorite";
    }

    function toggleFav() {
        sort !== 0 && dispatch(resetSortBy());
        searchValue.length && dispatch(resetSearchValue());
        dispatch(resetItemsPerPage());
        navigate(!isFav() ? "/favorite" : "/");
    }

    return (
        <div className={styles.wrapper}>
            {status === 1
                ? itemsSelector
                    ? <InfiniteScroll
                        dataLength={itemsSelector.length > initItemsPerPage ? itemsPerPage : itemsSelector.length}
                        next={loadMore}
                        hasMore={hasMoreItems}
                        className={styles.infinite}
                        loader={<div className={styles.progress} key={0}>
                            {itemsSelector.length >= initItemsPerPage && <CircularProgress/>}
                            {!itemsSelector.length && <div className={`${styles.wrong} ${styles.wrongSearch}`}>
                                <p>🔍 On your request "{searchValue}" nothing were found.</p>
                            </div>}
                        </div>}>
                        <div className={styles.items}>{showItems(itemsSelector)}</div>
                    </InfiniteScroll>
                    : <div className={styles.wrong}><p>Something went wrong 🥺</p></div>
                : <div className={styles.items}>
                    {itemsPreloader.map((_, i) => (
                        <PreloaderCard key={i}/>
                    ))}
                </div>
            }
            <div className={styles.favorite}>
                <div className={styles.btn}>
                    <Button onClick={toggleFav} variant="contained">
                        {!isFav() ? "Favorites" : "Main Page"}
                    </Button>
                </div>
            </div>
        </div>
    );
})