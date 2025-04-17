// api.js

/**
 * ส่งข้อมูลแบบ POST ไปยัง Web App (Apps Script)
 * @param {string} url - URL ของ backend
 * @param {Object} payload - ข้อมูลที่ต้องการส่ง
 * @returns {Promise<Object>} - ผลลัพธ์จาก backend
 */
async function postData(url, payload) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
  
      return await res.json(); // ต้องให้ backend ตอบกลับ JSON
    } catch (err) {
      console.error("❌ postData error:", err);
      throw err;
    }
  }
  
  /**
   * ดึงข้อมูลแบบ GET จาก endpoint
   * ใช้สำหรับโหลดรายชื่อบ้าน หรืออื่น ๆ
   * @param {string} url
   * @returns {Promise<Object>}
   */
  async function getData(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    } catch (err) {
      console.error("❌ getData error:", err);
      throw err;
    }
  }
  