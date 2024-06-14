import React from 'react';

const newsItems = [
    { date: "10/05/2024 22:56", title: "TB. về việc cắt điện ngày 11/05/2024" },
    { date: "11/04/2024 06:04", title: "THÔNG BÁO VỀ VIỆC ĐĂNG KÝ/HỦY PHÒNG KTX KỲ SUMMER 2024" },
    { date: "27/02/2024 13:33", title: "THÔNG BÁO V/V PHUN THUỐC DIỆT MUỖI, CÔN TRÙNG PHÒNG CHỐNG BỆNH DỊCH LẦN 1 NĂM 2024" },
    { date: "25/01/2024 15:24", title: "THÔNG TIN Y TẾ - PHÒNG CHỐNG DỊCH BỆNH MÙA ĐÔNG XUÂN" },
    { date: "28/12/2023 10:44", title: "THÔNG BÁO V/V GIA HẠN ĐĂNG KÝ KTX KỲ SPRING 2024" },
    { date: "26/12/2023 02:00", title: "THÔNG BÁO VỀ VIỆC ĐĂNG KÝ KTX KỲ SPRING 2024" },
    { date: "26/11/2023 08:15", title: "THÔNG BÁO V/V MẤT ĐIỆN NGÀY 26/11 VÀ 30/11/2023" },
    { date: "09/11/2023 17:11", title: "TB. V/v thực hiện đăng ký tạm trú đối với sinh viên lưu trú KTX" },
    { date: "02/11/2023 15:56", title: "THÔNG BÁO V/V DỊCH CHUYỂN PHÒNG Y TẾ" },
    { date: "21/10/2023 15:33", title: "T.B V/v Tập huấn phương án PCCC và cứu nạn cứu hộ tại KTX" }
];

const News = () => {
    return (
        <div className="news">
            <h2 className="news-heading">News</h2>
            <div className="search-bar">
                <input type="text" placeholder="Type to search..." />
                <button>Search</button>
            </div>
            <div className="news-list">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-item">
                        <p>{item.date}</p>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button disabled>{'««'}</button>
                <button disabled>{'«'}</button>
                <button>{1}</button>
                <button>{2}</button>
                <button>{3}</button>
                <button>{'»'}</button>
                <button>{'»»'}</button>
            </div>
        </div>
    );
};

export default News;

