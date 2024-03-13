import { Link } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import type { CardProps } from '@components/material.js';
import {
  Box,
  Button,
  CardContent,
  Card as MuiCard,
  styled,
  Typography,
  useTheme
} from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';

import AuthIllustrationV1Wrapper from '@src/views/pages/auth/AuthIllustrationV1Wrapper.js';

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: 'none'
}));

const VerifyEmailV1: PageComponent = () => {
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
                Verify your email ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Account activation link sent to your email address:
                hello@example.com Please follow the link inside to continue.
              </Typography>
            </Box>
            <Button fullWidth={true} variant="contained">
              Skip for now
            </Button>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>
                Didn&apos;t get the mail?
              </Typography>
              <Typography
                component={LinkStyled}
                sx={{ ml: 1 }}
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                Resend
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  );
};

VerifyEmailV1.layout = 'blank';
VerifyEmailV1.displayName = 'VerifyEmailV1';
export default VerifyEmailV1;
