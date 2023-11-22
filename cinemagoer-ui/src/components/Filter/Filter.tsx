"use client"
import React from 'react';
import {
    Box, Button,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Stack, SxProps, TextField, Theme
} from "@mui/material";
import Title from "@/components/Title/Title";
import {BaseResponse} from "@/type/base-response";
import {VideoCategory} from "@/helper/api";

export interface FilterProps {
    type: BaseResponse[];
    status: BaseResponse[];
    ageRating: BaseResponse[];
    genre: BaseResponse[];
    videoCategory: VideoCategory;
    setQuery: (value: string) => void;
    sx?: SxProps<Theme>;
}

function Filter({type, status, ageRating, genre, videoCategory, setQuery, sx}: FilterProps) {
    const [genreSelect, setGenreSelect] = React.useState<number[]>([]);

    const [typeSelect, setTypeSelect] = React.useState<string>('');
    const [statusSelect, setStatusSelect] = React.useState<string>('');
    const [ageRatingSelect, setAgeRatingSelect] = React.useState<string>('');

    const [fromYear, setFromYear] = React.useState('');
    const [fromYearValid, setFromYearValid] = React.useState<boolean>(true);

    const [toYear, setToYear] = React.useState('');
    const [toYearValid, setToYearValid] = React.useState<boolean>(true);


    const handleChangeType = (event: SelectChangeEvent) => {
        setTypeSelect(event.target.value);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatusSelect(event.target.value);
    };

    const handleChangeAgeRating = (event: SelectChangeEvent) => {
        setAgeRatingSelect(event.target.value);
    };

    const handleChangeGenre = (event: SelectChangeEvent<typeof genreSelect>) => {
        const {
            target: {value},
        } = event
        setGenreSelect(() => [...value as number[]]);
    };

    function getGenreById(id: number) {
        return genre.find(value => value.id == id);
    }

    function validYear(value: string) {
        const number = value.replace(/[^0-9]/g, '');
        return number.slice(0, 4);
    }

    const handleChangeFromYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value},
        } = event

        let numberValid = validYear(value);
        if (numberValid.length >= 4 && numberValid <= '1900')
            numberValid = '1900';
        if (toYear && numberValid > toYear)
            numberValid = fromYear;

        setFromYear(() => numberValid);
        setFromYearValid(() => numberValid.length >= 4 && numberValid <= toYear || !numberValid);
    };

    const handleChangeToYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value},
        } = event

        const numberValid = validYear(value);
        // if (numberValid.length >= 4 && parseInt(numberValid) >= new Date().getFullYear())
        //     numberValid = new Date().getFullYear().toString();
        setToYear(() => numberValid);
        setToYearValid(() => numberValid.length >= 4 || !numberValid)
    };

    const handleRequest = () => {
        const genreIds = genreSelect.length > 0 ? 'genreIds=' + genreSelect.toString() : undefined;
        const typeId = typeSelect ? 'typeId=' + typeSelect : undefined;
        const statusId = statusSelect ? 'statusId=' + statusSelect : undefined;
        const ageRatingId = ageRatingSelect ? 'ageRatingId=' + ageRatingSelect : undefined;
        const dateReleaseMin = fromYearValid && fromYear ? 'dateReleaseMin=' + fromYear : undefined;
        const dateReleaseMax = toYearValid && toYear ? 'dateReleaseMax=' + toYear : undefined;
        const videoCategoryId = 'videoCategoryId=' + videoCategory;

        const getRequest = [videoCategoryId, genreIds, typeId, statusId, ageRatingId, dateReleaseMin, dateReleaseMax]
            .filter(value => !!value).join('&');
        setQuery(getRequest);
        // console.log(getRequest.join('&'));
    };

    const renderFilter = [
        {title: 'Тип', render: type, action: handleChangeType, value: typeSelect},
        {title: 'Статус', render: status, action: handleChangeStatus, value: statusSelect},
        {title: 'Віковий рейтинг', render: ageRating, action: handleChangeAgeRating, value: ageRatingSelect},
    ];

    return (
        <Paper sx={sx} style={{maxWidth: '350px', flexGrow: 0}}>

            <Title style={{textAlign: 'center'}}>
                Фільтер
            </Title>
            <Stack p={1} mt={2} pb={3} gap={2}>

                <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label-genre">Жанри</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label-genre"
                        id="demo-multiple-checkbox-genre"
                        multiple
                        value={genreSelect}
                        onChange={handleChangeGenre}
                        input={<OutlinedInput label="Жанри"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getGenreById(value)?.name}/>
                                ))}
                            </Box>
                        )}
                    >
                        {genre.map((value) => (
                            <MenuItem key={value.id} value={value.id}>
                                <Checkbox checked={genreSelect.indexOf(value.id) > -1}/>
                                <ListItemText primary={value.name}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {
                    renderFilter.map((value, index) => (
                        <FormControl key={value.title} fullWidth>
                            <InputLabel id={`demo-simple-select-label-${index}`}>{value.title}</InputLabel>
                            <Select
                                labelId={`demo-simple-select-label-${index}`}
                                id={`demo-simple-select-${index}`}
                                value={value.value}
                                label={value.title}
                                onChange={value.action}
                            >
                                <MenuItem value=''>None</MenuItem>
                                {
                                    value.render.map(value => <MenuItem key={value.id}
                                                                        value={value.id}>{value.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    ))
                }
                <Stack direction="row" spacing={2}>
                    <TextField error={!fromYearValid} label="Від" variant="outlined" value={fromYear}
                               onChange={handleChangeFromYear}/>
                    <TextField error={!toYearValid} label="До" variant="outlined" value={toYear}
                               onChange={handleChangeToYear}/>
                </Stack>


                <Button variant="contained" size={'large'} onClick={handleRequest}>Знайти</Button>
            </Stack>
        </Paper>
    );
}

export default Filter;
