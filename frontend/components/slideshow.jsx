import { useRef, useState } from "react";

export default function SlideShow(props) {
  let slideShowSources = props.slides;
  let [i, setI] = useState(0);
  

  let imgRef = useRef(null);
  const slideShow = () => {
    const img = imgRef.current;
    if (!img || !slideShowSources || !slideShowSources.length) return;
    else {
      img.src = slideShowSources[i];
      setI((i + 1) % slideShowSources.length);
    }
  };

  return (
    <>
      <div className="slideshow-div">
        <div className="hero-img-div">
          <img
            src="../assets/finance.jpg"
            alt=""
            className="hero-img"
            ref={imgRef}
            onLoad={() => {
              setTimeout(slideShow, 3000);
            }}
          />
        </div>
      </div>
    </>
  );
}
