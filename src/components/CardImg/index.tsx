import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import styles from "./CardImg.module.scss";
import {ItemImg} from "../../redux/imgSlice";
import {useDispatch} from "react-redux";
import {addFav, delFav} from "../../redux/favSlice";
import {useFavImgSelector} from "../../redux/selectors";

type CardImgProps = {
    data: ItemImg
}

export const CardImg: React.FC<CardImgProps> = React.memo(({data}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favImg = useFavImgSelector();

    function onDelFav(id: number) {
        dispatch(delFav(id));
        let arr: number[] = JSON.parse(localStorage.getItem("arrFavImg")!);
        arr.filter(function (n: number) {return n !== id});
        localStorage.setItem('arrFavImg', JSON.stringify(arr.filter(function (n: number) {return n !== id})));
    }
    function onAddFav(id: number) {
        dispatch(addFav(id));
        let arr: number[] = JSON.parse(localStorage.getItem("arrFavImg")!);
        arr.push(id);
        localStorage.setItem('arrFavImg', JSON.stringify(arr));
    }

    function addFavorite(id: number) {
        favImg.includes(id) ? onDelFav(id) : onAddFav(id)
    }
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <CardActionArea className={styles.cardActionArea}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Album number: {data.albumId}({data.id})
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={styles.cardMedia}
                        component="img"
                        image={data.url}
                        alt={`images ${data.id}`}
                    />
                </CardActionArea>
                <CardActions>
                    <Button onClick={() => navigate(`/about/${data.id}`)} size="small">More</Button>
                    <Button onClick={() => addFavorite(data.id)} size="small">
                        {!favImg.includes(data.id) ? "Add to favorites" : "Remove from favorites"}
                    </Button>
                    {!favImg.includes(data.id) ? <FavoriteBorderIcon className={styles.icon}/> :
                        <FavoriteIcon className={styles.icon}/>
                    }
                </CardActions>
            </Card>
        </div>
    );
})