const TOOLS = ['chatgpt', 'claude', 'cursor', 'copilot', 'gemini']

window.addEventListener('load', () => {
    const saved = localStorage.getItem('auditData')
    if(saved){
        const data = JSON.parse(saved)
        TOOLS.forEach(tool => {
            const planEl = document.getElementById(tool + '_plan')
            const seatsEl = document.getElementById(tool + '_seats')
            const spendEl = document.getElementById(tool + '_spend')
            if(data[tool]){
                if(planEl) planEl.value = data[tool].plan || ''
                if(seatsEl) seatsEl.value = data[tool].seats || 1
                if(spendEl) spendEl.value = data[tool].spend || 0
            }
        })
    }
});

document.getElementById('auditForm').addEventListener('submit', (e) => {
    e.preventDefault()

    const auditData = {}
    TOOLS.forEach(tool => {
        auditData[tool] = {
            plan: document.getElementById(tool+'_plan').value,
            seats: parseInt(document.getElementById(tool+'_seats').value || 1),
            spend: parseFloat(document.getElementById(tool+'_spend').value || 0)
        }
    }) 
    auditData.teamSize = parseInt(document.getElementById('teamSize').value || 1)
    auditData.useCase = document.getElementById('useCase').value

    localStorage.setItem('auditData', JSON.stringify(auditData))
    localStorage.removeItem('auditSummary')
    window.location.href = 'results.html'
});