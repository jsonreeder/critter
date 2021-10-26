import { Box, Grommet } from 'grommet';
import React from 'react';

function App() {
  return (
    <Grommet plain full>
      <Box fill align="center" justify="center">
        <Box
          height="xsmall"
          width="xsmall"
          align="center"
          justify="center"
          background="brand"
          round="xlarge"
          animation="pulse"
        />
      </Box>
    </Grommet>
  );
}

export default App;
