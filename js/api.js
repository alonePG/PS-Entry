// api.js (ไม่ใช้ export แล้ว ใช้ global function แทน)

async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
  
    return await response.json();
  }
  