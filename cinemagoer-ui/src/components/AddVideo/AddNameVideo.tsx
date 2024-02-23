import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";


function AddNameVideo() {
    const [names, setNames] = React.useState<string[]>([])
    const [name, setName] = React.useState<string>('')

    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            target: {value},
        } = event
        setName(value);
    }

    function handleAddName() {
        const exists = names.find(value => value === name);
        if (!exists) {
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

    return (
        <Stack gap={1}>
            <TextField id="outlined-basic"
                       value={name}
                       onChange={handleChangeName}
                       label="Додати назву" variant="outlined"/>
            <Button
                onClick={handleAddName}
                variant="contained">Додати</Button>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Назви фільму
                </AccordionSummary>
                <AccordionDetails>
                    {
                        names.map(value =>
                            <Stack key={value} direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography>
                                    {value}
                                </Typography>
                                <IconButton
                                    onClick={handleRemoveName(value)}
                                    aria-label="delete" size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </Stack>
                        )
                    }
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}

export default AddNameVideo;
