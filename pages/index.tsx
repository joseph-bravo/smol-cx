import { Container, Row, Col } from 'react-bootstrap';
import LinkGenerator from 'components/LinkGenerator';
import LinkList from 'components/LinkList';

const Home = () => {
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
          <LinkList links={[]} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
