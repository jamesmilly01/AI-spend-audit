const PRICING = { 
    chatgpt: {
        plus: {monthlyCost: 20, perSeat: false},
        team: {monthlyCost: 25, perSeat: true},
        enterprise: {monthlyCost: 60, perSeat: true},
        api: {monthlyCost: null, perSeat: false}
    },
    claude: {
        pro: { monthlyCost: 20, perSeat: false },
        max: { monthlyCost: 100, perSeat: false },
        team: { monthlyCost: 25, perSeat: true },
        enterprise: { monthlyCost: null, perSeat: false },
        api: { monthlyCost: null, perSeat: false }
    },
    cursor: {
        hobby: { monthlyCost: 0, perSeat: false },
        pro: { monthlyCost: 20, perSeat: false },
        business: { monthlyCost: 40, perSeat: true },
        enterprise: { monthlyCost: null, perSeat: false }
    },
    copilot: {
        individual: { monthlyCost: 10, perSeat: false },
        business: { monthlyCost: 19, perSeat: true },
        enterprise: { monthlyCost: 39, perSeat: true }
    },
    gemini: {
        pro: { monthlyCost: 19.99, perSeat: false },
        ultra: { monthlyCost: null, perSeat: false },
        api: { monthlyCost: null, perSeat: false }
    }
}

function runAuditEngine(data){
    const results = []
    const {teamSize, useCase} = data
    const seats = parseInt(teamSize) || 1

    if(data.chatgpt.plan){
        const r = auditChatGPT(data.chatgpt, seats, useCase)
        results.push(r)
    }
    if(data.claude.plan){
        const r = auditClaude(data.claude, seats, useCase)
        results.push(r)
    }
    if(data.cursor.plan){
        const r = auditCursor(data.cursor, seats, useCase)
        results.push(r)
    }
    if (data.copilot.plan) {
        const r = auditCopilot(data.copilot, seats, useCase)
        results.push(r)
    }
    if (data.gemini.plan) {
        const r = auditGemini(data.gemini, seats, useCase)
        results.push(r)
    }

    const codingTools = [
        data.cursor.plan ? 'Cursor' : null,
        data.copilot.plan ? 'GitHub Copilot' : null
    ].filter(Boolean)

    if(codingTools.length > 1 && useCase === 'coding'){
        results.push({
            tool: 'Duplicate Coding Tools',
            plan: codingTools.join(' + '),
            CurrentSpend: 0,
            savings: Math.round(
                (data.cursor.spend + data.copilot.spend) * 0.5
            ),
            recommendation: `you are using both ${codingTools.join('and')} choose one to save cost`,
            status: 'warning'
        })
    }

    const totalMonthlySavings = results.reduce(
        (sum, r) => sum + (r.savings || 0), 0
    )
    return {
        results, 
        totalMonthlySavings,
        totalAnnualSavings: totalMonthlySavings * 12
    }

}
function auditChatGPT(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

     if (plan === 'plus' && seats > 1) {
        const teamCost = seats * 25
        savings = Math.max(0, spend - teamCost)
        recommendation = `a ChatGpt Team Plan for ${seats} users :  (${seats} × $25 = $${teamCost}/mo) better fit`
        status = 'save'
    } 
    else if (plan === 'team' && seats <= 2) {
        const plusCost = seats * 20
        savings = Math.max(0, spend - plusCost)
        recommendation = `For only ${seats} user this Team plan is an overkill — take individual Plus plans ($${plusCost}/mo)`
        status = 'save'
    }
    else if (plan === 'enterprise' && teamSize < 10) {
        savings = Math.round(spend * 0.35)
        recommendation = 'Enterprise features are rarely useful for small teams — Try Team plan '
        status = 'save'
    }
    else {
    recommendation = 'your plans are correct — no obvious savings'
    status = 'ok'
    }

    return {
        tool: 'ChatGPT',
        plan,
        currentSpend: spend,
        savings,
        recommendation,
        status
    }
}

function auditClaude(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'max' && useCase !== 'api') {
    // Max plan mostly heavy API users ke liye
        savings = Math.round(spend - 20)
        recommendation = 'Claude Max are mostly for heavy users — Pro plan ($20/mo) can handle most use cases'
        status = 'save'
    } 
    else if (plan === 'team' && seats <= 2) {
        const proCost = seats * 20
        savings = Math.max(0, spend - proCost)
        recommendation = `It's an overkill for ${seats} users — individual Pro plans are ($${proCost}/mo total) better value`
        status = 'save'
    }
    else if (plan === 'pro' && seats > 5) {
        const teamCost = seats * 25
        savings = Math.max(0, spend - teamCost)
        recommendation = `Claude Team plan ($${teamCost}/mo) will provide better value for bigger teams`
        status = 'save'
    }
    else {
        recommendation = 'Claude spend looks good — no obvious savings'
        status = 'ok'
    }

    return {
        tool: 'Claude',
        plan,
        currentSpend: spend,
        savings,
        recommendation,
        status
    }
}

function auditCopilot(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'enterprise' && seats < 10) {
        const bizCost = seats * 19
        savings = Math.max(0, spend - bizCost)
        recommendation = `Enterprise features does not justify for ${seats} users — Business plan ($${bizCost}/mo) is a better fit`
        status = 'save'
    } 
    else if (plan === 'business' && seats === 1) {
        savings = spend - 10
        recommendation = 'for single developer Individual plan ($10/mo) is enough'
        status = 'save'
    }
    
    else {
        recommendation = 'Copilot plan seems fine — no obvious savings'
        status = 'ok'
    }

    return {
        tool: 'GitHub Copilot',
        plan,
        currentSpend: spend,
        savings,
        recommendation,
        status
    }
}
function auditGemini(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'pro' && useCase === 'coding') {
        savings = Math.round(spend * 0.6)
        recommendation = 'for coding Cursor or Copilot are better than gemini'
        status = 'save'
    } 
    else if (plan === 'ultra') {
        savings = Math.round(spend * 0.4)
        recommendation = 'the cost of Gemini Ultra is high — compare Pro plan or Claude Max'
        status = 'save'
    } 
    else {
        recommendation = 'Gemini spend seems reasonable'
        status = 'ok'
    }

    return {
        tool: 'Gemini',
        plan,
        currentSpend: spend,
        savings,
        recommendation,
        status
    }
}
function auditCursor(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'business' && seats <= 3) {
        const proCost = seats * 20
        savings = Math.max(0, spend - proCost)
        recommendation = `For ${seats} devs, Cursor Business is overkill — Pro plan (${seats} × $20 = $${proCost}/mo) is enough`
        status = 'save'
    } else if (plan === 'pro' && useCase === 'writing') {
        savings = Math.round(spend * 0.5)
        recommendation = 'For writing, Cursor is overkill — Claude Pro or ChatGPT Plus is better'
        status = 'save'
    } else if (plan === 'hobby') {
        recommendation = 'Free plan — already optimal!'
        status = 'ok'
    } else {
        recommendation = 'Cursor plan looks fine for your usage'
        status = 'ok'
    }

    return { tool: 'Cursor', plan, currentSpend: spend, savings, recommendation, status }
}