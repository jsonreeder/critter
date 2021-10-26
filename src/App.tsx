import { Box, Grommet } from 'grommet';
import { useSpring, animated } from 'react-spring';

import React from 'react';

function App() {
  const styles = useSpring({
    loop: { reverse: true },
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <Grommet plain full>
      <Box fill align="center" justify="center">
        <animated.div
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#46e891',
            borderRadius: 16,
            ...styles,
          }}
        />
      </Box>
    </Grommet>
  );
}

export default App;
