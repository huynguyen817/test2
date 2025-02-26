import React, { useState } from "react";
import { Form, Input, Button, Select, InputNumber, message } from "antd";
import { db, ref, push, set } from "./firebaseConfig";
import "../App.css"; // Đảm bảo bạn có file CSS để style form

const { Option } = Select;

export default function CreateEvent({ onClose }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // 📌 Xử lý tạo sự kiện
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Tạo ID mới cho sự kiện trong Firebase
            const newEventRef = push(ref(db, "events"));

            // Lưu dữ liệu sự kiện
            await set(newEventRef, {
                eventName: values.eventName,
                eventType: values.eventType,
                rewardAmount: values.rewardAmount,
                rewardLimit: values.rewardLimit,
                timestamp: Date.now(),
            });

            message.success("🎉 Sự kiện đã được tạo thành công!");
            form.resetFields();
            if (onClose) onClose(); // Đóng cửa sổ nếu có props onClose
        } catch (error) {
            console.error("❌ Lỗi khi tạo sự kiện:", error);
            message.error("❌ Lỗi khi tạo sự kiện!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-container">
            <h2>Tạo sự kiện mới</h2>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                {/* Tên sự kiện */}
                <Form.Item
                    label="Tên sự kiện"
                    name="eventName"
                    rules={[{ required: true, message: "Vui lòng nhập tên sự kiện!" }]}
                >
                    <Input placeholder="Nhập tên sự kiện" />
                </Form.Item>

                {/* Loại sự kiện */}
                <Form.Item
                    label="Loại sự kiện"
                    name="eventType"
                    rules={[{ required: true, message: "Chọn loại sự kiện!" }]}
                >
                    <Select placeholder="Chọn loại sự kiện">
                        <Option value="Quý">Quý</Option>
                        <Option value="Năm">Năm</Option>
                    </Select>
                </Form.Item>

                {/* Mức đổi thưởng */}
                <Form.Item
                    label="Mức đổi thưởng"
                    name="rewardAmount"
                    rules={[{ required: true, message: "Nhập mức đổi thưởng!" }]}
                >
                    <InputNumber
                        placeholder="Nhập mức đổi thưởng"
                        min={0}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                {/* Hạn mức đổi thưởng */}
                <Form.Item
                    label="Hạn mức đổi thưởng"
                    name="rewardLimit"
                    rules={[{ required: true, message: "Nhập hạn mức đổi thưởng!" }]}
                >
                    <InputNumber
                        placeholder="Nhập hạn mức đổi thưởng"
                        min={0}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                {/* Nút hành động */}
                <div className="form-actions">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Tạo sự kiện
                    </Button>
                </div>
            </Form>
        </div>
    );
}
