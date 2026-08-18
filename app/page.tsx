"use client";

import { useState } from "react";

const products = [
  { name: "Gấu Mơ Màng", detail: "Màu kem · 55cm", description: "Bé gấu lông kem êm mịn, bụng tròn dễ ôm và vừa vặn để đồng hành trong những giấc ngủ thật ngon.", price: 459000, tag: "BÁN CHẠY", emoji: "🧸", tone: "cream" },
  { name: "Thỏ Bông Má Hồng", detail: "Màu hồng · 45cm", description: "Đôi tai dài mềm mại cùng đôi má hồng đáng yêu, là món quà ngọt ngào dành cho bé và người thương.", price: 389000, tag: "MỚI", emoji: "🐰", tone: "pink" },
  { name: "Capybara Ú Nu", detail: "Màu nâu · 40cm", description: "Dáng tròn ú nu, gương mặt thư thái và lớp bông đàn hồi giúp mọi khoảnh khắc nghỉ ngơi thêm dễ chịu.", price: 329000, tag: "HOT", emoji: "🤎", tone: "brown" },
  { name: "Gấu Dâu Ngọt Ngào", detail: "Màu dâu · 50cm", description: "Một chiếc ôm thơm màu dâu với chất bông cao cấp, mềm xốp và nổi bật trong mọi góc phòng.", price: 419000, tag: "-15%", emoji: "🍓", tone: "berry" },
];

