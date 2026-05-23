function loadFromURL() {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('audit')
    if (!encoded) return false
    
    try {
        const publicData = JSON.parse(decodeURIComponent(escape(atob(encoded))))
        
        document.getElementById('heroMonthly').textContent =
            '$' + publicData.totalMonthlySavings.toLocaleString()
        document.getElementById('heroAnnual').textContent =
            'or $' + publicData.totalAnnualSavings.toLocaleString() + ' per year'
        
        const list = document.getElementById('resultsList')
        Object.entries(publicData.tools).forEach(([toolName, r]) => {
            const card = document.createElement('div')
            card.className = 'result-card'
            card.innerHTML = `
                <div class="result-header">
                    <span class="result-tool-name">${toolName}</span>
                    <span class="badge ${r.status === 'save' ? 'badge-save' : r.status === 'warning' ? 'badge-warning' : 'badge-ok'}">
                        ${r.status === 'save' ? '💰 Save $' + r.savings + '/mo' : r.status === 'warning' ? '⚠️ Check' : '✅ Optimal'}
                    </span>
                </div>
                <div class="result-reason">${r.recommendation}</div>
            `
            list.appendChild(card)
        })
        
        document.querySelector('.email-section').style.display = 'none'
        
        if (publicData.totalMonthlySavings > 500) {
            document.getElementById('credexBanner').style.display = 'block'
        }
        
        return true
    } catch(e) {
        return false
    }
}

// Page load pe check karo
const isSharedView = loadFromURL()
const raw = localStorage.getItem('auditData')

if(!isSharedView){
  if (!raw) {
  window.location.href = 'index.html'
}
else{
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
 const shareURL = generateShareableURL(results, totalMonthlySavings, totalAnnualSavings)
localStorage.setItem('shareURL', shareURL)
}
}
function generateShareableURL(results, totalMonthlySavings, totalAnnualSavings) {
    const raw = localStorage.getItem('auditData')
    if (!raw) return ''
    
    const data = JSON.parse(raw)
    const publicData = {
        tools: {},
        totalMonthlySavings,
        totalAnnualSavings
    }
    
    results.forEach(r => {
        publicData.tools[r.tool] = {
            savings: r.savings,
            status: r.status,
            recommendation: r.recommendation
        }
    })
    
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(publicData))))
    const url = window.location.origin + '/results.html?audit=' + encoded
    return url
}

function copyShareLink() {
    const url = localStorage.getItem('shareURL')
    if(!url){
      alert('please run the audit first!')
      return
    }
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('shareBtn')
        btn.textContent = '✅ Copied!'
        setTimeout(() => btn.textContent = '🔗 Copy Share Link', 2000)
    })
}
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