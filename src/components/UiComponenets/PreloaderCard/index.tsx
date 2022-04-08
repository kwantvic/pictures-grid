import React from 'react';
import {Card, CardHeader, Skeleton} from "@mui/material";

import styles from "./PreloaderCard.module.scss";

export const PreloaderCard: React.FC = React.memo(() => {
    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <CardHeader
                    title={
                        <>
                            <Skeleton className={styles.skeletonHeader} animation="wave"/>
                            <Skeleton className={styles.skeletonHeader} animation="wave"/>
                        </>
                    }
                    subheader={
                        <Skeleton className={styles.skeletonSubHeader} animation="wave"/>
                    }
                />
                {<Skeleton className={styles.skeletonImg} animation="wave" variant="rectangular"/>}
                {<div className={styles.footer}>
                    <Skeleton className={styles.skeletonBtn1}  animation="wave"/>
                    <Skeleton className={styles.skeletonBtn2}  animation="wave"/>
                    <Skeleton className={styles.skeletonIcon}  animation="wave"/>
                </div>}
            </Card>
        </div>
    );
})