
import Header from "../components/Header";
import SideBarAdmin from "../components/SidebarAdmin";
import { Row,Col, Container } from "react-bootstrap";

export default function LayoutAdmin({title="", children}){
    return(
        <Container fluid>
            <Header/>

      
      
      
      
      
      
        <Row style={{justifyContent:'flex-start'}}>
            <Col md={2} xs={2}>
            <SideBarAdmin/>
            </Col>
            <Col md={9} xs={10}>
            <div style={{marginTop:"90px"}}>{children}</div>
            </Col>
        </Row>








        </Container>


    );
}
