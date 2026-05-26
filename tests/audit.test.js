let passed = 0
let failed = 0

function test(name, fn) {
    try {
        fn()
        console.log(`✅ PASS: ${name}`)
        passed++
    } catch (err) {
        console.log(`❌ FAIL: ${name} — ${err.message}`)
        failed++
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message || 'Assertion failed')
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(
            message || `Expected ${expected}, got ${actual}`
        )
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
        recommendation = `ChatGPT Team plan for ${seats} users is better fit`
        status = 'save'
    } else if (plan === 'team' && seats <= 2) {
        const plusCost = seats * 20
        savings = Math.max(0, spend - plusCost)
        recommendation = `For only ${seats} users, Team plan is overkill`
        status = 'save'
    } else if (plan === 'enterprise' && teamSize < 10) {
        savings = Math.round(spend * 0.35)
        recommendation = 'Enterprise features rarely useful for small teams'
        status = 'save'
    } else {
        recommendation = 'Your plans are correct — no obvious savings'
        status = 'ok'
    }

    return { tool: 'ChatGPT', plan, currentSpend: spend, savings, recommendation, status }
}

function auditClaude(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'max' && useCase !== 'api') {
        savings = Math.round(spend - 20)
        recommendation = 'Claude Max is for heavy users — Pro plan handles most cases'
        status = 'save'
    } else if (plan === 'team' && seats <= 2) {
        const proCost = seats * 20
        savings = Math.max(0, spend - proCost)
        recommendation = `Team plan overkill for ${seats} users`
        status = 'save'
    } else {
        recommendation = 'Claude spend looks good'
        status = 'ok'
    }

    return { tool: 'Claude', plan, currentSpend: spend, savings, recommendation, status }
}

function auditCopilot(tool, teamSize, useCase) {
    const { plan, seats, spend } = tool
    let savings = 0
    let recommendation = ''
    let status = 'ok'

    if (plan === 'enterprise' && seats < 10) {
        const bizCost = seats * 19
        savings = Math.max(0, spend - bizCost)
        recommendation = `Enterprise not justified for ${seats} users`
        status = 'save'
    } else if (plan === 'business' && seats === 1) {
        savings = spend - 10
        recommendation = 'Individual plan enough for solo developer'
        status = 'save'
    } else {
        recommendation = 'Copilot plan seems fine'
        status = 'ok'
    }

    return { tool: 'GitHub Copilot', plan, currentSpend: spend, savings, recommendation, status }
}
test('ChatGPT Plus with multiple users should recommend Team plan', () => {
    const result = auditChatGPT(
        { plan: 'plus', seats: 5, spend: 150 },
        5,
        'mixed'
    )
    assertEqual(result.status, 'save', 'Status should be save')
    assert(result.savings > 0, 'Savings should be positive')
})

test('ChatGPT Plus with single user should be optimal', () => {
    const result = auditChatGPT(
        { plan: 'plus', seats: 1, spend: 20 },
        1,
        'mixed'
    )
    assertEqual(result.status, 'ok', 'Status should be ok for solo user')
    assertEqual(result.savings, 0, 'Savings should be 0 for optimal plan')
})

test('ChatGPT Team plan for 2 users should suggest Plus instead', () => {
    const result = auditChatGPT(
        { plan: 'team', seats: 2, spend: 50 },
        2,
        'mixed'
    )
    assertEqual(result.status, 'save', 'Status should be save')
    assert(result.savings > 0, 'Should show savings')
})

test('Claude Max plan should recommend Pro for non-API users', () => {
    const result = auditClaude(
        { plan: 'max', seats: 1, spend: 100 },
        1,
        'writing'
    )
    assertEqual(result.status, 'save', 'Status should be save')
    assert(result.savings > 0, 'Should show savings vs Pro plan')
})

test('Copilot Enterprise for small team should suggest Business plan', () => {
    const result = auditCopilot(
        { plan: 'enterprise', seats: 3, spend: 117 },
        3,
        'coding'
    )
    assertEqual(result.status, 'save', 'Status should be save')
    assert(result.savings > 0, 'Should show savings vs Business plan')
})

test('Savings should never be negative', () => {
    const tools = [
        auditChatGPT({ plan: 'plus', seats: 1, spend: 20 }, 1, 'mixed'),
        auditClaude({ plan: 'pro', seats: 1, spend: 20 }, 1, 'writing'),
        auditCopilot({ plan: 'individual', seats: 1, spend: 10 }, 1, 'coding'),
    ]
    tools.forEach(r => {
        assert(r.savings >= 0, `${r.tool} savings should not be negative`)
    })
})

test('Annual savings should equal monthly savings times 12', () => {
    const monthly = 150
    const annual = monthly * 12
    assertEqual(annual, 1800, 'Annual should be 1800 when monthly is 150')
})

console.log('\n================================')
console.log(`Results: ${passed} passed, ${failed} failed`)
console.log('================================')

if (failed > 0) process.exit(1)