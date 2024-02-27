"use client"
import React, {useEffect} from 'react';
import {Button, Stack, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoBanner from "@/components/VideoBaner/VideoBanner";
import AddNameVideo from "@/components/AddVideo/AddNameVideo";
import SelectParam from "@/components/AddVideo/SelectParam";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AddVideo() {

    const [names, setNames] = React.useState<string[]>([])

    useEffect(() => {
        console.log('AddVideo:', 'Names', names);
    }, [names]);

    return (
        <Stack>
            <Stack direction='row' alignItems='start'>
                <VideoBanner icon={''}>
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file"/>
                    </Button>


                </VideoBanner>
                <Stack gap={2}>
                    <AddNameVideo setNameArr={setNames}/>
                    <SelectParam/>
                </Stack>
            </Stack>


        </Stack>
    );
}

export default AddVideo;
