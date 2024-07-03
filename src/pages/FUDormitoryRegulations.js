import { useEffect } from 'react';
import LayoutUser from "../layout/LayoutUser";
import "../style/regulation.css";
import { Row } from 'react-bootstrap';
import PDFViewer from '../components/pdf.js';

export default function FUDormitoryRegulations() {

    return (
        <LayoutUser>
            <h1><b>FU Dormitory Regulations</b></h1>
            <button type="button" class="btn-download"><b>Download</b></button>
            <Row>
                <div id='pdf'>
                    <PDFViewer pdfUrl="../document/regulations/KTX-HL.pdf" />
                </div>
            </Row>
        </LayoutUser>
    );
}