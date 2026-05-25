export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        let body = req.body
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        const { email, company, total_monthly_savings, total_annual_savings, audit_data, share_id } = body
        if (!email) {
            return res.status(400).json({ error: 'Email is required' })
        }

        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
            return res.status(500).json({ error: 'Supabase credentials not set' })
        }

        const response = await fetch(
            `${process.env.SUPABASE_URL}/rest/v1/leads`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    email,
                    company: company || null,
                    total_monthly_savings,
                    total_annual_savings,
                    audit_data,
                    share_id
                })
            }
        )

        if (!response.ok) {
            const err = await response.text()
            throw new Error(err)
        }

        return res.status(200).json({ success: true })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}