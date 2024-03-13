import type { MouseEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
  BrandFacebook,
  BrandGithub,
  BrandGoogle,
  BrandTwitter
} from '@nxweb/icons/tabler';
import type { PageComponent } from '@nxweb/react';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import { useAuth } from '@hooks/use-auth.js';
import { useSettings } from '@hooks/use-settings.js';
import { FooterIllustrations } from '@views/pages/auth/footer-illustration.js';

import loginImageBordered from '@assets/images/pages/auth-v2-login-illustration-bordered-light.png';
import loginImage from '@assets/images/pages/auth-v2-login-illustration-light.png';

const LoginIllustration = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(12),
  marginTop: theme.spacing(12),
  maxHeight: 680,
  zIndex: 2,
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: `${theme.palette.primary.main} !important`,
  textDecoration: 'none'
}));

const getloginImage = (skin: string) => {
  return skin === 'bordered' ? loginImageBordered : loginImage;
};

const LoginPage: PageComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  const { skin } = settings;

  const handleLogin = () => {
    // TODO: redirect to identity provider page instead
    auth.login({ role: 'admin', user: 'admin' }).then(() => {
      const returnURL = params.get('returnUrl');
      const redirectURL = returnURL && returnURL !== '/' ? returnURL : '/';

      navigate(redirectURL, { replace: true });
    });
  };

  return (
    <Box className="content-right" sx={{ backgroundColor: 'background.paper' }}>
      {!hidden
        ? (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'customColors.bodyBg',
            borderRadius: '20px',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            margin: (theme) => theme.spacing(8, 0, 8, 8),
            position: 'relative'
          }}
        >
          <LoginIllustration
            alt="login-illustration"
            src={getloginImage(skin)} />
          <FooterIllustrations />
        </Box>
        )
        : null}
      <RightWrapper>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            p: [6, 12]
          }}
        >
          <Box sx={{ maxWidth: 400, width: '100%' }}>
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
            <Box sx={{ my: 6 }}>
              <Typography sx={{ mb: 1.5 }} variant="h3">
                {`Welcome to ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>

            <Button
              fullWidth={true}
              sx={{ mb: 4 }}
              type="submit"
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Stack
              alignItems="center"
              direction="row"
              divider={<Divider flexItem={true} orientation="vertical" />}
              justifyContent="center"
              spacing={2}
            >
              <Typography component={LinkStyled} to="/forgot-password">
                Forgot Password?
              </Typography>
              <Typography component={LinkStyled} to="/register">
                Create an account
              </Typography>
            </Stack>
            <Divider
              sx={{
                color: 'text.disabled',
                fontSize: theme.typography.body2.fontSize,
                my: (theme) => `${theme.spacing(6)} !important`,

                '& .MuiDivider-wrapper': { px: 6 }
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
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandFacebook />
              </IconButton>
              <IconButton
                component={Link}
                sx={{ color: '#1da1f2' }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandTwitter />
              </IconButton>
              <IconButton
                component={Link}
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? '#272727' : 'grey.300')
                }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandGithub />
              </IconButton>
              <IconButton
                component={Link}
                sx={{ color: '#db4437' }}
                to="/"
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <BrandGoogle />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

LoginPage.auth = false;
LoginPage.displayName = 'LoginPage';
LoginPage.guest = true;
LoginPage.layout = 'blank';
LoginPage.meta = { acl: { guest: true } };

export default LoginPage;
