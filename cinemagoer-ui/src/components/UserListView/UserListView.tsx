import React from 'react';
import {Box, Tabs, Typography} from "@mui/material";
import Tab from "@mui/material/Tab";
import {TabPanel} from "@/components/TabPanel/TabPanel";
import {ListView} from "@/type/list-view";
import UserListViewTabContent from "@/components/UserListView/UserListViewTabContent";

export interface UserListViewProps {
    userList: ListView[];
}

function UserListView({userList}: UserListViewProps) {
    const [tab, setTab] = React.useState(1);

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    function remove(indexUserList: number) {
        return (videoId: number) => {
            userList[indexUserList].video = userList[indexUserList].video?.filter(value => value.id !== videoId);
        }
    }


    return (
        <Box sx={{width: '100%', typography: 'body1'}}>

            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs onChange={handleTab} value={tab}>
                    {
                        userList.map((value, index) =>
                            <Tab key={index} label={value.name}
                                 tabIndex={index}/>)
                    }
                </Tabs>
            </Box>

            {
                userList.map((value, index) =>
                    <TabPanel key={index} value={tab} index={index}>
                        {
                            value.video ?
                                <UserListViewTabContent video={value.video} userListViewId={value.id}
                                                        remove={remove(index)}/>
                                :
                                <Typography>
                                    Список пустий
                                </Typography>
                        }
                    </TabPanel>
                )
            }

        </Box>
    );
}

export default UserListView;
