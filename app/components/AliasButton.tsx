import { ShortenedLink } from 'interfaces';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { aliasToClipboard } from './LinkList';

export const AliasButton = (props: { link: ShortenedLink }) => {
  const {
    link: { alias }
  } = props;
  const [text, setText] = useState(alias);
  const timeoutId = useRef(null);

  const onClick = () => {
    aliasToClipboard(alias);
    setText('link copied!');
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setText(alias);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <Button className="w-100" variant="light" size="sm" onClick={onClick}>
      {text}
    </Button>
  );
};
