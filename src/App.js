import React, { useEffect, useState } from "react";
import { db, ref, onValue, remove } from "./firebaseConfig";
import { Table, Button, Modal } from "antd";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lấy dữ liệu từ Firebase
  useEffect(() => {
    const productsRef = ref(db, "events");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productList);
      } else {
        setProducts([]);
      }
    });
  }, []);

  // Xóa sản phẩm
  const handleDelete = (id) => {
    remove(ref(db, `events/${id}`))
      .then(() => console.log("✅ Xóa thành công"))
      .catch((error) => console.error("❌ Lỗi khi xóa:", error));
  };

  // Mở modal Edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditVisible(true);
  };

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "title", key: "title" },
    { title: "Loại sự kiện", dataIndex: "eventType", key: "eventType" },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    { title: "Tên sự kiện", dataIndex: "eventName", key: "eventName" },
    { title: "Điểm", dataIndex: "points", key: "points" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <Button type="primary" onClick={() => setIsCreateVisible(true)}>Tạo sản phẩm</Button>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <Modal open={isCreateVisible} onCancel={() => setIsCreateVisible(false)} footer={null}>
        <CreateProduct closeModal={() => setIsCreateVisible(false)} />
      </Modal>

      <Modal open={isEditVisible} onCancel={() => setIsEditVisible(false)} footer={null}>
        {selectedProduct && <EditProduct product={selectedProduct} closeModal={() => setIsEditVisible(false)} />}
      </Modal>
    </div>
  );
}
