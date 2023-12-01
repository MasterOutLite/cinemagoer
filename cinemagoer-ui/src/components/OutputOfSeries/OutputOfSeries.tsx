import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import SmallVideo from "@/components/SmallVideo/SmallVideo";
import {Series} from "@/type/series";

export interface OutputOfSeriesProps {
    index: number,
    title: string,
    series: Series[],
    style?: React.CSSProperties,
    expanded?: boolean,
    maxHeightContent?: number,
}

function OutputOfSeries({title, series, style, index, expanded, maxHeightContent}: OutputOfSeriesProps) {
    const [state, setState] = React.useState<boolean>(!!expanded);

    const handleChangeExpand = () => {
        setState((v) => !v);
    }

    return (
        <Accordion expanded={state} onClick={handleChangeExpand} style={style} sx={{minWidth: {xs: '100%'}}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                style={{background: '#e6e6e6'}}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{paddingX: 1}}>
                <Stack gap={1} divider={<Divider/>} style={{maxHeight: maxHeightContent || 300, overflow: 'auto'}}>
                    {
                        series.map((value) => (
                            <SmallVideo key={value.id} {...value} />
                        ))
                    }
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default OutputOfSeries;
