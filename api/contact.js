export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { firstName, lastName, email, phone, company, message } = req.body;
  
  const supabaseUrl = 'https://rglndnpztzkprbzhpcyr.supabase.co';
  const supabaseKey = 'sb_publishable_TlRqwTCnYU5gWtfpzwJdug_N9pKMvJM'; // anon/public key provided by user
  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal' // don't return the inserted row
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        company: company,
        message: message
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);
      return res.status(500).json({ error: errorText });
    }
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
