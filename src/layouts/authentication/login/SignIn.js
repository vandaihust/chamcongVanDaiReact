
import { LockOpenOutlined } from '@mui/icons-material';
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import useStyles from './styles';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../../redux/actions/message';
import { login } from '../../../redux/actions/auth';
import { Navigate } from 'react-router-dom';

function SignIn(props) {
    //style and validate
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Tài khoản không được để trống'),
        password: Yup.string()
            .required('Mật khẩu không được để trống')
    })
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const classes = useStyles()
    //end style and validate
    //handle Login

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const [messageFalse, setMessageFalse] = useState('')
    const [checkAccount, setCheckAccount] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage()); // clear message when changing location
    }, [dispatch]);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setMessageFalse('')
        errors.username = false
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setMessageFalse('')
        errors.password = false
        setPassword(password);
    };
    const handleLogin = (e) => {
        // e.preventDefault();
        setLoading(true);
        setCheckAccount(true)
        dispatch(login(username, password))
            .then(() => {
                setLoading(true)
                setCheckAccount(true)
            })
            .catch(() => {
                setLoading(false)
                setCheckAccount(false)
            });

    };

    useEffect(() => {
        if (checkAccount === false) setMessageFalse('Tài khoản hoặc mật khẩu không chính xác')
        return () => {

        }
    }, [checkAccount])
    if (isLoggedIn) {
        return <Navigate to="/admin" />;
    }
    //end handle Login
    return (
        <Grid>
            <Paper elevation={10} className={classes.paper}>
                <Grid align='center'>
                    <Avatar className={classes.avatar}><LockOpenOutlined /></Avatar>
                    <h2>Đăng nhập</h2>
                </Grid>
                {messageFalse && (
                    <Typography variant="inherit" color="error">{messageFalse}</Typography>
                )}
                <form >
                    <TextField label='Tài khoản' placeholder='Nhập tài khoản'
                        {...register('username')} error={errors.username ? true : false}
                        margin="normal" fullWidth required
                        value={username}
                        onChange={onChangeUsername}
                    />
                    <Typography variant="inherit" color="error">{errors.username ? errors.username.message : ''}</Typography>


                    <TextField label='Mật khẩu' placeholder='Nhập mật khẩu' type='password'
                        {...register('password')} error={errors.password ? true : false}
                        margin="normal" fullWidth required
                        value={password}
                        onChange={onChangePassword}
                    />
                    <Typography variant="inherit" color="error">{errors.password ? errors.password.message : ''}</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Nhớ mật khẩu"
                    />
                    <Button type='submit' variant="contained" className={classes.btn} fullWidth onClick={handleSubmit(handleLogin)} >
                        Đăng nhập
                    </Button>

                </form>
                <Typography mt={2} >
                    <Link to="#" className={classes.register}>
                        Quên mật khẩu ?
                    </Link>
                </Typography>
                <Typography mt={2}> Chưa có tài khoản ?
                    <Link to="#" className={classes.register}>
                        Đăng ký
                    </Link>
                </Typography>
            </Paper>
        </Grid >
    )
}

export default SignIn;