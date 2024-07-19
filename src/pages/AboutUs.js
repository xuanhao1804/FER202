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
                                    <h2>Welcome to <span>Our Dormitory Management System</span></h2>
                                    <p>Manage bookings, view regulations, request history, and more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" class="about">
                    <div class="section-heading text-center">
                        <h2>About Our Team</h2>
                    </div>
                    <div class="container">
                        <div class="about-content">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>Hào</h3>
                                        <p>Project Lead and Full Stack Developer. Ensures the smooth operation of the project and oversees the development process.</p>
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
                                                    <p>hao@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.haosite.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
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
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>Đăng</h3>
                                        <p>Backend Developer. Responsible for server-side logic and database management.</p>
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
                                                    <p>dang@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.dangsite.com</p>
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
                                        <h3>Thái</h3>
                                        <p>Frontend Developer. Specializes in creating responsive and user-friendly interfaces.</p>
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
                                                    <p>thai@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.thaisite.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
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
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>Khánh</h3>
                                        <p>Quality Assurance. Ensures that the product meets all quality standards and works as expected.</p>
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
                                                    <p>khanh@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.khanhsite.com</p>
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
                                        <h3>Minh</h3>
                                        <p>UI/UX Designer. Focuses on crafting intuitive and engaging user experiences.</p>
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
                                                    <p>minh@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.minhsite.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-offset-1 col-md-6">
                                    <div class="single-about-img">
                                        <img src={profile_image} alt="profile_image" />
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
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="single-about-txt">
                                        <h3>Lương</h3>
                                        <p>DevOps Engineer. Manages the infrastructure and ensures continuous integration and delivery.</p>
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
                                                    <p>luong@info.com</p>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="single-about-add-info">
                                                    <h3>website</h3>
                                                    <p>www.luongsite.com</p>
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
