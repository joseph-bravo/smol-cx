import { ShortenedLink } from 'interfaces';
import { Table } from 'react-bootstrap';

const LinkList = (props: { links: ShortenedLink[] }) => {
  const links = props.links ? props.links : [];
  return (
    <Table striped hover responsive bordered>
      <thead>
        <tr>
          <th>Alias</th>
          <th>Destination URL</th>
        </tr>
      </thead>
      <tbody>
        {links.map(link => (
          <tr key={link.alias}>
            <td>{link.alias}</td>
            <td>{link.destination_url}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default LinkList;
