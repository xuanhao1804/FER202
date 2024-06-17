import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Lading from "../components/LadingIntro";

<<<<<<< HEAD
export default function LayoutHome({ title = "", children }) {
=======
export default function LayoutHome({ title = "layout home", children }) {
>>>>>>> 28d9f6a73c5b7f7db017b1dcd715068a7769ec6d
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