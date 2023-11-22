import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import SmallVideo, {SmallVideoProps} from "@/components/SmallVideo/SmallVideo";
import {Series} from "@/type/series";

export interface OutputOfSeriesProps {
    id: number,
    title: string,
    series: Series[],
    video?: SmallVideoProps[],
    style?: React.CSSProperties,
}

function OutputOfSeries({title, video, series, style, id}: OutputOfSeriesProps) {
    return (
        <Accordion style={style} sx={{minWidth: {xs: '100%'}}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`panel${id}a-content`}
                id={`panel${id}a-header`}
                style={{background: '#e6e6e6'}}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack gap={1} divider={<Divider/>}>
                    {
                        series.map((value, index) => (
                            <SmallVideo key={value.name} {...value} />
                        ))
                    }
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default OutputOfSeries;
