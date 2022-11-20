import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from './Login.module.css'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../components/Nav/Header"
import Linker from "next/link"
import {useRouter} from "next/router"
import {useState} from "react"
import apiClient from "../services/apiClient"
import "../components/Game.module.css"


//import {useNavigation} from '@react-navigation/native';
//import {StackNavigationProp} from '@react-navigation/stack';
//import {RootStackParamList} from '../RootStackParams';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Numble
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [form, setForm]  = useState({
    email : "",
    password : "",
  })

  const [errors, setErrors] = useState({
    password : "",
    email : "",
    form : "",
  });
  const [isLoading, setIsLoading] = useState(false)


 

  const router = useRouter()

  const handleOnChange = (event : any) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") < 1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: "" }));
      }
    }

    if (event.target.name === "password") {
      if (event.target.value.length < 1) {
        setErrors((e) => ({ ...e, password: "Please enter your password." }));
      } else {
        setErrors((e) => ({ ...e, password: "" }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));

  }

  const handleOnSubmit = async (e : any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: "" }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setIsLoading(false);
      setErrors((e) => ({ ...e, form: error }));
    }

    if (data?.user) {

      setIsLoading(false);
     
      apiClient.setToken(data.token);
      setIsLoading(false);
      router.push("/")
     
    }
  };

 

  
 
  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errors.form != "" && <span className={styles.error}>{errors.form}</span>}
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleOnChange}
              autoFocus
            />
            {errors.email != "" && <span className={styles.error}>{errors.email}</span>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleOnChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password != "" && (
                <span className={styles.error}>{errors.password}</span>
              )}
           
            
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={handleOnSubmit}
              
            
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? "Loading...." : "Sign In"}
            </Button>
           
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}