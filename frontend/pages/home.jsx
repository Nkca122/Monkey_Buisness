import SlideShow from "../components/slideshow";
import Card from "../components/card";
import { useRef } from "react";

let slideShowSources = ["../assets/finance.jpg", "../assets/calculator.jpg"];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-div">
          <div className="container grid">
            <div className="container grid-item-div">
              <SlideShow slides={slideShowSources} />
            </div>
            <div className="container grid-item-div hero-text-div">
              <div className="hero-border-div">
                <img
                  src="../assets/circle-solid.svg"
                  alt=""
                  className="hero-border-solid"
                />
                <img
                  src="../assets/circle-outline.svg"
                  alt=""
                  className="hero-border-outline"
                />
              </div>
              <p className="hero-text container">
                <b>
                  <a href="#">Monkey Buisness</a>
                </b>
                Here to help <b>Start-ups & Growing Businesses</b>Make
                data-driven decisions, optimize cash flow, and keep
                profitability on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="analyze">
        <div className="analyze-curve-top">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="analyze-div">
          <div className="grid container">
            <div className="grid-item-div">
              <h1>Analyze, Observe, Decide</h1>
              <p>
                Using our analysis tool, observe the trends and decide on your
                next actions
              </p>
            </div>
            <div className="grid-item-div">
              <img src="../assets/graph.png" alt="" />
            </div>
          </div>
        </div>
        <div className="analyze-curve-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      <section className="tools">
        <div className="tools-div">
          <h1>The Collection</h1>
          <div className="container card-grid">
            <Card
              img={"../assets/calculator.jpg"}
              heading={"Monkey-Graph"}
              description={
                "A Tool for performing Graphical Analysis on Reports"
              }
              link={"/f"}
            />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </>
  );
}
