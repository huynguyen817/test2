import { Form, Input, Button, Checkbox, DatePicker, Select, InputNumber } from "antd";
import { db, ref, set, push } from "./firebaseConfig";
import "@fontsource/roboto";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function EventForm() {
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
    <div style={{ fontFamily: "Roboto, sans-serif", padding: 20 }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Tạo Sản Phẩm</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <table style={{ width: "100%", borderCollapse: "collapse", maxWidth: 600, margin: "auto" }}>
          <tbody>
            <tr>
              <td><label>Tiêu đề</label></td>
              <td>
                <Form.Item name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                  <Input placeholder="Nhập tiêu đề sự kiện" />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td><label>Loại sự kiện</label></td>
              <td>
                <Form.Item name="eventType" rules={[{ required: true, message: "Chọn loại sự kiện!" }]}>
                  <Checkbox.Group>
                    <Checkbox value="Quý">Quý</Checkbox>
                    <Checkbox value="Năm">Năm</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td><label>Thời hạn</label></td>
              <td>
                <Form.Item name="dateRange" rules={[{ required: true, message: "Chọn khoảng thời gian!" }]}>
                  <RangePicker />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td><label>Tên Sự kiện</label></td>
              <td>
                <Form.Item name="eventName" rules={[{ required: true, message: "Chọn tên sự kiện!" }]}>
                  <Select placeholder="Chọn sự kiện">
                    <Option value="Sự kiện A">Sự kiện A</Option>
                    <Option value="Sự kiện B">Sự kiện B</Option>
                    <Option value="Sự kiện C">Sự kiện C</Option>
                  </Select>
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td><label>Điểm</label></td>
              <td>
                <Form.Item name="points" rules={[{ required: true, message: "Nhập điểm thưởng!" }]}>
                  <InputNumber min={0} placeholder="Nhập điểm" style={{ width: "100%" }} />
                </Form.Item>
              </td>
            </tr>

            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Tạo Sự Kiện</Button>
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
}
