import LayoutAdmin from "../../layout/LayoutAdmin";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { message, Pagination } from "antd";
import { toast } from "react-toastify";
import { el, se } from "date-fns/locale";

export default function CDFChangeHistory() {

    //get cdf change history
    const [cdfChangeHistory, setCdfChangeHistory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9999/cdfHistory")
            .then((response) => {
                setCdfChangeHistory(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    //get users for Student table
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/users")
            .then((response) => {
                setUsers(response?.data?.filter((user) => user.role === "student"));
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);


    //get bonus reason
    const [bonusReason, setBonusReason] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/bonusScoreReasons")
            .then((response) => {
                setBonusReason(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);


    //get minus reason
    const [minusReason, setMinusReason] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/minusScoreReasons")
            .then((response) => {
                setMinusReason(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    //Hàm loại bỏ dấu
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Xóa các ký tự đặc biệt
        str = str.replace(/[\u0300-\u036f]/g, "");
        // Xóa ký tự đặc biệt
        str = str.replace(/[^a-zA-Z0-9 ]/g, "");
        return str;
    }

    //search student
    const [searchStudent, setSearchStudent] = useState('');
    useEffect(() => {
        if (searchStudent === '') {
            axios.get("http://localhost:9999/users")
                .then((response) => {
                    setUsers(response?.data?.filter((user) => user.role === "student"));
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }, [searchStudent]);

    //Add a new state to hold the IDs of found students
    const [foundStudentIds, setFoundStudentIds] = useState([]);

    useEffect(() => {
        setFoundStudentIds(users.map(user => user.id));
    }, [users]);

    function searchStudentHandler() {
        if (searchStudent !== '') {
            axios.get(`http://localhost:9999/users?role=student`)
                .then((response) => {
                    const allUsers = response.data;
                    const foundStudent = allUsers.filter((user) =>
                        removeVietnameseTones(user.fullName.toLowerCase()).includes(removeVietnameseTones(searchStudent.toLowerCase()))
                    );
                    if (foundStudent.length > 0) {
                        setUsers(foundStudent);
                        setCurrentPageOfStudent(1);
                        // Update foundStudentIds with the IDs of the found students
                        setFoundStudentIds(foundStudent.map(user => user.id));
                    } else {
                        toast.error('Student not found!');
                    }
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        } else {
            axios.get("http://localhost:9999/users")
                .then((response) => {
                    setUsers(response?.data?.filter((user) => user.role === "student"));
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }

    //search cdf change history
    const [searchChange, setSearchChange] = useState('');

    useEffect(() => {
        if (searchChange === '') {
            axios.get("http://localhost:9999/cdfHistory")
                .then((response) => {
                    setCdfChangeHistory(response.data);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }, [searchChange]);

    function searchChangeHandler() {
        if (searchChange !== '') {
            // Use Promise.all to wait for both requests to complete
            Promise.all([
                axios.get("http://localhost:9999/bonusScoreReasons"),
                axios.get("http://localhost:9999/minusScoreReasons")
            ]).then(([bonusResponse, minusResponse]) => {
                // Filter bonus and minus reasons after receiving both responses
                const foundBonusReason = bonusResponse.data.filter(reason =>
                    removeVietnameseTones(reason.reason.toLowerCase()).includes(removeVietnameseTones(searchChange.toLowerCase()))
                );
                const foundMinusReason = minusResponse.data.filter(reason =>
                    removeVietnameseTones(reason.reason.toLowerCase()).includes(removeVietnameseTones(searchChange.toLowerCase()))
                );

                console.log('foundBonusReason', foundBonusReason);
                console.log('foundMinusReason', foundMinusReason);

                if (foundBonusReason.length === 0 && foundMinusReason.length === 0) {
                    toast.error('Bonus/Minus change history not found!');
                } else {
                    // Now that we have the filtered reasons, proceed to filter cdfHistory
                    axios.get("http://localhost:9999/cdfHistory")
                        .then((response) => {
                            setCdfChangeHistory(response.data?.filter(cdf => foundStudentIds.includes(cdf.student)
                                && (foundBonusReason.map(reason => reason.id).includes(cdf.bonusReason)
                                    || foundMinusReason.map(reason => reason.id).includes(cdf.minusReason))));
                        })
                        .catch((error) => {
                            console.error('There was an error!', error);
                        });
                }
            }).catch((error) => {
                console.error('There was an error with one of the fetches!', error);
            });
        } else {
            axios.get("http://localhost:9999/cdfHistory")
                .then((response) => {
                    setCdfChangeHistory(response.data);
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
    }

    //pagination for cdf score of students
    const [currentPageOfStudent, setCurrentPageOfStudent] = useState(1);
    const studentsPerPage = 5;
    const indexOfLastStudent = currentPageOfStudent * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudent = users?.slice(indexOfFirstStudent, indexOfLastStudent);

    //pagination for cdf change history
    const [currentPageOfChange, setCurrentPageOfChange] = useState(1);
    const cfdPerPage = 5;
    const indexOfLastChange = currentPageOfChange * cfdPerPage;
    const indexOfFirstChange = indexOfLastChange - cfdPerPage;
    const currentChange = cdfChangeHistory?.filter(cdf => foundStudentIds.includes(cdf.student))?.slice(indexOfFirstChange, indexOfLastChange);


    // Function to handle page change of students score table
    const handleStudentPageChange = (page) => {
        setCurrentPageOfStudent(page);
    };

    // Function to handle page change of cdf change history table
    const handleCDFChangePageChange = (page) => {
        setCurrentPageOfChange(page);
    }

    return (
        <LayoutAdmin>
            <Row>
                <Col >
                    <h2>CDF Score</h2>
                    <form>
                        <div class="d-flex mb-3 col-md-8">
                            <input type="text"
                                class="form-control"
                                placeholder="Enter student name"
                                onChange={e => setSearchStudent(e.target.value)} />
                            <button type="button" class="btn btn-outline-primary" onClick={e => searchStudentHandler()}>Search</button>
                        </div>
                    </form>
                    <table className="table table-bordered" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>CDF Score</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentStudent?.map((user) => {
                                    return (
                                        <tr>
                                            <td>{user?.studentID}</td>
                                            <td>{user?.fullName}</td>
                                            <td>{user?.cdf}</td>
                                            <td>
                                                <Link to={`/manage/cdf/bonus/${user.id}`}>Bonus</Link>

                                            </td>
                                            <td>
                                                <Link to={`/manage/cdf/minus/${user.id}`}>Minus</Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    {/* Ant Design Pagination Component */}
                    <Pagination
                        current={currentPageOfStudent}
                        onChange={handleStudentPageChange}
                        total={users.length} // This should be dynamic based on total items/pages
                        pageSize={studentsPerPage}
                    />
                </Col>
                <Col >
                    <h2>CDF Change History</h2>
                    <form>
                        <div class="d-flex mb-3 justify-content-start col-md-8">
                            <input type="text"
                                class="form-control"
                                placeholder="Enter bonus/minus reason"
                                onChange={e => setSearchChange(e.target.value)} />
                            <button type="button"
                                class="btn btn-outline-primary"
                                onClick={e => searchChangeHandler()}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    <table className="table table-bordered" id="dataTable" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>
                                    Bonus/Minus
                                </th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentChange?.map((cdf) => {
                                    return (
                                        <tr key={cdf.id}> {/* Thêm key để tối ưu hiệu suất */}
                                            <td>{cdf.student}</td>
                                            <td>
                                                {
                                                    users?.find((user) => user.id == cdf.student)?.fullName
                                                }
                                            </td>
                                            <td>
                                                {cdf?.bonus ? '+' + cdf?.bonus : ''}
                                                {cdf?.minus ? '-' + cdf?.minus : ''}
                                            </td>
                                            <td>
                                                {
                                                    bonusReason?.find((reason) => reason.id == cdf.bonusReason)?.reason
                                                }
                                                {
                                                    minusReason?.find((reason) => reason.id == cdf.minusReason)?.reason
                                                }
                                            </td>
                                            <td>{cdf.date}</td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>
                    {/* Ant Design Pagination Component */}
                    <Pagination
                        current={currentPageOfChange}
                        onChange={handleCDFChangePageChange}
                        total={cdfChangeHistory.length} // This should be dynamic based on total items/pages
                        pageSize={cfdPerPage}
                    />
                </Col>
            </Row>
        </LayoutAdmin>
    );
}
