import "./home.sass";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import nothingHere from "../../assets/imgs/nothingHere.png";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";

export function Home() {
  return (
    <>
      <section className="home">
        <PageContainer>
          <PageTitle title="Meus arquivos"></PageTitle>
          
            <div className="cards">
              <ArchiveCard
                ArchiveTypes="file"
                cardTitle="Readme.txt"
                date="06/09/2022,10:44 am"
                fileSize="120.2 mb"
              />
              <ArchiveCard
                ArchiveTypes="jpeg"
                cardTitle="Readme.jpeg"
                date="06/09/2022,10:44 am"
                fileSize="120.2 mb"
              />
              <ArchiveCard
                ArchiveTypes="mp3"
                cardTitle="Readme.mp3"
                date="06/09/2022,10:44 am"
                fileSize="120.2 mb"
              />
              <ArchiveCard
                ArchiveTypes="mp4"
                cardTitle="Readme.mp4"
                date="06/09/2022,10:44 am"
                fileSize="120.2 mb"
              />

              <ArchiveCard
                ArchiveTypes="txt"
                cardTitle="Readme.txt"
                date="06/09/2022,10:44 am"
                fileSize="120.2 mb"
              />
            </div>
          
        </PageContainer>
      </section>
    </>
  );
}
