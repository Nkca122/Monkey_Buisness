const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;
};

export const resizeCanvas = (canvasRef) => {
  let ctx = canvasRef.current.getContext("2d");
  ctx.canvas.width = 320;
  ctx.canvas.height = 320;
};

export const drawGraph = (
  canvasRef,
  chart,
  labels = undefined,
  data = undefined,
  type = "bar",
  legend = ""
) => {
  let canvas = canvasRef.current;
  let ctx = canvas.getContext("2d");

  if (chart.current) {
    chart.current.destroy();
  }
  if (labels && data) {
    let dataObj = {};
    for (let i = 0; i < labels.length; i++) {
      if (!dataObj[labels[i]]) dataObj[labels[i]] = data[i];
      else {
        dataObj[labels[i]] += data[i];
      }
    }
    let bgColors = [];
    let _labels = [];
    let _data = [];

    for (const key in dataObj) {
      bgColors.push(getRandomColor());
    }

    for (const key in dataObj) {
      _labels.push(key); _data.push(dataObj[key]);
    }

    if (type != "doughnut") {
      chart.current = new Chart(ctx, {
        type: type,
        data: {
          labels: _labels,
          datasets: [
            {
              label: legend,
              data: _data,
              borderWidth: 1,
              backgroundColor: getRandomColor(),
              borderColor: "#28282B",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              stacked: true,
            },
          },
        },
      });
    } else {
      chart.current = new Chart(ctx, {
        type: type,
        data: {
          labels: _labels,
          datasets: [
            {
              label: legend,
              data: _data,
              borderWidth: 1,
              backgroundColor: bgColors,
              borderColor: "#28282B",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
};
