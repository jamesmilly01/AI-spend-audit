const raw = localStorage.getItem('auditData')

if (!raw) {
  window.location.href = 'index.html'
}

const data = JSON.parse(raw)

const { results, totalMonthlySavings, totalAnnualSavings } = runAuditEngine(data)

document.getElementById('heroMonthly').textContent =
  '$' + totalMonthlySavings.toLocaleString()

document.getElementById('heroAnnual').textContent =
  'ya $' + totalAnnualSavings.toLocaleString() + ' per year'

if (totalMonthlySavings > 500) {
  document.getElementById('credexBanner').style.display = 'block'
}

const list = document.getElementById('resultsList')

results.forEach(r => {
  const card = document.createElement('div')
  card.className = 'result-card'
  card.innerHTML = `
    <div class="result-header">
      <span class="result-tool-name">${r.tool}</span>
      <span class="badge ${r.status === 'save' ? 'badge-save' : r.status === 'warning' ? 'badge-warning' : 'badge-ok'}">
        ${r.status === 'save' ? '💰 Save $' + r.savings + '/mo' : r.status === 'warning' ? '⚠️ Check' : '✅ Optimal'}
      </span>
    </div>
    <div class="result-spend">Current spend: <strong>$${r.currentSpend}/mo</strong></div>
    <div class="result-reason">${r.recommendation}</div>
  `
  list.appendChild(card)
})

function captureEmail() {
  const email = document.getElementById('leadEmail').value
  if (!email || !email.includes('@')) {
    alert('Valid email dalo!')
    return
  }

  const auditId = Math.random().toString(36).substr(2, 9)
  localStorage.setItem('auditId', auditId)

  alert('Report email ho jayegi! (Backend kal add karenge)')
}