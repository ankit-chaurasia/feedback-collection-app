import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import ResponsiveContainer from '../../components/responsive-container';

const Landing = () => (
  <ResponsiveContainer>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as="h3" style={{ fontSize: '2em' }}>
            We Help Companies and Companions
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            We can give your company a platform to get feedback from your live
            users. You can then check number of likes and dislikes by sending
            surveys and based on that improve your aplication.
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </ResponsiveContainer>
);

export default Landing;
