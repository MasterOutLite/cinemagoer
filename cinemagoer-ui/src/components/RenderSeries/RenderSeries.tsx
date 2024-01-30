import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography} from "@mui/material";
import {Series} from "@/type/series";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid2 from "@mui/material/Unstable_Grid2";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import {grey} from '@mui/material/colors';

export interface RenderSeriesProps {
    series: Series[] | undefined;
    notRenderWhenNull?: boolean;
}

function RenderSeries({series, notRenderWhenNull}: RenderSeriesProps) {
    if (!series && notRenderWhenNull) {
        return <></>
    }

    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Вихід серій</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{paddingX: 1}}>
                    <Grid2 container direction={'row'}
                           sx={{background: grey[800], color: '#fff'}} py={1}>
                        <Grid2 xs={4} sm={2}>
                            <Typography pl={2} variant={'subtitle1'}>Номер серії</Typography>
                        </Grid2>
                        <Grid2 xs={6} sx={{display: {xs: 'none', sm: 'block'}}}>
                            <Typography variant={'subtitle1'}>
                                Назва серії
                            </Typography>
                        </Grid2>
                        <Grid2 xs={6} sm={2}>
                            <Typography>
                                Дата виходу
                            </Typography>
                        </Grid2>
                        <Grid2 xs={2}>
                            <Typography textAlign={'center'}>
                                Статус
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Stack
                        divider={<Divider/>}
                        style={{maxHeight: 300, overflow: 'auto'}}
                    >
                        {series?.map(value =>
                            <Grid2 container key={value.id} direction={'row'} py={1}>
                                <Grid2 xs={4} sm={2}>
                                    <Typography variant={'subtitle1'} pl={2}>{value.series} Серія</Typography>
                                </Grid2>
                                <Grid2 xs={6} sx={{display: {xs: 'none', sm: 'block'}}}>
                                    <Typography variant={'subtitle1'}
                                                style={{fontWeight: 'bold'}}>{value.name}</Typography>
                                </Grid2>
                                <Grid2 xs={6} sm={2}>
                                    <Typography>
                                        {new Date(value.dateRelease).toLocaleDateString()}
                                    </Typography>
                                </Grid2>
                                {
                                    value.release || new Date().toISOString() > value.dateRelease ?
                                        <Grid2 xs={2}>
                                            <Stack alignItems={'center'}>
                                                <DoneRoundedIcon color="success"/>
                                            </Stack>
                                        </Grid2>
                                        : null
                                }

                            </Grid2>
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
}

export default RenderSeries;
