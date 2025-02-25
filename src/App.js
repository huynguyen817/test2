import { Form, Input, Button } from "antd";
import { db, ref, set, push } from "./firebaseConfig";

export default function EventForm() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    if (!values.title || !values.message) {
      console.error("Lỗi: Tiêu đề và nội dung không được để trống!");
      return;
    }

    
    const notificationsRef = ref(db, "notifications");
    const newNotificationRef = push(notificationsRef); 

    set(newNotificationRef, {
      title: values.title,
      message: values.message,
      timestamp: Date.now(),
    })
      .then(() => {
        console.log("✅ Notification đã được lưu vào Firebase!");
        form.resetFields();
      })
      .catch((error) => console.error("❌ Lỗi khi ghi vào Firebase:", error));
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
      >
        <Input placeholder="Nhập tiêu đề" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Nội dung"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
      >
        <Input.TextArea placeholder="Nhập nội dung" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Gửi Notification</Button>
      </Form.Item>
      
    </Form>
    
  );
}
