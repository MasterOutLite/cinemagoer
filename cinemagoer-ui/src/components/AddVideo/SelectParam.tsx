"use client";
import React, {SyntheticEvent} from 'react';
import {BaseResponse} from "@/type/base-response";
import {Autocomplete, Checkbox, Stack, TextField} from "@mui/material";
import {BasePath, getBaseRequest} from "@/helper/api";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

function SelectParam() {
    const [type, setType] = React.useState<BaseResponse[]>([]);
    const [status, setStatus] = React.useState<BaseResponse[]>([]);
    const [ageRating, setAgeRating] = React.useState<BaseResponse[]>([]);
    const [genre, setGenre] = React.useState<BaseResponse[]>([]);
    const [category, setCategory] = React.useState<BaseResponse[]>([]);
    const [publisher, setPublisher] = React.useState<BaseResponse[]>([]);

    const [genreSelect, setGenreSelect] = React.useState<BaseResponse[]>([]);
    const [typeSelect, setTypeSelect] = React.useState<BaseResponse>();
    const [categorySelect, setCategorySelect] = React.useState<BaseResponse>();
    const [publisherSelect, setPublisherSelect] = React.useState<BaseResponse>();
    const [statusSelect, setStatusSelect] = React.useState<BaseResponse>();
    const [ageRatingSelect, setAgeRatingSelect] = React.useState<BaseResponse>();

    const renderFilter = [
        {title: 'Категорія відео', render: category, action: handleChangeCategory, value: categorySelect},
        {title: 'Тип', render: type, action: handleChangeType, value: typeSelect},
        {title: 'Видавець', render: publisher, action: handleChangePublisher, value: publisherSelect},
        {title: 'Статус', render: status, action: handleChangeStatus, value: statusSelect},
        {title: 'Віковий рейтинг', render: ageRating, action: handleChangeAgeRating, value: ageRatingSelect},
    ];

    function handleChangeCategory(event: SyntheticEvent<Element, Event>, newValue: any) {
        setCategorySelect(newValue);
    }

    function handleChangePublisher(event: SyntheticEvent<Element, Event>, newValue: any) {
        setPublisherSelect(newValue);
    }

    function handleChangeType(event: SyntheticEvent<Element, Event>, newValue: any) {
        setTypeSelect(newValue);
    }

    function handleChangeStatus(event: SyntheticEvent<Element, Event>, newValue: any) {
        setStatusSelect(newValue);
    }

    function handleChangeAgeRating(event: SyntheticEvent<Element, Event>, newValue: any) {
        console.log('One', newValue)
        setAgeRatingSelect(newValue);
    }

    const handleChangeGenre = (event: SyntheticEvent<Element, Event>, newValue: BaseResponse[]) => {
        console.log('Arr', newValue)
        setGenreSelect(() => newValue);
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
        <Stack gap={2}>
            <Autocomplete
                multiple
                id="checkboxes-genre"
                size={'small'}
                options={genre}
                disableCloseOnSelect
                value={genreSelect}
                getOptionLabel={(option) => option.name}
                onChange={handleChangeGenre}
                renderOption={(props, option, {selected}) => (
                    <li  {...props} >
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}

                renderInput={(params) => (
                    <TextField {...params} label="Жанри" placeholder="Напишіть або виберіть назву жанра"/>
                )}
            />

            {
                renderFilter.map((value, index) => (
                        <Autocomplete
                            key={value.title}
                            id="checkboxes-tags-demo"
                            size={'small'}
                            options={value.render}
                            disableCloseOnSelect
                            onChange={value.action}
                            getOptionLabel={(option) => option.name}

                            renderInput={(params) => (
                                <TextField {...params} label={value.title} placeholder="Виберіть із списку"/>
                            )}
                        />
                    )
                )
            }

        </Stack>
    )
        ;
}

export default SelectParam;
