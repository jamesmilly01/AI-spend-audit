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
                if(seatEl) seatEl.value = data[tool].seats || 1
                if(spendEl) spendEl.value = data[tool].spend || 0
            }
        })
    }
});

document.getElementById('auditform').addEventListener('submit', (e) => {
    e.preventDefault()

    const auditData = {}
    TOOLS.forEach(tool => {
        auditData[tool] = {
            plan: document.getElementById(tool+'_plan').value,
            seats: document.getElementById(tool+'_seats').value || 1,
            spend: document.getElementById(tool+'_spend').value || 0
        }
    }) 
    auditData.teamSize = document.getElementById('teamSize').value
    auditData.useCase = document.getElementById('useCase').value

    localStorage.setItem('auditData', JSON.stringify(auditData))
    window.location.href = 'results.html'
});