import { Link } from 'react-router-dom';

import { ChevronLeft } from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import type { CardProps } from '@components/material.js';
import {
  Box,
  Button,
  CardContent,
  Card as MuiCard,
  styled,
  TextField,
  Typography,
  useTheme
} from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';

import AuthIllustrationV1Wrapper from '@src/views/pages/auth/AuthIllustrationV1Wrapper.js';

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.primary.main,
  display: 'flex',
  fontSize: theme.typography.body1.fontSize,
  justifyContent: 'center',
  textDecoration: 'none'
}));

const ForgotPasswordV1: PageComponent = () => {
  const theme = useTheme();

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
                Forgot Password? 🔒
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your email and we&prime;ll send you instructions to reset
                your password
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
                label="Email"
                placeholder="john.doe@gmail.com"
                sx={{ display: 'flex', mb: 4 }}
                type="email" />
              <Button
                fullWidth={true}
                sx={{ mb: 4 }}
                type="submit"
                variant="contained"
              >
                Send reset link
              </Button>
              <Typography
                sx={{
                  '& svg': { mr: 1 },
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <LinkStyled to="/pages/auth/login-v1">
                  <ChevronLeft />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  );
};

ForgotPasswordV1.layout = 'blank';
ForgotPasswordV1.displayName = 'ForgotPasswordV1';
export default ForgotPasswordV1;
