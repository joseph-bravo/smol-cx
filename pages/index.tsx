import { Container, Row, Col, Stack } from 'react-bootstrap';
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
      <Container>
        <Stack className="pb-5" gap={4}>
          <div>
            <h1 className="display-1 text-center mt-3 mb-5">
              <i>smol</i>.cx
            </h1>
            <i className="bi bi-clipboard"></i>
            <LinkGenerator />
          </div>
          <hr />
          <LinkList links={data} />
        </Stack>
      </Container>
    </>
  );
};

export default Home;
