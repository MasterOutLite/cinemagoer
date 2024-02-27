import React from 'react';
import {Link, Paper, Skeleton, Stack, Typography} from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {yellow} from "@mui/material/colors";
import Image from "next/image";
import styles from '@/styles/PreviewVideoWithInfoCard.module.css'
import {VideoType} from "@/type/videoType";
import {getTypeLink} from "@/helper/link";
import {apiPath} from "@/helper/api";
import {FilterParam} from "@/type/filter-param";

export interface PreviewVideoWithInfoCardProps extends VideoType {

}

function PreviewVideoWithInfoCard({
                         id,
                         name,
                         type,
                         ageRating,
                         dateRelease,
                         genre,
                         icon,
                         rate,
                         videoCategory,
                     }: PreviewVideoWithInfoCardProps) {
    const typeLink = getTypeLink(videoCategory);
    return (
        <Paper style={{padding: '4px', background: '#e6d2be1a'}}>
            <Stack flexDirection={'row'} gap={1}>

                {icon ?
                    <Image className={styles.image} width={184} height={260} src={apiPath + icon}
                           alt={'Icon'}/>
                    :
                    <Skeleton variant="rectangular"
                              sx={{width: {xs: '150px', sm: '184px',}, height: {xs: '220px', sm: '260px'}}}/>
                }

                <Stack>
                    <Link href={`/${typeLink}/${id}`} underline={'none'} color="inherit">
                        <Typography variant={'h6'} component={'h2'}>
                            {name[0]}
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            {name[1]}
                        </Typography>
                    </Link>
                    {
                        <Stack flexDirection={'row'} gap={1}>
                            <StarRoundedIcon sx={{color: yellow[800], fontSize: 30}}/>
                            <Paper sx={{background: yellow[700], paddingX: '4px', minWidth: '50px'}}>
                                <Typography variant={'h6'} textAlign={'center'}
                                            color={'#fff'}> {rate || '0.00'}</Typography>
                            </Paper>
                        </Stack>
                    }

                    <Typography>
                        {new Date(dateRelease).getFullYear()} | {type.name}
                    </Typography>
                    <Typography>
                        Жанри:
                        {genre.map((value, index, array) =>
                            <React.Fragment key={value.id}>
                                <Link underline="hover"
                                      href={`${typeLink}?${FilterParam.genre}=${value.id}`}> {value.name}</Link>
                                {index !== array.length - 1 ? <span>, </span> : null}
                            </React.Fragment>
                        )}
                    </Typography>
                    <Typography>
                        Віковий рейтинг: {ageRating.name}
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default PreviewVideoWithInfoCard;
