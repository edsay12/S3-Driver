import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import DonutChart from "react-donut-chart";
import "./armazenamento.sass";
import { useEffect, useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { convertBytes } from "../../utils/bytesToSize";
import nothingHereImg from "../../assets/imgs/nothingHere.png";
import { toast } from "react-toastify";
import GetToken from "../../utils/GetToken";
ChartJS.register(ArcElement, Tooltip, Legend);

type sizesType = {
  audio: number;
  document: number;
  image: number;
  others: number;
  total: number;
  video: number;
};
const size = {
  audio: 0,
  document: 0,
  image: 0,
  others: 0,
  total: 0,
  video: 0,
};

type responseType = {
  data: { sizes: sizesType };
};

export function Armazenamento() {
  const bucketName = localStorage.getItem("bucketName");
  const token = GetToken();

  const [sizes, setSizes] = useState<sizesType>(size);
  useEffect(() => {
    Axios.get(`/sizes/${bucketName}`, {
      headers: {
        Authorization: token,
      },
    })
      .then(({ data }: responseType) => {
        const itensKeys = Object.keys(data.sizes);
        setSizes(data.sizes);
      })
      .catch((e) => {
        toast.error("Algo deu errado. Porfavor reinicie seu navegador ");
      });
  }, []);

  const data = {
    labels: ["Audio", "Documentos", "Imagens", "Video", "Outros"],
    datasets: [
      {
        data: [
          sizes.audio,
          sizes.document,
          sizes.image,
          sizes.video,
          sizes.others,
        ],
        backgroundColor: [
          "#FFA07A",
          "#FFD700",
          "#FF69B4",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
        hoverBackgroundColor: [
          "#FFA07A",
          "#FFD700",
          "#FF69B4",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = convertBytes(context.parsed);
            return `${value}`;
          },
        },
      },
    },
  };
  return (
    <>
      <PageContainer>
        <PageTitle title="Armazenamento"></PageTitle>
        {Object.keys(sizes).length > 0 ? (
          <div className="grafico">
            <Doughnut data={data} options={options} />
          </div>
        ) : (
          <></>
        )}
      </PageContainer>
    </>
  );
}
