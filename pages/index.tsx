import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>hi there!</h1>
      <h2>Count: {count}</h2>
      <Button onClick={() => setCount(count + 1)} variant="primary">
        Click Me!
      </Button>
    </div>
  );
};

export default Home;
