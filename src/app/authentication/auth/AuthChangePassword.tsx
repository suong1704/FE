import React, { ChangeEvent, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { handleChangePassAsync } from '@/store/auth';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthChangePassword = ({ title, subtitle, subtext }: registerType) => {
    const user = useAppSelector(state => state.user);
    const [isSubmit, setIsSubmit] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [rpPass, setRpPass] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [cfValidate, setCfValidate] = useState("");

    const oldPassValidate = useMemo(
        () => {
            if(!oldPass) return "Require old password";
            if(cfValidate.includes("wrong")) return "Wrong password";
        },
        [oldPass, cfValidate]
    )

    const passValidate = useMemo(
        () => {
            if(!pass) return "Require new pass";
        },
        [pass]
    )

    const rpPassValidate = useMemo(
        () => {
            if(rpPass !== pass) return "Password dont same";
        },
        [pass, rpPass]
    )

    const submitHandler = () => {
        setIsSubmit(true);
        if(oldPassValidate || passValidate || rpPassValidate) return;
        dispatch(handleChangePassAsync({
            username: user.user?.username!,
            oldPassword: oldPass,
            newPassword: pass,
            onSuccess: () => {
                router.back();
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
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Old password</Typography>
                    <CustomTextField id="oldPass" variant="outlined" fullWidth
                        value={oldPass}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setOldPass(e.target.value);
                            setCfValidate("");
                        }}/>
                    {
                        isSubmit && oldPassValidate &&
                        <Typography variant="body1" color={"red"}>{oldPassValidate}</Typography>
                    }

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth
                        type="password"
                        value={pass}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setPass(e.target.value);
                        }}/>
                    {
                        isSubmit && passValidate &&
                        <Typography variant="body1" color={"red"}>{passValidate}</Typography>
                    }

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Repeat password</Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth
                        type="password"
                        value={rpPass}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
                            setRpPass(e.target.value);
                        }}/>
                    {
                        isSubmit && rpPassValidate &&
                        <Typography variant="body1" color={"red"}>{rpPassValidate}</Typography>
                    }
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth
                    onClick={() => { submitHandler(); }}
                >
                    Change
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthChangePassword;