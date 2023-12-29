import React, { ChangeEvent, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { handleRegisterAsync } from '@/store/auth';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [cfValidate, setCfValidate] = useState("");

    const usernameValidate = useMemo(
        () => {
            if(!username) return "Require username";
            if(cfValidate.includes("username")) return "User existed"
        },
        [username, cfValidate]
    )

    const emailValidate = useMemo(
        () => {
            if(!email) return "Require email";
            const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!emailReg.test(email)) return "Email invalid"
            if(cfValidate.includes("email")) return "Email existed"
        },
        [email, cfValidate]
    )

    const passValidate = useMemo(
        () => {
            if(!password) return "Require password";
        },
        [password]
    )

    const submitHandler = () => {
        setIsSubmit(true);
        if(usernameValidate || emailValidate || passValidate) return;
        dispatch(handleRegisterAsync({
            username, email, password,
            onSuccess: () => {
                router.push("/authentication/login");
            },
            onError: (mes) => {
                console.log(mes);
                setCfValidate(mes);
            }
        }))
    }

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setUsername(e.target.value);
                            if(cfValidate.includes("username")) setCfValidate("");
                        }}/>
                    {
                        isSubmit && usernameValidate &&
                        <Typography variant="body1" color={"red"}>{usernameValidate}</Typography>
                    }

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setEmail(e.target.value);
                            if(cfValidate.includes("email")) setCfValidate("");
                        }}/>
                    {
                        isSubmit && emailValidate &&
                        <Typography variant="body1" color={"red"}>{emailValidate}</Typography>
                    }

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setPassword(e.target.value);
                        }}/>
                    {
                        isSubmit && passValidate &&
                        <Typography variant="body1" color={"red"}>{passValidate}</Typography>
                    }
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth
                    onClick={() => { submitHandler(); }}
                >
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
