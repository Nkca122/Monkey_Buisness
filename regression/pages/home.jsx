import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { read, utils } from "xlsx";
import axios from "axios";
import { json } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";

export default function Home() {
  let [data, setData] = useState(null);
  let [model, setModel] = useState(null);
  let [numData, setNumData] = useState({});
  let [prediction, setPrediction] = useState(null);
  let vectors = useRef([]);
  let x_df = useRef([]);
  let y_df = useRef([]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setNumData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {}, [data]);

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
              setData(null);
              setModel(null);
              setNumData({});
              vectors.current = {};
              let file = event.target.files[0];
              if (file) {
                let jsonData = null;
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = async (e) => {
                  let data = e.target.result;
                  let workbook = read(data, { type: "binary" });

                  let rowObject = utils.sheet_to_row_object_array(
                    workbook.Sheets[workbook.SheetNames[0]]
                  );
                  jsonData = JSON.stringify(rowObject, undefined);
                  let d = [...(await JSON.parse(jsonData))];
                  setData(d);
                };
              }
            }}
            accept=".xlsx, .xls"
          />
        </div>
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data ? (
          <div
            style={{
              width: "100%",
              display: "grid",
              gap: "1em",
              gridTemplateColumns: "repeat(auto-fit, 320px)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={async (event) => {
                vectors.current = [];
                x_df.current = [];
                y_df.current = [];
                let form = event.target;
                let submitBtn = form.querySelector('input[type="submit"]');
                submitBtn.setAttribute("disabled", true);
                let checkboxes = form.querySelectorAll(
                  'input[type="checkbox"]:checked'
                );
                checkboxes.forEach((checkbox) => {
                  vectors.current.push(checkbox.value);
                });

                data.forEach((obj) => {
                  let vec = [];
                  Object.entries(obj).map((entry) => {
                    if (
                      vectors.current.findIndex((el) => el == entry[0]) != -1
                    ) {
                      vec.push(entry[1]);
                    }
                  });
                  x_df.current.push(vec);
                });

                let _class = form.querySelector("select").value;

                data.forEach((obj) => {
                  Object.entries(obj).map((entry) => {
                    if (entry[0] == _class) {
                      y_df.current.push([entry[1]]);
                    }
                  });
                });

                axios
                  .post("http://localhost:3000/train", {
                    x_df: x_df.current,
                    y_df: y_df.current,
                  })
                  .then((res) => {
                    console.log(res.data);
                    setModel(res.data.lgModel);
                  })
                  .catch((err) => {
                    console.log(err);
                    submitBtn.setAttribute("disabled", false);
                  });
                event.preventDefault();
              }}
              style={{
                width: "320px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <fieldset
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
                  border: "none",
                  borderBottom: "0.25px solid var(--white)",
                }}
              >
                <legend
                  style={{
                    width: "100%",
                    fontSize: "0.95rem",
                    padding: "var(--padding)",
                    backgroundColor: "var(--primary-dark)",
                    fontWeight: "var(--bold)",
                    textAlign: "center",
                    border: "0.25px solid var(--white)",
                  }}
                >
                  Please Select the fields You want the model to be trained on
                </legend>
                {Object.entries(data[0]).map((entry) => {
                  if (typeof entry[1] == "number") {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            padding: "var(--padding)",
                            justifyContent: "space-between",
                            borderLeft: "0.25px solid var(--white)",
                            borderRight: "0.25px solid var(--white)",
                          }}
                        >
                          <label
                            htmlFor={entry[0]}
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: "var(--bold)",
                              color: "var(--black)",
                            }}
                          >
                            {entry[0]}
                          </label>
                          <input
                            value={entry[0]}
                            id={entry[0]}
                            key={entry[0]}
                            type="checkbox"
                          />
                        </div>
                      </>
                    );
                  } else null;
                })}
              </fieldset>

              <label
                htmlFor="_class"
                style={{
                  color: "var(--white)",
                  fontWeight: "var(--bold)",
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}
                className="container"
              >
                Select What You Want to Predict
              </label>
              <select
                defaultValue={Object.entries(data[0])[0][0]}
                id="_class"
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "var(--primary-dark)",
                  border: "1px solid var(--black)",
                  margin: "var(--margin)",
                }}
                className="container"
              >
                {Object.entries(data[0]).map((entry) => {
                  if (typeof entry[1] == "number") {
                    return (
                      <>
                        <option value={entry[0]} id={entry[0]} key={entry[0]}>
                          {entry[0].toUpperCase()}
                        </option>
                      </>
                    );
                  } else null;
                })}
              </select>
              {!model ? (
                <input
                  type="submit"
                  value={"Create Model"}
                  id=""
                  style={{
                    border: "1px solid var(--black)",
                  }}
                  className="container"
                />
              ) : null}
            </form>

            <form
              onSubmit={(event) => {
                let form = event.target;
                let inputs = form.querySelectorAll('input[type="number"]');
                let val = [];
                inputs.forEach((inp) => {
                  val.push(inp.value);
                });
                console.log(inputs, val);
                axios
                  .post("http://localhost:3000/predict", {
                    val: [val],
                  })
                  .then((res) => setPrediction(res.data.prediction[0][0]))
                  .catch((err) => console.log(err));
                event.preventDefault();
              }}
              style={{
                width: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "0.85rem",
                color: "var(--black)",
              }}
              className="container"
            >
              {model ? (
                <>
                  <p>Enter the Values For Prediction</p>
                  {vectors.current.map((vec) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "center",
                            marginTop: "var(--margin)",
                          }}
                        >
                          <label
                            htmlFor={vec}
                            style={{
                              fontSize: "0.65rem",
                            }}
                          >
                            {vec.toUpperCase() + " *"}
                          </label>
                          <input
                            type="number"
                            name={vec}
                            id={vec}
                            key={vec}
                            value={numData[vec]}
                            onChange={handleOnchange}
                            required={true}
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      </>
                    );
                  })}
                  <input
                    type="submit"
                    value={"Predict"}
                    className="container"
                    style={{
                      border: "1px solid var(--black)",
                      marginTop: "var(--margin)",
                    }}
                  />
                </>
              ) : null}
            </form>
            {prediction ? (
              <div>
                <p style={{
                  color: 'var(--black)',
                  fontSize: '0.85rem'
                }} className="container"><b>
                  The Prediction: </b>{prediction}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </>
  );
}
