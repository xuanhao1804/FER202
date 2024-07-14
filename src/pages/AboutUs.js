import Footer from "../components/Footer";
import Header from "../components/Header";
import "../style/about.css";
import profile_image from "../assert/images/about/profile_image.jpg";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <>
            <div className="container-fluid">
                <Header />
                <section id="welcome-hero" class="welcome-hero">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="header-text">
                                    <h2>hi <span>,</span> I'm <br /> Lee Shu <br /> Hao <span>.</span>   </h2>
                                    <p>ui/ux designer and web developer</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section id="about" class="about">
                    <div class="section-heading text-center">
                        <h2>about me</h2>
                    </div>
                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="single-about-txt">

                                        <h3>
                                            Lee Shu Hao
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184" target="_blank">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" class="about">

                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>
                                            Member 1
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" class="about">
                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="single-about-txt">

                                        <h3>
                                            Member 2
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" class="about">

                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>
                                            Member 3
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" class="about">
                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="single-about-txt">

                                        <h3>
                                            Member 4
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" class="about">

                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
                                        <div class="about-list-icon">
                                            <ul>
                                                <li>
                                                    <Link to="https://www.facebook.com/shu.hao.184">
                                                        <i class="fa fa-facebook" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-dribbble" aria-hidden="true"></i>
                                                    </Link>

                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>
                                            Member 5
                                        </h3>
                                        <p>
                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspi unde omnis iste natus error sit voluptatem accusantium doloremque lauda ntium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam vo luptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        </p>
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>phone</h3>
                                                    <p>987-123-6547</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>email</h3>
                                                    <p>browny@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.brownsine.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        </>
    );
}