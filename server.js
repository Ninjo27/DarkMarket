const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'darkmarket_secret_123';

// Khi đăng nhập thành công:
const token = jwt.sign({ username: u.username, isAdmin: u.username === adminUser }, JWT_SECRET, { expiresIn: '12h' });
res.json({ success: true, user: { username: u.username, xu: u.xu, pendingXu: u.pendingXu }, token });

// Middleware bảo vệ route:
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
  try {
    const payload = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Đăng nhập đã hết hạn, vui lòng đăng nhập lại." });
  }
}

// Áp dụng middleware cho các route cần bảo vệ, ví dụ:
app.post('/api/buy', auth, ...);
app.post('/api/spin', auth, ...);
app.get('/api/users', auth, ...); // chỉ admin
// ...

// Trên frontend, sau khi đăng nhập thành công:
localStorage.setItem('token', data.token);

// Khi gọi các API cần bảo vệ:
const token = localStorage.getItem('token');
const res = await fetch(API_BASE + "/buy", {
  method: "POST",
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  body: ...
});

// Nếu bị 401, gọi logoutUser() và báo hết hạn đăng nhập