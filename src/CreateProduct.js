import React from "react";
import { Form, Input, Button, Radio, DatePicker, Select, InputNumber } from "antd";
import { db, ref, update, set, push, onValue, remove } from "./firebaseConfig";
import "@fontsource/roboto";
import "./App.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function CreateProduct() {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        if (!values.title || !values.eventType || !values.dateRange || !values.eventName || !values.points) {
            console.error("Lỗi: Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const notificationsRef = ref(db, "events");
        const newNotificationRef = push(notificationsRef);

        set(newNotificationRef, {
            title: values.title,
            eventType: values.eventType,
            startDate: values.dateRange[0].format("YYYY-MM-DD"),
            endDate: values.dateRange[1].format("YYYY-MM-DD"),
            eventName: values.eventName,
            points: values.points,
            timestamp: Date.now(),
        })
            .then(() => {
                console.log("✅ Sự kiện đã được lưu vào Firebase!");
                form.resetFields();
            })
            .catch((error) => console.error("❌ Lỗi khi ghi vào Firebase:", error));
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="header">
                    <h2>Tạo sản phẩm</h2>
                    <button className="close-button">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <div className="form-item">
                        <label>Loại sản phẩm</label>
                        <Form.Item name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                    </div>
                    <div className="form-item">
                        <label>Loại sự kiện</label>
                        <Form.Item name="eventType" rules={[{ required: true, message: "Chọn loại sự kiện!" }]}>
                            <Radio.Group>
                                <Radio value="Quý">Quý</Radio>
                                <Radio value="Năm">Năm</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="form-item">
                        <label>Thời hạn</label>
                        <Form.Item name="dateRange" rules={[{ required: true, message: "Chọn khoảng thời gian!" }]}>
                            <RangePicker />
                        </Form.Item>
                    </div>
                    <div className="form-item">
                        <label>Tên sự kiện</label>
                        <Form.Item name="eventName" rules={[{ required: true, message: "Chọn tên sự kiện!" }]}>
                            <Select placeholder="Chọn sự kiện">
                                <Option value="Sự kiện A">Sự kiện A</Option>
                                <Option value="Sự kiện B">Sự kiện B</Option>
                                <Option value="Sự kiện C">Sự kiện C</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="form-item">
                        <label>Điểm</label>
                        <Form.Item name="points" rules={[{ required: true, message: "Nhập điểm thưởng!" }]}>
                            <InputNumber min={0} placeholder="Nhập điểm" style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                    <div style={{ textAlign: "right" }} className="form-item">
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}
