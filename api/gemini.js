module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        let body = req.body
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        const { prompt } = body
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        )

        if (!response.ok) {
            const errText = await response.text()
            throw new Error(`Gemini error: ${response.status} — ${errText}`)
        }

        const data = await response.json()

        if (!data.candidates || !data.candidates[0]) {
            throw new Error('No response from Gemini')
        }

        const text = data.candidates[0].content.parts[0].text

        return res.status(200).json({ summary: text })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}