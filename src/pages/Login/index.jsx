import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {

    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()

    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '2tobbiBest.spider@gmail.com',
            password: '12365711'
        },
        mode:'onChange',
    })

    const onSubmit = async (values) => {
     const data = await dispatch(fetchAuth(values));
     if(!data.payload){
         alert('Unable to authorize')
     }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    useEffect(()=> {

    },[])

    if(isAuth) {
        return <Navigate to={'/'}/>
    }


    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type="email"
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Enter your email'})}
                    fullWidth
                />
                <TextField className={styles.field} label="Password"
                           type="password"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: 'Enter your password'})}
                           fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Sign in
                </Button>
            </form>
        </Paper>
    );
};
