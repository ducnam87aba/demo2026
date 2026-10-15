const studentTabs = ['Học', 'Khám phá', 'Nhiệm vụ', 'Thành tích', 'Hồ sơ'];

export function App() {
  return <div className="layout">
    <aside><strong>ABA Skills 360</strong><nav aria-label="Điều hướng học sinh">{studentTabs.map((tab, index) => <a className={index === 0 ? 'active' : ''} href={`#${index}`} key={tab}>{tab}</a>)}</nav></aside>
    <main><span className="badge">DỮ LIỆU MINH HỌA · CHƯA KIỂM ĐỊNH</span><p className="eyebrow">Xin chào, học sinh demo</p><h1>Hôm nay mình cùng tiến thêm một bước nhé!</h1><section><p>Chặng hiện tại</p><h2>Hiểu cảm xúc của mình</h2><p>Nội dung nền tảng W01. Luồng khảo sát và hồ sơ năng lực sẽ được triển khai theo các gói tiếp theo.</p><button type="button" disabled>Tiếp tục — sắp có</button></section></main>
  </div>;
}