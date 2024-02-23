import React from 'react';
import {BaseResponse} from "@/type/base-response";
import {
    Checkbox,
    Chip,
    FormControl,
    InputLabel, ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack
} from "@mui/material";
import {BasePath, getBaseRequest} from "@/helper/api";

function AddVideoParam() {
    const [type, setType] = React.useState<BaseResponse[]>([]);
    const [status, setStatus] = React.useState<BaseResponse[]>([]);
    const [ageRating, setAgeRating] = React.useState<BaseResponse[]>([]);
    const [genre, setGenre] = React.useState<BaseResponse[]>([]);
    const [category, setCategory] = React.useState<BaseResponse[]>([]);
    const [publisher, setPublisher] = React.useState<BaseResponse[]>([]);

    const [genreSelect, setGenreSelect] = React.useState<number[]>([]);

    const [typeSelect, setTypeSelect] = React.useState<string>('');
    const [categorySelect, setCategorySelect] = React.useState<string>('');

    const [publisherSelect, setPublisherSelect] = React.useState<string>('');
    const [statusSelect, setStatusSelect] = React.useState<string>('');
    const [ageRatingSelect, setAgeRatingSelect] = React.useState<string>('');

    const [year, setYear] = React.useState('');
    const [yearValid, setYearValid] = React.useState<boolean>(true);

    const renderFilter = [
        {title: 'Категорія відео', render: category, action: handleChangeCategory, value: categorySelect},
        {title: 'Тип', render: type, action: handleChangeType, value: typeSelect},
        {title: 'Видавець', render: publisher, action: handleChangePublisher, value: publisherSelect},
        {title: 'Статус', render: status, action: handleChangeStatus, value: statusSelect},
        {title: 'Віковий рейтинг', render: ageRating, action: handleChangeAgeRating, value: ageRatingSelect},
    ];

    function handleChangeCategory(event: SelectChangeEvent) {
        setCategorySelect(event.target.value);
    }

    function handleChangePublisher(event: SelectChangeEvent) {
        setPublisherSelect(event.target.value);
    }

    function handleChangeType(event: SelectChangeEvent) {
        setTypeSelect(event.target.value);
    }

    function handleChangeStatus(event: SelectChangeEvent) {
        setStatusSelect(event.target.value);
    }

    function handleChangeAgeRating(event: SelectChangeEvent) {
        setAgeRatingSelect(event.target.value);
    }

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

    const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value},
        } = event

        let numberValid = validYear(value);
        if (numberValid.length >= 4 && numberValid <= '1900')
            numberValid = '1900';

        setYear(() => numberValid);
        setYearValid(() => numberValid.length >= 4 || !numberValid);
    };


    async function initData() {
        const type = await getBaseRequest(BasePath.type);
        setType(type);

        const category = await getBaseRequest(BasePath.videoCategory);
        setCategory(category);

        const publisher = await getBaseRequest(BasePath.publisher);
        setPublisher(publisher);

        const status = await getBaseRequest(BasePath.status);
        setStatus(status);

        const ageRating = await getBaseRequest(BasePath.ageRating);
        setAgeRating(ageRating);

        const genre = await getBaseRequest(BasePath.genre);
        setGenre(genre);
    }

    React.useEffect(() => {
        initData();
    }, [])

    return (
        <Stack sx={{maxWidth: 400, width: '100%'}} gap={2}>
            <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label-genre">Жанри</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label-genre"
                    id="demo-multiple-checkbox-genre"
                    multiple
                    value={genreSelect}
                    onChange={handleChangeGenre}
                    input={<OutlinedInput label="Жанри"/>}
                    renderValue={(selected) => (
                        <Stack direction={'row'} flexWrap={'wrap'} gap={0.5}>
                            {selected.map((value) => (
                                <Chip key={value} label={getGenreById(value)?.name}/>
                            ))}
                        </Stack>
                    )}
                >
                    {genre.map((value) => (
                        <MenuItem key={value.id} value={value.id} sx={{maxWidth: '300px'}}>
                            <Checkbox checked={genreSelect.indexOf(value.id) > -1}/>
                            <ListItemText primary={value.id + ' ' + value.name}/>
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

        </Stack>
    );
}

export default AddVideoParam;
