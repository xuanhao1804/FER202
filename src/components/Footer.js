<<<<<<< HEAD


export default function Footer(){
    return(
        <div className="row footer">
            Group3-Đại học FPT HÀ Nội
        </div>
    );
}
=======
import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
<<<<<<< HEAD
import logoFooter from '../assert/images/logo-footer.png'; 
=======
import logoFooter from '../aaalogo.png'; 
>>>>>>> 365f2ff (login form)

export default function Footer() {
  return (

      <footer 
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: '#ECEFF1' }}
      >
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: '#fe6700' }}
        >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <Nav>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-twitter"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-google"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-instagram"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-linkedin"></i>
              </Nav.Link>
              <Nav.Link href="#" className="text-white me-4">
                <i className="fab fa-github"></i>
              </Nav.Link>
            </Nav>
          </div>
        </section>

        <section className="">
          <Container className="text-center text-md-start mt-5">
            <Row className="mt-3">
            <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">FPT University</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: '60px',
                  backgroundColor: '#7c4dff',
                  height: '2px',
                }}
              />
              <img src={logoFooter} alt="Logo Footer" className="img-fluid" />
            </Col>

              <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Tin Tức</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#black', height: '2px' }}
                />
                <p>
                  <a href="#!" className="text-dark">MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">MDWordPress</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">BrandFlow</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Bootstrap Angular</a>
                </p>
              </Col>

              <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Liên kết khác</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <a href="https://hanoi.fpt.edu.vn/" className="text-dark">Đại học FPT Hà Nội</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Become an Affiliate</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Shipping Rates</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Help</a>
                </p>
              </Col>

              <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i>
Khu Giáo dục và Đào tạo - Khu Công nghệ cao Hòa Lạc - KM29 Đại Lộ Thăng Long, H. Thạch Thất, TP.
Hà Nội
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>
                  daihocfpt@fpt.edu.vn
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i>
                  + 024 7300 1866
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          &copy; 2020 Copyright:{' '}
          <a className="text-dark" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>

  );
}
>>>>>>> 28d9f6a73c5b7f7db017b1dcd715068a7769ec6d
