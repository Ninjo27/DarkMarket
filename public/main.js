async function renderUserLogs() {
  if (!currentUser) { showAuthModal('login'); return; }
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/logs/${currentUser.username}`, { headers: { 'Authorization': `Bearer ${token}` } });
  const logs = await res.json();
  let html = `<h2>Lịch sử giao dịch</h2>
  <table class="admin-table"><tr><th>Thời gian</th><th>Loại</th><th>Chi tiết</th></tr>`;
  for (let log of logs) {
    html += `<tr>
      <td>${(new Date(log.time)).toLocaleString()}</td>
      <td>${log.type}</td>
      <td>${log.detail}</td>
    </tr>`;
  }
  html += "</table>";
  document.getElementById('page-logs').innerHTML = html;
}