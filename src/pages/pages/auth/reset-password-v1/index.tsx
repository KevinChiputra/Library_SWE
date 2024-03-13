import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ChevronLeft, Eye, EyeOff } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import type { CardProps } from '@components/material.js';
import {
  Box,
  Button,
  CardContent,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  styled,
  TextField,
  Typography,
  useTheme
} from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';

import AuthIllustrationV1Wrapper from '@src/views/pages/auth/AuthIllustrationV1Wrapper.js';

interface State {
  confirmNewPassword: string
  newPassword: string
  showConfirmNewPassword: boolean
  showNewPassword: boolean
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  color: `${theme.palette.primary.main} !important`,
  display: 'flex',
  justifyContent: 'center',
  textDecoration: 'none'
}));

const ResetPasswordV1: PageComponent = () => {
  const [values, setValues] = useState<State>({
    confirmNewPassword: '',
    newPassword: '',
    showConfirmNewPassword: false,
    showNewPassword: false
  });

  const theme = useTheme();

  const handleNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowConfirmNewPassword = () => {
    setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword
    });
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
                Reset Password 🔒
              </Typography>
              <Typography sx={{ display: 'flex' }}>
                for{' '}
                <Typography component="span" sx={{ fontWeight: 500, ml: 1 }}>
                  john.doe@email.com
                </Typography>
              </Typography>
            </Box>
            <form
              autoComplete="off"
              noValidate={true}
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {values.showNewPassword ? <Eye /> : <EyeOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                autoFocus={true}
                fullWidth={true}
                id="auth-reset-password-new-password"
                label="New Password"
                placeholder="············"
                sx={{ display: 'flex', mb: 4 }}
                type={values.showNewPassword ? 'text' : 'password'}
                value={values.newPassword}
                onChange={handleNewPasswordChange('newPassword')} />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {values.showConfirmNewPassword ? <Eye /> : <EyeOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                fullWidth={true}
                id="auth-reset-password-confirm-password"
                label="Confirm Password"
                placeholder="············"
                sx={{ display: 'flex', mb: 4 }}
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                value={values.confirmNewPassword}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')} />
              <Button
                fullWidth={true}
                sx={{ mb: 4 }}
                type="submit"
                variant="contained"
              >
                Set New Password
              </Button>
              <Typography
                sx={{
                  '& svg': { mr: 1 },
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Typography component={LinkStyled} to="/pages/auth/login-v1">
                  <ChevronLeft />
                  <span>Back to login</span>
                </Typography>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  );
};

ResetPasswordV1.layout = 'blank';
ResetPasswordV1.displayName = 'ResetPasswordV1';
export default ResetPasswordV1;
