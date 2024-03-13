import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  BrandFacebook,
  BrandGithub,
  BrandGoogle,
  BrandTwitter,
  Eye,
  EyeOff
} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import type { CardProps, FormControlLabelProps } from '@components/material.js';
import {
  Box,
  Button,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  FormControlLabel as MuiFormControlLabel,
  styled,
  TextField,
  Typography,
  useTheme
} from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';

import AuthIllustrationV1Wrapper from '@src/views/pages/auth/AuthIllustrationV1Wrapper.js';

interface State {
  password: string
  showPassword: boolean
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: 'none'
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      color: theme.palette.text.secondary
    }
  })
);

const LoginV1: PageComponent = () => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });

  const theme = useTheme();

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Box className="content-center">
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent
            sx={{ p: (theme) => `${theme.spacing(10.5, 8, 8)} !important` }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mb: 8
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 32 22"
                width={34}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                  fill={theme.palette.primary.main}
                  fillRule="evenodd" />
                <path
                  clipRule="evenodd"
                  d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                  fill="#161616"
                  fillRule="evenodd"
                  opacity={0.06} />
                <path
                  clipRule="evenodd"
                  d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                  fill="#161616"
                  fillRule="evenodd"
                  opacity={0.06} />
                <path
                  clipRule="evenodd"
                  d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                  fill={theme.palette.primary.main}
                  fillRule="evenodd" />
              </svg>
              <Typography sx={{ fontWeight: 700, ml: 2.5 }} variant="h3">
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography sx={{ mb: 1.5 }} variant="h4">
                {`Welcome to ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form
              autoComplete="off"
              noValidate={true}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                autoFocus={true}
                fullWidth={true}
                id="email"
                label="Email"
                placeholder="john.doe@gmail.com"
                sx={{ mb: 4 }} />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {values.showPassword ? <Eye /> : <EyeOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                fullWidth={true}
                id="auth-login-password"
                label="Password"
                placeholder="············"
                sx={{ mb: 1.5 }}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')} />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  mb: 1.75
                }}
              >
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <Typography
                  component={LinkStyled}
                  to="/pages/auth/forgot-password-v1"
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Button
                fullWidth={true}
                sx={{ mb: 4 }}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>
                  New on our platform?
                </Typography>
                <Typography component={LinkStyled} to="/pages/auth/register-v1">
                  Create an account
                </Typography>
              </Box>
              <Divider
                sx={{
                  '& .MuiDivider-wrapper': { px: 6 },
                  color: 'text.disabled',
                  fontSize: theme.typography.body2.fontSize,
                  my: (theme) => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <IconButton
                  component={Link}
                  sx={{ color: '#497ce2' }}
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <BrandFacebook />
                </IconButton>
                <IconButton
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <BrandTwitter />
                </IconButton>
                <IconButton
                  component={Link}
                  sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#272727' : 'grey.300')
                  }}
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <BrandGithub />
                </IconButton>
                <IconButton
                  component={Link}
                  sx={{ color: '#db4437' }}
                  to="/"
                  onClick={(e) => e.preventDefault()}
                >
                  <BrandGoogle />
                </IconButton>
              </Box>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  );
};

LoginV1.layout = 'blank';
LoginV1.displayName = 'LoginV1';

export default LoginV1;
