import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';
export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <RotatingLines
        visible={true}
        height="86"
        width="86"
        strokeColor="orangered"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
      />
    </div>
  );
}
