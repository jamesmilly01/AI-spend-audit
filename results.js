const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
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
                        ${r.status === 'save' ? 'Save $' + r.savings + '/mo' : r.status === 'warning' ? 'Check' : 'Optimal'}
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

var { results, totalMonthlySavings, totalAnnualSavings } = runAuditEngine(data)

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
        ${r.status === 'save' ? 'Save $' + r.savings + '/mo' : r.status === 'warning' ? 'Check' : 'Optimal'}
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
        btn.textContent = 'Copied!'
        setTimeout(() => btn.textContent = 'Copy Share Link', 2000)
    })
}
async function generateAISummary(results, totalMonthlySavings, totalAnnualSavings) {
const cachedSummary = localStorage.getItem('auditSummary')
if (cachedSummary) {
    summaryDiv.innerHTML = `<p>${cachedSummary}</p>`
    return
}
    const summaryDiv = document.getElementById('summaryText')
    
    if (isSharedView) return

    try {
        const toolsList = results.map(r => 
            `${r.tool}: spending $${r.currentSpend}/mo, potential saving $${r.savings}/mo — ${r.recommendation}`
        ).join('\n')

        const prompt = `You are an AI spend optimization expert. A startup has completed an AI tool audit with these results:

${toolsList}

Total potential monthly savings: $${totalMonthlySavings}
Total potential annual savings: $${totalAnnualSavings}

Write a concise 80-100 word personalized summary of their AI spending situation. Be specific, mention actual numbers, and give one clear action they should take first. Be direct and professional, not salesy.`

        const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    }
)

if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
}

const data = await response.json()

if (!data.candidates || !data.candidates[0]) {
    throw new Error('No response from Gemini')
}

const text = data.candidates[0].content.parts[0].text
summaryDiv.innerHTML = `<p>${text}</p>`
localStorage.setItem('auditSummary', text)


    } catch (err) {
        console.error('Gemini API error:', err)
        summaryDiv.innerHTML = `
            <p>
                Your audit identified <strong>$${totalMonthlySavings}/month</strong> 
                in potential savings across ${results.length} tools. 
                ${totalMonthlySavings > 0 
                    ? `The biggest opportunity is to review your current plans — switching to better-fit tiers could save you $${totalAnnualSavings} annually.`
                    : `Your current AI tool selection appears well-optimized for your team size and use case.`
                }
            </p>
        `
    }
}
async function captureEmail() {
    const email = document.getElementById('leadEmail').value
    const company = document.getElementById('leadCompany').value

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email!')
        return
    }

    const btn = document.querySelector('.email-section .btn-primary')
    btn.textContent = 'Saving...'
    btn.disabled = true

    try {
        const shareId = Math.random().toString(36).substr(2, 9)

        const { error } = await supabaseClient
            .from('leads')
            .insert({
                email: email,
                company: company || null,
                total_monthly_savings: totalMonthlySavings,
                total_annual_savings: totalAnnualSavings,
                audit_data: JSON.parse(localStorage.getItem('auditData')),
                share_id: shareId
            })

        if (error) throw error

        btn.textContent = 'Saved!'
        document.querySelector('.email-section').innerHTML = `
            <h3>Report Saved!</h3>
            <p>Your audit has been saved successfully.</p>
        `

    } catch (err) {
        console.error('Error saving lead:', err)
        btn.textContent = 'Try Again'
        btn.disabled = false
        alert('Something went wrong. Please try again.')
    }
}
generateAISummary(results, totalMonthlySavings, totalAnnualSavings)