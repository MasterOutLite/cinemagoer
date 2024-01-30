"use client"
import React from 'react';
import {Box, Divider, Paper, Stack, Tabs} from "@mui/material";
import Tab from "@mui/material/Tab";
import {Series} from "@/type/series";
import {TabPanel} from "@/components/TabPanel/TabPanel";
import OutputOfSeries from "@/components/OutputOfSeries/OutputOfSeries";
import SmallVideo from "@/components/SmallVideo/SmallVideo";

export interface RenderSeriesDayProps {
    series: [Series[]];
}

const seriesForDayOfWeek = [
    'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя',
]

function RenderSeriesDay({series}: RenderSeriesDayProps) {

    const [tab, setTab] = React.useState(1);

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    return (
        <Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs onChange={handleTab} value={tab}>
                    {
                        seriesForDayOfWeek.map((value, index) =>
                            <Tab key={index} label={value}
                                 tabIndex={index}/>)
                    }
                </Tabs>
            </Box>

            {seriesForDayOfWeek.map((value, index) => (
                <TabPanel key={index} index={index} value={tab}>
                    <OutputOfSeries maxHeightContent={500}
                        title={value} expanded={false} series={series[index]} index={index}/>
                    {/*<Paper >*/}
                    {/*    <Stack p={1} gap={1} divider={<Divider/>} style={{maxHeight: 300, overflow: 'auto'}}>*/}
                    {/*        {*/}
                    {/*            series[index].map((value) => (*/}
                    {/*                <SmallVideo key={value.name} {...value} />*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*    </Stack>*/}
                    {/*</Paper>*/}
                </TabPanel>))
            }


        </Box>
    );
}

export default RenderSeriesDay;
