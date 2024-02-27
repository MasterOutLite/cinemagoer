"use client";
import React from 'react';
import {useAuthStore} from "@/store/useAuthStore";
import {Box, Button, Container, Stack} from "@mui/material";
import Auth from "@/components/Auth/Auth";
import User from "@/components/User/User";
import {Links} from "@/helper/link";

function Page() {
    const user = useAuthStore().user;
    const token = useAuthStore().token;
    console.log(token);
    const getOut = useAuthStore.getState().getOut;

    function handleSignOut() {
        getOut();
    }

    if (!user)
        return (
            <Container sx={{minHeight: '100%'}}>
                <Box py={6}>
                    <Auth/>
                </Box>
            </Container>
        )

    return (
        <Container>
            <Stack gap={2}>
                <Button sx={{alignSelf: 'self-end'}} href={Links.admin} variant="outlined">
                    Admin panel</Button>

                <Button sx={{alignSelf: 'self-end'}} variant="outlined"
                        onClick={handleSignOut}>Sign Out</Button>
                <User/>
            </Stack>
        </Container>
    );
}

export default Page;
