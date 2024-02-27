"use client"
import React from 'react';
import useStorePersist from "@/hook/useStorePersist";
import {useAuthStore} from "@/store/useAuthStore";
import {Roles} from "@/helper/roles";
import {useRouter} from "next/navigation";
import AddVideo from "@/components/AddVideo/AddVideo";
import {Container} from "@mui/material";

function Page() {
    const router = useRouter();
    const user = useStorePersist(useAuthStore, (state) => state.user);
    if (user)
        return (
            <div>
                Auth as admin
                {
                    user.roles.find(value => value === Roles.ADMIN)
                }
                <div>
                    {
                        JSON.stringify(user)
                    }
                </div>
                <Container>
                    <AddVideo/>
                </Container>
            </div>
        );
    else {
        //router.push(Links.admin);
        return (
            <div>
                Auth no admin
                {
                    JSON.stringify(user)
                }
            </div>
        )
    }

}

export default Page;
