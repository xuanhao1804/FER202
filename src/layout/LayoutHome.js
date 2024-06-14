import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Lading from "../components/LadingIntro";

export default function LayoutHome({ title = "", children }) {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <div className="banner">
                    <Banner />
                </div>
                <div className="ktx">
                    <Lading />
                </div>
                <div className="row content1">
                    <div >{children}</div>
                </div>
                <br></br>
                <Footer />
            </div>
            
        </>
    );
}