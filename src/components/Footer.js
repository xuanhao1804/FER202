import React from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import logoFooter from '../aaalogo.png'; 

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

        <section className="text-center text-md-start ">
          {/* <Container className="text-center text-md-start "> */}
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
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p>
                  <a href="https://hanoi.fpt.edu.vn/tin-tuc-su-kien/tin-tuc-chung" className="text-dark">Tin tức Chung</a>
                </p>
                <p>
                  <a href="https://hanoi.fpt.edu.vn/tin-tuc-su-kien/su-kien-chung" className="text-dark">Sự Kiện Chung</a>
                </p>
                <p>
                  <a href="https://hanoi.fpt.edu.vn/tin-tuc-su-kien/hoat-dong-huong-nghiep" className="text-dark">Hoạt Động Hướng Nghiệp</a>
                </p>
                <p>
                  <a href="https://hanoi.fpt.edu.vn/tin-tuc-su-kien/hop-tac-quoc-te" className="text-dark">Hợp tác quốc  tế</a>
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
                  <a href="https://hanoi.fpt.edu.vn/nganh-hoc" className="text-dark">Ngành Học</a>
                </p>
                <p>
                  <a href="https://hanoi.fpt.edu.vn/doi-song-sinh-vien" className="text-dark">Đời Sống Sinh Viên</a>
                </p>
                <p>
                  <a href="https://hanoi.fpt.edu.vn/tuyen-sinh" className="text-dark">Tuyển Sinh</a>
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
          {/* </Container> */}
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          &copy; 2024 Copyright:{' '}
          <a className="text-dark" href="https://mdbootstrap.com/">
          https://hanoi.fpt.edu.vn/
          </a>
        </div>
      </footer>

  );
}