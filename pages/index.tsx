import { Container, Row, Col } from 'react-bootstrap';
import LinkGenerator from 'components/LinkGenerator';
import LinkList from 'components/LinkList';
import useSWR from 'swr';
import axios from 'axios';

const Home = () => {
  const { data, error } = useSWR('/api/link', url =>
    axios(url).then(res => res.data)
  );
  return (
    <Container>
      <Row>
        <Col className="py-5">
          <h1>smol.cx</h1>
          <LinkGenerator />
        </Col>
      </Row>
      <Row>
        <Col>
          <LinkList links={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
