import SideBarAdmin from "../components/SidebarAdmin";
import { Row,Col } from "react-bootstrap";

export default function LayoutAdmin({title="", children}){
    return(
        <Row style={{justifyContent:'flex-start'}}>
            <Col md={2} xs={2}>
            <SideBarAdmin/>
            </Col>
            <Col md={9} xs={10}>
            <div style={{marginTop:"90px"}}>{children}</div>
            </Col>
        </Row>
            

    );
}
