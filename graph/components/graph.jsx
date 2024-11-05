import { useEffect, useRef, useState } from "react";
import { drawGraph, resizeCanvas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Graph(props) {
  let data = props.data;
  let id = props.id;
  let graphRef = useRef(null);

  let [labels, setLabels] = useState(undefined);
  let [values, setValues] = useState(undefined);
  let [dimesions, setDimension] = useState({
    width: window.innerWidth - 150,
  });
  let [type, setType] = useState("bar");
  let chartRef = useRef(null);
  useEffect(() => {
    resizeCanvas(graphRef);
    drawGraph(graphRef, chartRef, labels, values, type);

    function handleResize() {
      setDimension({
        width: window.innerWidth - 150,
      });
    }

    window.addEventListener("resize", () => {
      handleResize();
    });
    return window.removeEventListener("resize", () => {
      handleResize();
    });
  }, [labels, values, type]);

  return (
    <>
      <div className="graph-component">
        <div className="graph-container">
          <canvas ref={graphRef} className="graph" id={id} />
        </div>
        <div className="graph-form-container">
          <form action="" className="graph-select-form">
            <div>
              <p>Label</p>
              <select
                name="x"
                id="x"
                onChange={(event) => {
                  let target = event.target;
                  let option = target.options[target.selectedIndex].value;
                  let x_df = [];
                  data.forEach((el) => {
                    x_df.push(el[`${option}`]);
                  });

                  setLabels(x_df);
                }}
                defaultValue={Object.entries(data[0])[0][0]}
              >
                <optgroup label={"Set The Labels"}>
                  {data
                    ? Object.entries(data[0]).map((entry) => {
                        return (
                          <option value={entry[0]} key={entry}>
                            {entry[0].toUpperCase()}
                          </option>
                        );
                      })
                    : null}
                </optgroup>
              </select>
            </div>
            <div>
              <p>Qty. </p>
              <select
                name="y"
                id="y"
                onChange={(event) => {
                  let target = event.target;
                  let option = target.options[target.selectedIndex].value;
                  
                  let y_df = [];
                  data.forEach((el) => {
                    y_df.push(el[`${option}`]);
                  });

                  setValues(y_df);
                }}
                defaultValue={Object.entries(data[0])[0][0]}
              >
                <optgroup label={"Set The Quantity"}>
                  {data
                    ? Object.entries(data[0]).map((entry) => {
                        return (
                          <option value={entry[0]} key={entry}>
                            {entry[0].toUpperCase()}
                          </option>
                        );
                      })
                    : null}
                </optgroup>
              </select>
            </div>
            <div>
              <p>Type</p>
              <select
                name=""
                id="graph"
                onFocus={(event) => {
                  event.target.selectedIndex = -1;
                }}
                onChange={(event) => {
                  let target = event.target;
                  let option = target.options[target.selectedIndex].value;
                  setType(option);
                }}
              >
                <optgroup label="Set the Chart">
                  <option value="bar">📊 Bar</option>
                  <option value="line">📈 Line</option>
                  <option value="doughnut">⭕ Pie</option>
                </optgroup>
              </select>
            </div>
          </form>
          <form action="" className="graph-form">
            <div>
              <p>Title</p>
              <input type="text" id="title" name="title" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function GraphDiv(props) {
  let data = props.data;
  let [graphList, setGraphList] = useState([]);
  let graphCt = useRef(0);
  const onBtnClick = () => {
    setGraphList(
      graphList.concat(
        <div
          style={{
            display: "block",
          }}
          key={"div" + graphCt.current}
          id={"div" + graphCt.current}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "var(--padding)",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff",
            }}
          >
            <button
              id={graphCt.current}
              onClick={(event) => {
                let btn = event.target;
                let id = btn.id;
                for (let _id in Chart.instances) {
                  let chart = Chart.instances[_id];
                  if (chart.canvas.id == `graph${id}`) {
                    chart.destroy();
                  }
                }

                let graphDiv = document.getElementById(`div${id}`);
                graphDiv.remove();
              }}
            >
              Delete
            </button>
            <button
              id={graphCt.current}
              onClick={(event) => {
                let btn = event.target;
                let id = btn.id;
                for (let _id in Chart.instances) {
                  let chart = Chart.instances[_id];
                  if (chart.canvas.id == `graph${id}`) {
                    chart.destroy();
                  }
                }
              }}
            >
              Clear
            </button>
          </div>
          <Graph
            data={data}
            key={"graph" + graphCt.current}
            id={"graph" + graphCt.current}
          />
        </div>
      )
    );

    graphCt.current++;
  };
  return (
    <>
      <div className="graph-grid">
        {graphList}
        <div className="grid-item-div add-graph-btn-div">
          <button onClick={onBtnClick} className="add-graph-btn">
            <FontAwesomeIcon icon={faPlus} size="5x" color="var(--black)" />
          </button>
        </div>
      </div>
    </>
  );
}
