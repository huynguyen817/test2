import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, InputNumber } from "antd";
import { db, ref, update, onValue } from "./firebaseConfig";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function EditProduct({ product, closeModal }) {
    const [form] = Form.useForm();
    const [eventList, setEventList] = useState([]);

    // 📌 Lấy danh sách sự kiện từ Firebase
    useEffect(() => {
        const eventsRef = ref(db, "events");
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const eventArray = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].eventName,
                }));
                setEventList(eventArray);
            }
        });
    }, []);

    // 📌 Đặt giá trị mặc định khi mở form sửa
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                title: product.title,
                eventType: product.eventType,
                dateRange: [
                    product.startDate ? dayjs(product.startDate, "YYYY-MM-DD") : null,
                    product.endDate ? dayjs(product.endDate, "YYYY-MM-DD") : null,
                ],
                eventName: product.eventName,
                points: product.points,
            });
        }
    }, [product, form]);

    // 📌 Xử lý cập nhật sản phẩm
    const handleSubmit = (values) => {
        if (!product || !product.id) {
            console.error("❌ Không tìm thấy sản phẩm cần sửa!");
            return;
        }

        update(ref(db, `events/${product.id}`), {
            title: values.title,
            eventType: values.eventType,
            startDate: values.dateRange[0]?.format("YYYY-MM-DD"),
            endDate: values.dateRange[1]?.format("YYYY-MM-DD"),
            eventName: values.eventName,
            points: values.points,
        })
            .then(() => {
                console.log("✅ Cập nhật thành công!");
                form.resetFields();
                closeModal(); // Đóng form sau khi cập nhật thành công
            })
            .catch((error) => console.error("❌ Lỗi khi cập nhật:", error));
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* Tên sản phẩm */}
            <Form.Item name="title" label="Tên sản phẩm" rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}>
                <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            {/* Loại sự kiện */}
            <Form.Item name="eventType" label="Loại sự kiện" rules={[{ required: true, message: "Chọn loại sự kiện!" }]}>
                <Select placeholder="Chọn loại sự kiện">
                    <Option value="Quý">Quý</Option>
                    <Option value="Năm">Năm</Option>
                </Select>
            </Form.Item>

            {/* Thời hạn */}
            <Form.Item name="dateRange" label="Thời hạn" rules={[{ required: true, message: "Chọn thời gian!" }]}>
                <RangePicker />
            </Form.Item>

            {/* Tên sự kiện - Dropdown từ Firebase */}
            <Form.Item name="eventName" label="Tên sự kiện" rules={[{ required: true, message: "Chọn tên sự kiện!" }]}>
                <Select placeholder="Chọn sự kiện">
                    {eventList.map((event) => (
                        <Option key={event.id} value={event.name}>
                            {event.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Điểm thưởng */}
            <Form.Item name="points" label="Điểm thưởng" rules={[{ required: true, message: "Nhập điểm thưởng!" }]}>
                <InputNumber min={0} placeholder="Nhập điểm thưởng" style={{ width: "100%" }} />
            </Form.Item>

            {/* Nút cập nhật */}
            <Button type="primary" htmlType="submit">
                Cập nhật
            </Button>
        </Form>
    );
}
