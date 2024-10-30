import { useRef } from "react";

let slideShowSources = ["../assets/finance.jpeg", "../assets/calculator.jpg"];

export default function Home() {
  let imgIndex = 0;
  const imgRef = useRef(null);
  function slideShow() {
    const img = imgRef.current; img.src = slideShowSources[imgIndex]; imgIndex = ((imgIndex + 1) % slideShowSources.length);
  }

  return (
    <>
      <section className="hero">
        <div className="hero-div">
          <div className="container grid">
            <div className="container grid-item-div">
              <img
                src="../assets/finance.jpeg"
                alt=""
                className="hero-img container"
                ref={imgRef}
                onLoad={()=>{
                  setInterval(slideShow, 3000)
                }}
              />
            </div>
            <div className="container grid-item-div">
              <p className="hero-text container">This is a description</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
