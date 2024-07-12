import { Link, useLocation } from 'react-router-dom';
import { IoArrowUndoOutline } from 'react-icons/io5';
import css from './GoBack.module.css';
import { useRef } from 'react';

export default function GoBack() {
  const location = useLocation();
  console.log('🚀 ~ GoBack ~ location:', location);
  const backLinkRef = useRef(location.state ?? '/');
  console.log('🚀 ~ GoBack ~ backLinkRef:', backLinkRef);
  return (
    <div className={css.linkBtn}>
      <Link className={css.link} to={backLinkRef.current}>
        <IoArrowUndoOutline className={css.icon} size={25} />
        Go Back
      </Link>
    </div>
  );
}
