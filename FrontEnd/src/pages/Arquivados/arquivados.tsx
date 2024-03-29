import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { apiGetItensContent, content } from "../../@types/apiGetItensContent";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { Loading } from "../../components/loading/Loading";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import Axios from "../../utils/AxiosConfig";
import "./arquivados.sass";
import nothingHereImg from "../../assets/imgs/nothingHere.png";
import { toast } from "react-toastify";
import CardPageReload from "../../context/cardPageReload";
import GetToken from "../../utils/GetToken";
export function Arquivados() {
  const [itens, setItens] = useState<content[]>([]);
  const [isloading, setIsloading] = useState(false);
  const { isCardReload, setIsCardReload } = useContext(CardPageReload);
  const bucketName = localStorage.getItem("bucketName");
  const token = GetToken();

  useEffect(() => {
    setIsloading(true);
    Axios.get(`/glacier/status/${bucketName}/`,{
      headers:{
        Authorization:token
      }
    })
      .then((data: AxiosResponse<apiGetItensContent, apiGetItensContent>) => {
        const S3Items = data.data.itens.Content;
        const Data = S3Items.filter((data) => {
          return data.storageClass === "GLACIER";
        });
        setItens(Data);
       
        setIsloading(false);
      })
      .catch((e) => {
        toast.error("Algo deu errado. Porfavor reinicie seu navegador ");
        setIsloading(false);
      });
  }, [isCardReload]);
  return (
    <>
      <Loading isLoading={isloading} />
      <section className="ItensArquivados">
        <PageContainer>
          <PageTitle title="Arquivados"></PageTitle>
          {itens.length > 0 ? (
            <>
              <section className="description">
                <p>
                  Ao resgatar um item arquivado ele estara disponivel no seus
                  arquivos em um prazo de até 1 dia
                </p>
              </section>
              <div className="cards">
                {itens.map((data,index) => {
                 
                  const DataArquivo = new Date(
                    data.LastModified
                  ).toDateString();

                  return (
                    <ArchiveCard
                      key={index}
                      itemKey={data.key}
                      ArchiveTypes={data.type}
                      cardTitle={data.itemName}
                      date={data.LastModified}
                      restore={data.restore}
                      fileSize={data.size}
                      cardType={data.storageClass}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <img src={nothingHereImg} />
          )}
        </PageContainer>
      </section>
    </>
  );
}
