"use client";

import { useState } from "react";

const products = [
  { name: "Gấu Mơ Màng", detail: "Màu kem · 55cm", price: "459.000đ", tag: "BÁN CHẠY", emoji: "🧸", tone: "cream" },
  { name: "Thỏ Bông Má Hồng", detail: "Màu hồng · 45cm", price: "389.000đ", tag: "MỚI", emoji: "🐰", tone: "pink" },
  { name: "Capybara Ú Nu", detail: "Màu nâu · 40cm", price: "329.000đ", tag: "HOT", emoji: "🤎", tone: "brown" },
  { name: "Gấu Dâu Ngọt Ngào", detail: "Màu dâu · 50cm", price: "419.000đ", tag: "-15%", emoji: "🍓", tone: "berry" },
];

const categories = [
  { name: "Gấu bông", note: "Ôm là mê", emoji: "🧸", color: "#f5c99f" },
  { name: "Thỏ bông", note: "Mềm như mây", emoji: "🐰", color: "#f4d8e6" },
  { name: "Capybara", note: "Chill hết nấc", emoji: "🤎", color: "#d8aa7d" },
  { name: "Quà tặng", note: "Gói trọn yêu thương", emoji: "🎁", color: "#cddcb6" },
];

export default function Home() {
  const [cart, setCart] = useState(0);
  const [notice, setNotice] = useState("");

  const addToCart = (name: string) => {
    setCart((value) => value + 1);
    setNotice(`${name} đã vào giỏ hàng!`);
    window.setTimeout(() => setNotice(""), 2200);
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
          <button aria-label="Tìm kiếm">⌕</button><button aria-label="Tài khoản">♙</button><button className="cart-button" aria-label={`Giỏ hàng có ${cart} sản phẩm`}>Túi <b>{cart}</b></button>
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
          {products.map((item) => <article className="product-card" key={item.name}><div className={`product-art ${item.tone}`}><span className="tag">{item.tag}</span><button className="favorite" aria-label={`Yêu thích ${item.name}`}>♡</button><div className="product-emoji">{item.emoji}</div></div><div className="product-info"><div><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{item.price}</strong></div><button className="add" onClick={() => addToCart(item.name)}>Thêm vào giỏ <span>＋</span></button></article>)}
        </div>
      </section>

      <section className="gift" id="gift">
        <div className="gift-art"><span className="gift-box">🎁</span><span className="gift-spark">✦</span><span className="gift-heart">♥</span></div>
        <div className="gift-copy"><p className="eyebrow">GÓI QUÀ BẰNG CẢ YÊU THƯƠNG</p><h2>Biến một chiếc ôm<br/>thành món quà.</h2><p>Thiệp viết tay, nơ xinh và hộp quà chỉn chu — chúng mình chuẩn bị mọi thứ để lời thương được gửi đi thật trọn vẹn.</p><a className="primary dark" href="#shop">Tạo hộp quà <span>→</span></a></div>
      </section>

      <section className="reviews" id="story">
        <p className="eyebrow">HƠN 12.000 CHIẾC ÔM ĐÃ ĐƯỢC GỬI ĐI</p><blockquote>“Bé gấu mềm hơn mình tưởng, đóng gói đẹp đến mức không nỡ mở. Người nhận cười suốt cả tối!”</blockquote><div className="stars">★★★★★</div><p className="reviewer">Minh Anh · TP. Hồ Chí Minh</p>
      </section>

      <footer><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark">mb</span>Mây Bông</a><p>Những chiếc ôm mềm mại,<br/>gửi từ trái tim đến trái tim.</p></div><div><h4>Khám phá</h4><a href="#shop">Sản phẩm mới</a><a href="#shop">Bán chạy</a><a href="#gift">Hộp quà</a></div><div><h4>Hỗ trợ</h4><a href="#">Giao hàng</a><a href="#">Đổi trả</a><a href="#">Chăm sóc gấu</a></div><div className="newsletter"><h4>Nhận thư từ Mây</h4><p>Ưu đãi nhỏ và những câu chuyện đáng yêu.</p><form onSubmit={(e)=>{e.preventDefault();setNotice("Cảm ơn bạn đã đăng ký nhận tin!")}}><input type="email" required placeholder="Email của bạn" aria-label="Email"/><button>→</button></form></div></footer>
      <div className="copyright">© 2026 Mây Bông. Một thương hiệu nhỏ đầy yêu thương. <span>Instagram · TikTok · Facebook</span></div>
    </main>
  );
}
