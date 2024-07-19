import { useState, useEffect } from "react";
import LayoutUser from "../../layout/LayoutUser";
import axios from 'axios'; // Thêm thư viện axios để gửi yêu cầu HTTP

export default function Payment() {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0); // Thêm state cho số dư tài khoản
    const semester = 'Fall 2024';
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // Hàm để lấy thông tin người dùng và cập nhật số dư
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/users/${user.id}`);
                setBalance(response.data.balance); // Cập nhật số dư từ dữ liệu người dùng
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user.id]);

    const containerStyle = {
        
        display: 'flex',
        flexDirection: 'row', // Đặt flexDirection là 'row' để sắp xếp theo hàng ngang
        gap: '20px', // Khoảng cách giữa hai phần tử
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '20%',
        marginRight: '20%'
    };

    const titleStyle = {
        color: '#333',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        width: '100%', // Đảm bảo tiêu đề chiếm toàn bộ chiều rộng của container
    };

    const formContainerStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        flex: 1,
        maxWidth: '500px', // Thiết lập chiều rộng tối đa cho form
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    };

    const labelStyle = {
        fontSize: '1rem',
        color: '#555',
    };

    const inputStyle = {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1rem',
    };

    const buttonStyle = {
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const paymentData = {
            studentid: user.id, // ID của sinh viên từ localStorage
            amount: amount,
            date: new Date().toISOString().split('T')[0], // Ngày hiện tại
            semester: semester,
            status: 'pending', // Trạng thái thanh toán: 'pending' hoặc 'approved'
        };
    
        try {
            // Gửi yêu cầu POST để thêm thanh toán
            const response = await axios.post('http://localhost:9999/paymentRequests', paymentData);
            
            if (response.status === 201) {
                console.log('Payment added successfully:', response.data); // Thông báo thêm thành công
                alert('Payment Request successfully');
            }
        } catch (error) {
            console.error('Error adding payment or updating balance:', error);
            alert('Failed to add payment or update balance');
        }
    };
    
    return (
        <LayoutUser>
            <div style={containerStyle}>
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                    flex: 1 // Tăng kích thước của khối này để chiếm không gian còn lại
                }}>
                    <h2 style={{ margin: 0 }}>Số dư hiện tại</h2>
                    <h3 style={{ margin: '10px 0' }}>{balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>
                </div>
                <div style={formContainerStyle}>
                    <h1 style={titleStyle}>Thanh toán</h1>
                    <form style={formStyle} onSubmit={handleSubmit}>
                        <label htmlFor="amount" style={labelStyle}>Số tiền nạp:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="Nhập số tiền"
                            min="0"
                            max="10000000"
                            required
                            style={inputStyle}
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <button 
                            type="submit" 
                            style={buttonStyle} 
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                        >
                            Nạp tiền
                        </button>
                    </form>
                </div>
            </div>
        </LayoutUser>
    );
}
