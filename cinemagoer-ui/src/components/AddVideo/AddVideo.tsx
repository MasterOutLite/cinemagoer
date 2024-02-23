"use client"
import React from 'react';
import {Button, Stack, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoBanner from "@/components/VideoBaner/VideoBanner";
import AddNameVideo from "@/components/AddVideo/AddNameVideo";
import AddVideoParam from "@/components/AddVideo/AddVideoParam";

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

    return (
        <Stack alignItems='center'>
            <Stack direction='row' alignItems='start'>
                <VideoBanner icon={''}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file"/>
                    </Button>
                </VideoBanner>
                <AddNameVideo/>
            </Stack>

            <AddVideoParam/>

        </Stack>
    );
}

export default AddVideo;
