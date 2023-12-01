"use client"
import React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import {useAuthStore} from "@/store/useAuthStore";
import Auth from "@/components/Auth/Auth";
import useStorePersist from "@/hook/useStorePersist";
import User from '@/components/User/User';

function Page() {
    const token = useStorePersist(useAuthStore, (state) => state.token);
    const user = useStorePersist(useAuthStore, (state) => state.user);
    const getOut = useAuthStore.getState().getOut;
    console.log(token);
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
            <Box pt={4}>
                <Button onClick={() => {
                    getOut()
                }}>Get out</Button>
                <User/>
            </Box>
        </Container>
    );
}

export default Page;
