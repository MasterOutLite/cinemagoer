"use client"
import React, {useCallback} from 'react';
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {TabContext} from '@mui/lab';
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {useAuthStore} from "@/store/useAuthStore";
import useStorePersist from "@/hook/useStorePersist";
import AuthService from "@/service/auth.service";

function Auth() {
    const [tab, setTab] = React.useState('1');
    const [login, setLogin] = React.useState<string>('condlo@email.com');
    const [password, setPassword] = React.useState<string>('L49Dj35dE');
    const [nickname, setNickname] = React.useState<string>('');
    const token = useStorePersist(useAuthStore, state => state.token);
    const handlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
        } = event.target

        setLogin(() => value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
        } = event.target

        setPassword(() => value);
    }

    const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
        } = event.target

        setNickname(() => value);
    }

    const handleTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleLogin = useCallback(async () => {
        await AuthService.loginUser(login, password);
    }, [login, password])

    const handleRegistration = useCallback(async () => {
        await AuthService.registrationUser(login, password, nickname);
    }, [login, password, nickname])

    return (
        <Paper sx={{margin: 'auto', width: {xs: '100%', sm: '400px', md: '600px'}}}>
            <Box>
                <Typography p={2} variant={'h4'} textAlign={'center'}>Вітаємо на сайті!</Typography>
                <Box sx={{width: '100%', typography: 'body1'}}>
                    <TabContext value={tab}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleTab} aria-label="Select user login or registration">
                                <Tab label="Вхід" value="1"/>
                                <Tab label="Регістрація" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Stack px={2} gap={2}>
                                <Typography>Вхід</Typography>
                                <TextField value={login} onChange={handlerLogin} placeholder={'Електронна скринька'}
                                           size={'small'}/>
                                <TextField value={password} onChange={handlePassword} placeholder={'Ваш пароль'}
                                           size={'small'}/>
                                <Button onClick={handleLogin}>Увійти</Button>
                            </Stack>
                        </TabPanel>
                        <TabPanel value="2">
                            <Stack px={2} gap={2}>
                                <Typography>Регістрація</Typography>
                                <TextField value={login} onChange={handlerLogin} placeholder={'Електронна скринька'}
                                           size={'small'}/>
                                <TextField value={nickname} onChange={handleNickname} placeholder={'Ваш ім\'я (нік)'}
                                           size={'small'}/>
                                <TextField value={password} onChange={handlePassword} placeholder={'Ваш пароль'}
                                           size={'small'}/>
                                <Button onClick={handleRegistration}>Зареєструватися</Button>
                            </Stack>
                        </TabPanel>
                    </TabContext>
                </Box>
                <Typography>{token}</Typography>
            </Box>
        </Paper>
    );
}

export default Auth;
