"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./admin.module.css";

type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string; note: string };
  items: { name: string; detail: string; price: number; quantity: number; emoji: string }[];
  total: number;
  payment: string;
  status: string;
};

const statuses = ["Mới", "Đã xác nhận", "Đang giao", "Hoàn thành", "Đã hủy"];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("Tất cả");
  const [lastUpdated, setLastUpdated] = useState("");

  const refreshOrders = () => {
    setOrders(JSON.parse(window.localStorage.getItem("may-bong-orders") || "[]"));
    setLastUpdated(new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  };

  useEffect(() => {
    setLoggedIn(window.sessionStorage.getItem("may-bong-admin") === "yes");
    refreshOrders();
    const syncOrders = (event?: StorageEvent) => { if (!event || event.key === "may-bong-orders") refreshOrders(); };
    const syncWhenVisible = () => { if (document.visibilityState === "visible") refreshOrders(); };
    window.addEventListener("storage", syncOrders);
    window.addEventListener("focus", refreshOrders);
    document.addEventListener("visibilitychange", syncWhenVisible);
    const timer = window.setInterval(refreshOrders, 3000);
    return () => {
      window.removeEventListener("storage", syncOrders);
      window.removeEventListener("focus", refreshOrders);
      document.removeEventListener("visibilitychange", syncWhenVisible);
      window.clearInterval(timer);
    };
  }, []);

  const saveOrders = (next: Order[]) => {
    setOrders(next);
    window.localStorage.setItem("may-bong-orders", JSON.stringify(next));
  };

  const updateStatus = (id: string, status: string) => saveOrders(orders.map((order) => order.id === id ? { ...order, status } : order));
  const filteredOrders = filter === "Tất cả" ? orders : orders.filter((order) => order.status === filter);
  const revenue = useMemo(() => orders.filter((order) => order.status !== "Đã hủy").reduce((sum, order) => sum + order.total, 0), [orders]);
  const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") === "admin" && data.get("password") === "maybong2026") {
      window.sessionStorage.setItem("may-bong-admin", "yes");
      setLoggedIn(true);
      setLoginError("");
    } else setLoginError("Tên đăng nhập hoặc mật khẩu chưa đúng.");
  };

  if (!loggedIn) return <main className={styles.loginPage}><form className={styles.loginCard} onSubmit={login}><div className={styles.logo}>mb</div><p>QUẢN LÝ CỬA HÀNG</p><h1>Mây Bông Admin</h1><label>Tên đăng nhập<input name="username" required autoComplete="username" /></label><label>Mật khẩu<input name="password" type="password" required autoComplete="current-password" /></label>{loginError && <div className={styles.error}>{loginError}</div>}<button>Đăng nhập</button><a href="/may-bong/">← Quay lại cửa hàng</a></form></main>;

  return <main className={styles.admin}><aside><div className={styles.adminBrand}><span>mb</span><div><b>Mây Bông</b><small>Quản trị cửa hàng</small></div></div><nav><a className={styles.active}>▦ Tổng quan</a><a>🧸 Sản phẩm</a><a>□ Đơn hàng</a><a href="/may-bong/">↗ Xem cửa hàng</a></nav><button className={styles.logout} onClick={() => { window.sessionStorage.removeItem("may-bong-admin"); setLoggedIn(false); }}>Đăng xuất</button></aside><section className={styles.content}><header><div><p>TRUNG TÂM QUẢN LÝ</p><h1>Đơn hàng</h1></div><div className={styles.avatar}>AD</div></header><div className={styles.stats}><article><span>Tổng đơn hàng</span><strong>{orders.length}</strong><small>Tất cả đơn trên thiết bị này</small></article><article><span>Đơn mới</span><strong>{orders.filter((order) => order.status === "Mới").length}</strong><small>Đang chờ xác nhận</small></article><article><span>Doanh thu dự kiến</span><strong>{formatPrice(revenue)}</strong><small>Không gồm đơn đã hủy</small></article></div><div className={styles.orders}><div className={styles.ordersHead}><div><h2>Danh sách đơn hàng</h2><p>Tự động cập nhật mỗi 3 giây{lastUpdated && ` · Lần cuối ${lastUpdated}`}.</p></div><div className={styles.orderActions}><button type="button" onClick={refreshOrders}>↻ Làm mới</button><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>Tất cả</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div></div>{filteredOrders.length === 0 ? <div className={styles.empty}><span>📦</span><h3>Chưa có đơn hàng</h3><p>Hãy đặt thử một đơn tại cửa hàng bằng cùng trình duyệt này. Đơn mới sẽ tự xuất hiện trong tối đa 3 giây.</p></div> : <div className={styles.orderList}>{filteredOrders.map((order) => <article className={styles.order} key={order.id}><div className={styles.orderTop}><div><b>#{order.id}</b><span>{new Date(order.createdAt).toLocaleString("vi-VN")}</span></div><select value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div><div className={styles.orderBody}><div><h3>{order.customer.name}</h3><p>{order.customer.phone}</p><p>{order.customer.address}</p>{order.customer.note && <small>Ghi chú: {order.customer.note}</small>}</div><div className={styles.itemList}>{order.items.map((item) => <div key={item.name}><span>{item.emoji}</span><p><b>{item.name}</b><small>{item.detail} · SL {item.quantity}</small></p></div>)}</div><div className={styles.orderTotal}><span>{order.payment}</span><strong>{formatPrice(order.total)}</strong></div></div></article>)}</div>}</div></section></main>;
}
