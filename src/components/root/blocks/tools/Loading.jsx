//styles
import '../../../../assets/scss/components/root/blocks/tools/_loader.scss';

import { useEffect } from "react";

function Loading () {
  
  useEffect(() => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
  })
  
  return (
    <>
      <div className="loader">
      </div>
      <p className='loader__text'>Loading..</p>
    </>
  );
}

export default Loading;