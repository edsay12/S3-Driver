import { useState } from "react";

import { Route, Router, Routes } from "react-router-dom";
import { DeskBoard } from "./pages/deskboard/deskboard";

import { PageContainer } from "./components/pageContainer/PageContainer";
import { PageTitle } from "./components/pageTitle/pageTitle";
import { Home } from "./pages/home/home";
import { Arquivados } from "./pages/Arquivados/arquivados";
import { Lixeira } from "./pages/Lixeira/lixeira";
import { Upload } from "./pages/upload/UploadArquivo";
import { Armazenamento } from "./pages/armazenamento/armazenamento";
import CardModalContext from "./context/cardModalContext";
import CardPageReload from "./context/cardPageReload";
type ModalCard = {
  isModalCardOpen: any;
  setIsCardModalOpen: any;
};

function App() {
  const [count, setCount] = useState(0);
  const [isCardReload, setIsCardReload] = useState<any>(false);
  const [isModalCardOpen, setIsCardModalOpen] = useState<any>(false);

  return (
    <CardPageReload.Provider value={{isCardReload, setIsCardReload}}>
      <CardModalContext.Provider
        value={{ isModalCardOpen, setIsCardModalOpen }}
      >
        <Routes>
          <Route path="/" element={<DeskBoard children={<Home />} />} />
          <Route path="/upload" element={<DeskBoard children={<Upload />} />} />
          <Route
            path="/armazenamento"
            element={<DeskBoard children={<Armazenamento />} />}
          />
          <Route
            path="/arquivado"
            element={<DeskBoard children={<Arquivados />} />}
          />
          <Route
            path="/lixeira"
            element={<DeskBoard children={<Lixeira />} />}
          />
          <Route
            path="/configuraçoes"
            element={<DeskBoard children={<h1>configuraçoes</h1>} />}
          />
          <Route
            path="/help"
            element={<DeskBoard children={<h1>help</h1>} />}
          />
        </Routes>
      </CardModalContext.Provider>
    </CardPageReload.Provider>
  );
}

export default App;
