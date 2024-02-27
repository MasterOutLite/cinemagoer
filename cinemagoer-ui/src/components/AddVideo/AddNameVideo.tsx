import React, {useEffect} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';


export interface AddNameVideoProps {
    setNameArr: (names: string[]) => void;
}

function AddNameVideo({setNameArr}: AddNameVideoProps) {
    const [names, setNames] = React.useState<string[]>([])
    const [name, setName] = React.useState<string>('')
    const [nameMain, setNameMain] = React.useState<string>('')

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            target: {value},
        } = event
        setName(value);
    }

    function handleChangeMainName(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            target: {value},
        } = event

        setNameMain(value);
    }

    function handleAddName() {
        const exists = names.find(value => value === name);
        if (!exists && name) {
            setNames(prevState => [name, ...prevState]);
            setName('');
        }
    }

    function handleRemoveName(name: string) {
        return () => {
            const newName = names.filter(value => value !== name);
            setNames(newName);
        }
    }

    useEffect(() => {
        setNameArr([nameMain, ...names])
    }, [nameMain, names]);

    return (
        <Stack gap={1}>
            <TextField id="main-name-video"
                       value={nameMain}
                       size={'small'}
                       onChange={handleChangeMainName}
                       label="Назва" variant="outlined"/>

            <Stack direction={'row'}>
                <TextField id="other-name-video"
                           value={name}
                           size={'small'}
                           onChange={handleChangeName}
                           label="Додаткові назви" variant="outlined"/>
                <Button
                    onClick={handleAddName}
                    variant="contained">Додати</Button>
            </Stack>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Додаткові назви
                </AccordionSummary>
                <AccordionDetails>
                    {
                        names.map(value => (
                            <Stack direction={'row'} key={value} justifyContent={'space-between'}>
                                <Typography variant={'body1'} component={'span'}>
                                    {value}
                                </Typography>
                                <IconButton onClick={handleRemoveName(value)} size={'small'}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        ))
                    }
                </AccordionDetails>
            </Accordion>

        </Stack>
    );
}

export default AddNameVideo;
