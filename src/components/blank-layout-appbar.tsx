import { Link } from 'react-router-dom';

import { AppBar, styled, Toolbar, Typography, useTheme } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import { useSettings } from '@hooks/use-settings.js';

const LinkStyled = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginRight: theme.spacing(8),
  textDecoration: 'none'
}));

const BlankLayoutAppBar = () => {
  // ** Hooks & Vars
  const theme = useTheme();
  const { settings } = useSettings();
  const { skin } = settings;

  return (
    <AppBar
      color="default"
      elevation={skin === 'bordered' ? 0 : 3}
      position="sticky"
      sx={{
        backgroundColor: 'background.paper',
        ...skin === 'bordered' && { borderBottom: `1px solid ${theme.palette.divider}` }
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: `${(theme.mixins.toolbar.minHeight as number) - (skin === 'bordered' ? 1 : 0)}px !important`,
          p: (theme) => `${theme.spacing(0, 6)} !important`
        }}
      >
        <LinkStyled to="/">
          <svg fill="none" viewBox="0 0 32 22" width={34} xmlns="http://www.w3.org/2000/svg">
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
          <Typography
            sx={{
              fontWeight: 700,
              lineHeight: '24px',
              ml: 2.5
            }}
            variant="h4"
          >
            {themeConfig.templateName}
          </Typography>
        </LinkStyled>
      </Toolbar>
    </AppBar>
  );
};

BlankLayoutAppBar.displayName = 'BlankLayoutAppBar';

export { BlankLayoutAppBar };