const categories = [
  { name: "Gấu bông", note: "Ôm là mê", emoji: "🧸", color: "#f5c99f" },
  { name: "Thỏ bông", note: "Mềm như mây", emoji: "🐰", color: "#f4d8e6" },
  { name: "Capybara", note: "Chill hết nấc", emoji: "🤎", color: "#d8aa7d" },
  { name: "Quà tặng", note: "Gói trọn yêu thương", emoji: "🎁", color: "#cddcb6" },
];

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (value: number) => `${value.toLocaleString("vi-VN")}đ`;
  const cartItems = products.filter((item) => cart[item.name]).map((item) => ({ ...item, quantity: cart[item.name] }));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 499000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shipping;

  const addToCart = (name: string) => {
    setCart((value) => ({ ...value, [name]: (value[name] || 0) + 1 }));
    setNotice(`${name} đã vào giỏ hàng!`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const changeQuantity = (name: string, amount: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[name] || 0) + amount);
      const updated = { ...current };
      if (next === 0) delete updated[name]; else updated[name] = next;
      return updated;
    });
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const order = {
      id: `MB${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer: { name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), address: String(data.get("address") || ""), note: String(data.get("note") || "") },
      items: cartItems.map(({ name, detail, price, quantity, emoji }) => ({ name, detail, price, quantity, emoji })),
      subtotal,
      shipping,
      total,
      payment: "COD",
      status: "Mới",
    };
    const savedOrders = JSON.parse(window.localStorage.getItem("may-bong-orders") || "[]");
    window.localStorage.setItem("may-bong-orders", JSON.stringify([order, ...savedOrders]));
    setOrderPlaced(true);
    setCart({});
  };

  return (
    <main>
      {notice && <div className="toast" role="status">✓ {notice}</div>}
      <div className="topbar">Miễn phí giao hàng cho đơn từ 499K <span>♡</span> Đổi trả dễ dàng trong 7 ngày</div>
      <nav className="nav" aria-label="Điều hướng chính">
        <a className="brand" href="#top" aria-label="Mây Bông trang chủ"><span className="brand-mark">mb</span>Mây Bông</a>
        <div className="nav-links">
          <a href="#shop">Cửa hàng</a><a href="#collections">Bộ sưu tập</a><a href="#gift">Quà tặng</a><a href="#story">Câu chuyện</a>
        </div>
        <div className="nav-actions">
          <button aria-label="Tìm kiếm">⌕</button><button aria-label="Tài khoản">♙</button><button className="cart-button" onClick={() => { setOrderPlaced(false); setCheckoutOpen(true); }} aria-label={`Giỏ hàng có ${cartCount} sản phẩm`}>Túi <b>{cartCount}</b></button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">MỀM MẠI · AN TOÀN · ĐÁNG YÊU</p>
          <h1>Một cái ôm<br />cho mọi ngày.</h1>
          <p className="hero-text">Những người bạn bông mềm xinh được chọn lọc kỹ, sẵn sàng ôm bạn qua mọi niềm vui nhỏ.</p>
          <div className="hero-buttons"><a className="primary" href="#shop">Chọn bạn bông <span>→</span></a><a className="text-link" href="#collections">Xem bộ sưu tập <span>↗</span></a></div>
          <div className="trust"><span>✓ Bông cao cấp</span><span>✓ An toàn cho bé</span><span>✓ Gói quà miễn phí</span></div>
        </div>
        <div className="hero-art" aria-label="Gấu bông Mây Bông">
          <div className="blob blob-one"/><div className="blob blob-two"/>
          <div className="bear">
            <div className="ear left"/><div className="ear right"/><div className="bear-head"><i className="eye e1"/><i className="eye e2"/><i className="muzzle">ᴗ</i></div>
            <div className="bear-body"><span className="heart">♥</span></div><div className="arm a1"/><div className="arm a2"/>
          </div>
          <div className="love-note">gửi bạn<br/><b>một chiếc ôm</b> ♡</div>
          <div className="quality-badge">100%<small>MỀM ÊM</small></div>
        </div>
      </section>

      <section className="categories" id="collections">
        <div className="section-heading"><div><p className="eyebrow">TÌM NGƯỜI BẠN MỚI</p><h2>Bạn đang tìm ai?</h2></div><a href="#shop">Xem tất cả <span>→</span></a></div>
        <div className="category-grid">
          {categories.map((item) => <a href="#shop" className="category" key={item.name}><div className="category-art" style={{backgroundColor:item.color}}><span>{item.emoji}</span></div><h3>{item.name}</h3><p>{item.note} →</p></a>)}
        </div>
      </section>

      <section className="products" id="shop">
        <div className="section-heading"><div><p className="eyebrow">ĐƯỢC YÊU THÍCH NHẤT</p><h2>Những chiếc ôm bán chạy</h2></div><p className="section-note">Mỗi bạn bông đều được kiểm tra bằng tay trước khi đến với bạn.</p></div>
        <div className="product-grid">
          {products.map((item) => <article className="product-card" key={item.name}><div className={`product-art ${item.tone}`}><span className="tag">{item.tag}</span><button className="favorite" aria-label={`Yêu thích ${item.name}`}>♡</button><div className="product-emoji">{item.emoji}</div></div><div className="product-info"><div><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{formatPrice(item.price)}</strong></div><p className="product-description">{item.description}</p><button className="add" onClick={() => addToCart(item.name)}>Thêm vào giỏ <span>＋</span></button></article>)}
        </div>
      </section>

      {checkoutOpen && <div className="cart-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="cart-head"><div><p className="eyebrow">CHIẾC ÔM CỦA BẠN</p><h2 id="cart-title">Giỏ hàng</h2></div><button className="cart-close" onClick={() => setCheckoutOpen(false)} aria-label="Đóng giỏ hàng">×</button></div>
          {orderPlaced ? <div className="order-success"><span>✓</span><h3>Đặt hàng thành công!</h3><p>Mây Bông đã nhận được đơn hàng. Chúng mình sẽ gọi xác nhận và giao chiếc ôm đến bạn sớm nhất.</p><button className="primary" onClick={() => setCheckoutOpen(false)}>Tiếp tục mua sắm</button></div> : cartItems.length === 0 ? <div className="cart-empty"><span>🧸</span><h3>Giỏ hàng đang trống</h3><p>Hãy chọn một người bạn bông thật đáng yêu nhé.</p><button className="primary" onClick={() => setCheckoutOpen(false)}>Chọn sản phẩm</button></div> : <form className="checkout" onSubmit={submitOrder}>
            <div className="cart-list">
              {cartItems.map((item) => <div className="cart-item" key={item.name}><div className={`cart-thumb ${item.tone}`}>{item.emoji}</div><div className="cart-item-copy"><h3>{item.name}</h3><p>{item.detail}</p><strong>{formatPrice(item.price)}</strong><div className="quantity"><button type="button" onClick={() => changeQuantity(item.name, -1)} aria-label={`Giảm số lượng ${item.name}`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.name, 1)} aria-label={`Tăng số lượng ${item.name}`}>＋</button><button type="button" className="remove" onClick={() => changeQuantity(item.name, -item.quantity)}>Xóa</button></div></div></div>)}
            </div>
            <div className="checkout-form"><h3>Thông tin nhận hàng</h3><div className="form-grid"><label>Họ và tên<input name="name" required placeholder="Nguyễn Minh Anh" /></label><label>Số điện thoại<input name="phone" type="tel" required pattern="[0-9 +]{9,15}" placeholder="0901 234 567" /></label><label className="full">Địa chỉ giao hàng<input name="address" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" /></label><label className="full">Ghi chú<textarea name="note" rows={2} placeholder="Thời gian nhận hàng hoặc lời nhắn cho shop" /></label></div><h3>Thanh toán</h3><label className="payment-option"><input type="radio" name="payment" defaultChecked /><span><b>Thanh toán khi nhận hàng (COD)</b><small>Kiểm tra kiện hàng và thanh toán cho nhân viên giao hàng.</small></span></label></div>
            <div className="cart-summary"><div><span>Tạm tính</span><b>{formatPrice(subtotal)}</b></div><div><span>Phí giao hàng</span><b>{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</b></div><div className="total"><span>Tổng thanh toán</span><strong>{formatPrice(total)}</strong></div><button className="place-order" type="submit">Xác nhận đặt hàng · {formatPrice(total)}</button><p>Bằng việc đặt hàng, bạn đồng ý với chính sách giao hàng và đổi trả của Mây Bông.</p></div>
          </form>}
        </section>
      </div>}

      <section className="gift" id="gift">
        <div className="gift-art"><span className="gift-box">🎁</span><span className="gift-spark">✦</span><span className="gift-heart">♥</span></div>
        <div className="gift-copy"><p className="eyebrow">GÓI QUÀ BẰNG CẢ YÊU THƯƠNG</p><h2>Biến một chiếc ôm<br/>thành món quà.</h2><p>Thiệp viết tay, nơ xinh và hộp quà chỉn chu — chúng mình chuẩn bị mọi thứ để lời thương được gửi đi thật trọn vẹn.</p><a className="primary dark" href="#shop">Tạo hộp quà <span>→</span></a></div>
      </section>

      <section className="reviews" id="story">
        <p className="eyebrow">HƠN 12.000 CHIẾC ÔM ĐÃ ĐƯỢC GỬI ĐI</p><blockquote>“Bé gấu mềm hơn mình tưởng, đóng gói đẹp đến mức không nỡ mở. Người nhận cười suốt cả tối!”</blockquote><div className="stars">★★★★★</div><p className="reviewer">Minh Anh · TP. Hồ Chí Minh</p>
      </section>

      <footer><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">mb</span>Mây Bông</a><p>Những chiếc ôm mềm mại,<br/>gửi từ trái tim đến trái tim.</p></div><div><h4>Khám phá</h4><a href="#shop">Sản phẩm mới</a><a href="#shop">Bán chạy</a><a href="#gift">Hộp quà</a></div><div><h4>Hỗ trợ</h4><a href="#">Giao hàng</a><a href="#">Đổi trả</a><a href="#">Chăm sóc gấu</a></div><div className="newsletter"><h4>Nhận thư từ Mây</h4><p>Ưu đãi nhỏ và những câu chuyện đáng yêu.</p><form onSubmit={(e)=>{e.preventDefault();setNotice("Cảm ơn bạn đã đăng ký nhận tin!")}}><input type="email" required placeholder="Email của bạn" aria-label="Email"/><button>→</button></form></div></footer>
      <div className="copyright">© 2026 Mây Bông. Một thương hiệu nhỏ đầy yêu thương. <span><a href="mailto:hoanggiabaon905@gmail.com">hoanggiabaon905@gmail.com</a> · Instagram · TikTok · Facebook</span></div>
    </main>
  );
}
