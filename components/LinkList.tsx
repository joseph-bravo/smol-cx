import { ShortenedLink } from 'interfaces';

const LinkList = (props: { links: ShortenedLink[] }) => {
  const links: ShortenedLink[] = props.links ? props.links : [];
  return (
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
            <td className="col-2">{link.alias}</td>
            <td className="col-10 text-break">{link.destination_url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default LinkList;
