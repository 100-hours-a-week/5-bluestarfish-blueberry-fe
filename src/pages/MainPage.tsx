import Header from "../components/common/Header";
import MainPageContainer from "../components/Container/MainPageContainer";
import Footer from "../components/common/Footer";

type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <MainPageContainer />
      <Footer />
    </div>
  );
};

export default MainPage;
