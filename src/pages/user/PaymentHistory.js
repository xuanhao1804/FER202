import { Table } from "react-bootstrap";
import LayoutUser from "../../layout/LayoutUser";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentHistory() {
    
    const [paymentHistory, setPaymentHistory] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user.id);
    useEffect(() => {
        // Hàm để lấy thông tin thanh toán và cập nhật trạng thái
        const fetchPaymentHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/payments`);
                const histoStudent = response.data.filter(x => x.studentid == user.id );
                console.log(histoStudent);
                setPaymentHistory(histoStudent); // Cập nhật dữ liệu thanh toán từ API
            } catch (error) {
                console.error('Error fetching payment history:', error);
            }
        };

        fetchPaymentHistory();
      
    }, []);

    return (
        <LayoutUser>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Semester</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.date}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.semester}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </LayoutUser>
    );
}
