import { Link, useLocation } from 'react-router-dom';
import { IoArrowUndoOutline } from 'react-icons/io5';
import css from './GoBack.module.css';
import { useRef } from 'react';

export default function GoBack() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');
  return (
    <div className={css.linkBtn}>
      <Link className={css.link} to={backLinkRef.current}>
        <IoArrowUndoOutline className={css.icon} size={25} />
        Go Back
      </Link>
    </div>
  );
}
