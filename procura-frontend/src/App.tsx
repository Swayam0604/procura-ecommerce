import React, { useState, useEffect } from "react";
import { productsApi, ordersApi } from "./services/api";
import "./App.css";

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsApi.getAll(),
        ordersApi.getAll(),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createSampleProduct = async () => {
    setLoading(true);
    const sampleProduct = {
      productCode: `PROD-${Date.now()}`,
      productName: `Sample Product ${products.length + 1}`,
      productDescription: "High-quality product created from React frontend",
      productRate: Math.floor(Math.random() * 500) + 50,
      productImage: "https://via.placeholder.com/150",
    };

    try {
      await productsApi.create(sampleProduct);
      await fetchData();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleOrder = async () => {
    setLoading(true);
    const sampleOrder = {
      customerName: `Customer ${orders.length + 1}`,
      customerEmail: `customer${orders.length + 1}@example.com`,
      productIds: ["sample-product-id"],
      totalAmount: Math.floor(Math.random() * 1000) + 100,
      status: "pending",
    };

    try {
      await ordersApi.create(sampleOrder);
      await fetchData();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ margin: "0 0 10px 0", fontSize: "2.5em", fontWeight: "300" }}
        >
          🛍️ Procura E-Commerce
        </h1>
        <p style={{ margin: "0", fontSize: "1.2em", opacity: "0.9" }}>
          Microservices Architecture Demo
        </p>
        <div style={{ marginTop: "20px", fontSize: "0.9em" }}>
          <span style={{ margin: "0 15px" }}>
            🔗 API Gateway: localhost:3000
          </span>
          <span style={{ margin: "0 15px" }}>
            📦 Products: {products.length}
          </span>
          <span style={{ margin: "0 15px" }}>📋 Orders: {orders.length}</span>
        </div>
      </header>

      {/* Navigation */}
      <div
        style={{
          padding: "30px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveTab("products")}
            style={{
              padding: "12px 30px",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: activeTab === "products" ? "#007bff" : "white",
              color: activeTab === "products" ? "white" : "#333",
              border: "2px solid #007bff",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                activeTab === "products"
                  ? "0 4px 15px rgba(0,123,255,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            📦 Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            style={{
              padding: "12px 30px",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: activeTab === "orders" ? "#28a745" : "white",
              color: activeTab === "orders" ? "white" : "#333",
              border: "2px solid #28a745",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow:
                activeTab === "orders"
                  ? "0 4px 15px rgba(40,167,69,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            📋 Orders ({orders.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "products" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <button
                onClick={createSampleProduct}
                disabled={loading}
                style={{
                  padding: "15px 40px",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(0,123,255,0.3)",
                  transition: "all 0.3s ease",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "⏳ Creating..." : "➕ Add Sample Product"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "20px",
              }}
            >
              {products.length === 0 ? (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "60px",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ fontSize: "1.2em", color: "#666", margin: "0" }}>
                    🛍️ No products yet. Click "Add Sample Product" to get
                    started!
                  </p>
                </div>
              ) : (
                products.map((product, index) => (
                  <div
                    key={product.id}
                    style={{
                      backgroundColor: "white",
                      padding: "25px",
                      borderRadius: "15px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#007bff",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.5em",
                        marginBottom: "15px",
                      }}
                    >
                      📦
                    </div>
                    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                      {product.productName}
                    </h3>
                    <p
                      style={{
                        margin: "5px 0",
                        color: "#666",
                        fontSize: "0.9em",
                      }}
                    >
                      <strong>Code:</strong> {product.productCode}
                    </p>
                    <p
                      style={{
                        margin: "10px 0",
                        color: "#555",
                        lineHeight: "1.5",
                      }}
                    >
                      {product.productDescription}
                    </p>
                    <div
                      style={{
                        marginTop: "15px",
                        padding: "10px 15px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "25px",
                        display: "inline-block",
                      }}
                    >
                      <strong style={{ color: "#007bff", fontSize: "1.1em" }}>
                        ${product.productRate}
                      </strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <button
                onClick={createSampleOrder}
                disabled={loading}
                style={{
                  padding: "15px 40px",
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(40,167,69,0.3)",
                  transition: "all 0.3s ease",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "⏳ Creating..." : "➕ Add Sample Order"}
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "20px",
              }}
            >
              {orders.length === 0 ? (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "60px",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ fontSize: "1.2em", color: "#666", margin: "0" }}>
                    📋 No orders yet. Click "Add Sample Order" to get started!
                  </p>
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: "white",
                      padding: "25px",
                      borderRadius: "15px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#28a745",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.5em",
                        marginBottom: "15px",
                      }}
                    >
                      📋
                    </div>
                    <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>
                      Order for {order.customerName}
                    </h3>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      <strong>📧 Email:</strong> {order.customerEmail}
                    </p>
                    <p style={{ margin: "5px 0", color: "#666" }}>
                      <strong>📅 Date:</strong>{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#28a745",
                          color: "white",
                          borderRadius: "20px",
                          fontSize: "0.9em",
                          textTransform: "uppercase",
                        }}
                      >
                        {order.status}
                      </div>
                      <div
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "25px",
                        }}
                      >
                        <strong style={{ color: "#28a745", fontSize: "1.1em" }}>
                          ${order.totalAmount}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
