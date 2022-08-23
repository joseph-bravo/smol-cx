import { ShortenedLink } from 'interfaces';
import { Card } from 'react-bootstrap';
import { AliasButton } from './AliasButton';

export function aliasToClipboard(alias: string) {
  const url = `smol.cx/${alias}`;
  navigator.clipboard.writeText(url);
}

const LinkList = (props: { links: ShortenedLink[] }) => {
  const links: ShortenedLink[] = props.links ? props.links : [];
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Table of Generated <i>smol</i> Links
        </Card.Title>
        <Card.Subtitle className="pb-2">
          Total Links: {links.length}
        </Card.Subtitle>
        <p className="mb-1">
          Click on an <i>Alias</i> to copy the link to clipboard!
        </p>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Destination URL</th>
            </tr>
          </thead>
          <tbody>
            {links.map(link => (
              <tr key={link.alias}>
                <td className="col-2">
                  <AliasButton link={link} />
                </td>
                <td className="col-10 text-break">{link.destination_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};
export default LinkList;
