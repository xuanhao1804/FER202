import { Container, Table } from "react-bootstrap";
import LayoutUser from "../../layout/LayoutUser";



const tableStyles = {
    width: '100%',
    marginTop: '20px',
    borderCollapse: 'collapse'
};

const thStyles = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    textAlign: 'left',
};

const tdStyles = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

export default function FeedBackHistory() {
    return (
        <LayoutUser>
            <Container>
                <Table style={tableStyles}>
                    <thead>
                        <tr>
                            <th style={thStyles}>TYPE</th>
                            <th style={thStyles}>PURPOSE</th>
                            <th style={thStyles}>CREATEDATE</th>
                            <th style={thStyles}>PROCESSNOTE</th>
                            <th style={thStyles}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td style={tdStyles}></td>
                            <td style={tdStyles}></td>
                            <td style={tdStyles}></td>
                            <td style={tdStyles}></td>
                            <td style={tdStyles}></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </LayoutUser>
    )
}