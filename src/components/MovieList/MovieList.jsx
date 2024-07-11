import { Link, useLocation } from 'react-router-dom';

export default function Movielist({ lists }) {
  const location = useLocation();
  console.log('🚀 ~ Movielist ~ location:', location);
  return (
    <ul>
      {lists &&
        lists.map(list => (
          <li key={list.id}>
            <Link to={`/movies/${list.id}`} state={location}>
              {list.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
