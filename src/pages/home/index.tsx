import type { PageComponent } from '@nxweb/react';

import { Card, CardContent, CardHeader, Grid, Typography } from '@components/material.js';

import { getBooks } from '@api/clients/products';

const Home: PageComponent = () => {
  getBooks();

  return (
    <Grid container={true} spacing={6}>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="Kick start your project 🚀" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="ACL and JWT 🔒" />
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are implemented in the starter-kit as well.
            </Typography>
            <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;
