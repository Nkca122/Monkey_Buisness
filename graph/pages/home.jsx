import {
  cloneElement,
  useEffect,
  useState,
  useRef,
  createElement,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import GraphDiv from "../components/graph";
import { read, utils } from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function PrintDiv(props) {
  useEffect(() => {
    console.log(props.graphDiv);
  }, []);
  return (
    <div
      style={{
        visibility: "hidden",
      }}
    ></div>
  );
}

export default function Home() {
  let [data, setData] = useState(null);
  let printRef = useRef(null);
  let graphDivRef = useRef(null);

  return (
    <>
      <section className="hero">
        <div className="hero-div">
          <label htmlFor="xlsx" id="xlsx-label">
            <div className="hero-border-div" />
            <p>
              <FontAwesomeIcon
                icon={faFile}
                size="3x"
                color="var(--contrast)"
              />
              Upload Your .xlsx file
            </p>
          </label>
          <input
            type="file"
            name="xlsx"
            id="xlsx"
            onChange={async (event) => {
              let file = event.target.files[0];
              if (file) {
                let jsonData = null;
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = async (e) => {
                  let data = e.target.result;
                  let workbook = read(data, { type: "binary" });

                  workbook.SheetNames.forEach((el) => {
                    let rowObject = utils.sheet_to_row_object_array(
                      workbook.Sheets[el]
                    );
                    jsonData = JSON.stringify(rowObject, undefined);
                  });

                  setData(await JSON.parse(jsonData));
                };
              }
            }}
            accept=".xlsx, .xls"
          />
        </div>
      </section>
      <section id="graph">
        {data ? (
          <>
            <div
              ref={graphDivRef}
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <div ref={printRef}>
                <GraphDiv data={data} />
              </div>
            </div>
            <button
              onClick={() => {
                let input = printRef.current;
                input.childNodes[0].lastChild.style.display = "none";

                html2canvas(input, {
                  scale: 1,
                }).then((canvas) => {
                  let imgData = canvas.toDataURL("image/png");

                  let link = document.createElement("a");
                  link.href = imgData;
                  link.download = "report.png";
                  link.click();
                  link.remove();
                });

                input.childNodes[0].lastChild.style.visibility = "visible";
                input.childNodes[0].lastChild.style.display = "flex";
              }}
            >
              Generate PDF
            </button>
          </>
        ) : null}
      </section>
    </>
  );
}
