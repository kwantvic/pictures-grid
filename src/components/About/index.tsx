import React from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import styles from "./About.module.scss";
import {RootState} from "../../redux";

export const About: React.FC = React.memo(() => {
        const navigate = useNavigate();
        const idImg = useParams();
        const images = useSelector((state: RootState) => state.images.itemsImg);
        let id = Number(idImg["*"]);
        const dataImg = images.find(obj => obj.id === id);

        return (
            <div className={styles.wrapper}>
                {dataImg ? (
                    <div className={styles.info}>
                        <p>id: {dataImg.id}</p>
                        <p>Album number: {dataImg.albumId}</p>
                        <p>Title: {dataImg.title}</p>
                        <p>Image URL : {dataImg.url}</p>
                    </div>
                ) : (
                    <div className={styles.info}>Something went wrong 😏</div>
                )}
                <Button onClick={() => navigate(-1)} variant="contained">Go back</Button>
            </div>
        );
    }
)