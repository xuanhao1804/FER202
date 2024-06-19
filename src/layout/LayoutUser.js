import SideBarUser from "../components/SideBarUser";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutUser({ title = "", children }) {
    return (

        <Container fluid>

            <Header />

            <Row style={{ justifyContent: 'flex-start' }}>
                <Col md={2} xs={2}>
                    <SideBarUser />
                </Col>
                <Col md={9} xs={10}>
                    <div style={{ marginTop: "90px" }}>{children}</div>
                </Col>
            </Row>
        </Container>


    );
}
