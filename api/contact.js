module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwhSDepgG9UZdw6REPHfFjZs5oF-s-uhqfspdGRSD0YvanDlnlfjRH8R5jfeBdNQ0pY/exec';
  
  try {
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Google Script error:', errorText);
      return res.status(500).json({ error: 'Error saving to Google Sheets' });
    }
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
