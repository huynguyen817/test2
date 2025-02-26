import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);
    const [expandedDropdowns, setExpandedDropdowns] = useState([]);

    const toggleSidebar = () => {
        setSidebarExpanded(!isSidebarExpanded);
        if (!isSidebarExpanded) {
            setExpandedDropdowns([]); // Close all dropdowns when sidebar is collapsed
        }
    };

    const toggleDropdown = (index) => {
        if (!isSidebarExpanded) {
            setSidebarExpanded(true);
        }
        setExpandedDropdowns((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
            <div className="logo">
                <img
                    alt="Company Logo"
                    height="50"
                    onClick={toggleSidebar}
                    src="https://storage.googleapis.com/a1aa/image/YhcCJnZ8snE0YCYVvxw2NSHjPVax36mvCon8mFKLMHI.jpg"
                    width="50"
                />
                <button className="toggle-button" onClick={toggleSidebar}>
                    <i className="fas fa-arrow-left"></i>
                </button>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-home"></i> <span>Trang chủ</span>
                        </a>
                    </li>
                    <li className={`dropdown ${expandedDropdowns.includes(0) ? 'expanded' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(0)}>
                            <i className="fas fa-user"></i> <span>Người dùng</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Chờ phê duyệt</a>
                            </li>
                            <li>
                                <a href="#">Danh sách</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-user-circle"></i> <span>Tài khoản</span>
                        </a>
                    </li>
                    <li className={`dropdown ${expandedDropdowns.includes(1) ? 'expanded' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(1)}>
                            <i className="fas fa-key"></i> <span>Phân quyền</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Chức năng tài khoản</a>
                            </li>
                            <li>
                                <a href="#">Phân cấp</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-building"></i> <span>Phòng ban</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-info-circle"></i> <span>Hiển thị thông tin</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-warehouse"></i> <span>Tồn kho đại lý</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-clipboard-check"></i> <span>BPTT kiểm kê kho</span>
                        </a>
                    </li>
                    <li className={`dropdown ${expandedDropdowns.includes(2) ? 'expanded' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(2)}>
                            <i className="fas fa-exclamation-circle"></i> <span>Bảo hành / khiếu nại</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Danh sách sản phẩm bảo hành</a>
                            </li>
                            <li>
                                <a href="#">Phân cấp</a>
                            </li>
                        </ul>
                    </li>
                    <li className={`dropdown ${expandedDropdowns.includes(3) ? 'expanded' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(3)}>
                            <i className="fas fa-map-marker-alt"></i> <span>Khu vực</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Danh sách khu vực</a>
                            </li>
                            <li>
                                <a href="#">Email theo khu vực</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" onClick={toggleSidebar}>
                            <i className="fas fa-bell"></i> <span>Thông báo</span>
                        </a>
                    </li>
                    <li className={`dropdown ${expandedDropdowns.includes(4) ? 'expanded' : ''}`}>
                        <a href="#" onClick={() => toggleDropdown(4)}>
                            <i className="fas fa-tags"></i> <span>CTKM</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">Danh sách CTKM</a>
                            </li>
                            <li>
                                <a href="#">Email theo CTKM</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;