import { Container, Row, Col } from 'react-bootstrap';
import LinkGenerator from 'components/LinkGenerator';
import LinkList from 'components/LinkList';
import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';

const Home = () => {
  const { data } = useSWR('/api/links', url =>
    axios(url).then(res => res.data)
  );
  return (
    <>
      <Head>
        <title>smol.cx | Link Shortener</title>
      </Head>
      <Container className="pb-5">
        <Row>
          <Col className="py-5">
            <h1 className="display-1 text-center mb-5">
              <i>smol</i>.cx
            </h1>
            <i className="bi bi-clipboard"></i>
            <LinkGenerator />
          </Col>
        </Row>
        <Row>
          <Col>
            <LinkList links={data} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
