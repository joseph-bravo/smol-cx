import { Container, Button, Stack } from 'react-bootstrap';
import LinkGenerator from 'components/LinkGenerator';
import LinkList from 'components/LinkList';
import useSWR from 'swr';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

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
        <Stack gap={4}>
          <div>
            <h1 className="display-1 text-center mt-3 mb-5">
              <i>smol</i>.cx
            </h1>
            <LinkGenerator />
          </div>
          <hr />
          <LinkList links={data} />
          <hr />
          <footer className="mx-auto">
            <Link href="https://github.com/smolcx/app">
              <Button size="lg" variant="secondary">
                <i className="fa-brands fa-github me-3"></i>GitHub Repo
              </Button>
            </Link>
          </footer>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
