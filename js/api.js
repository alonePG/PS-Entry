/**
 * ส่งข้อมูลแบบ x-www-form-urlencoded ไปยัง Google Apps Script
 * ใช้ได้กับ Web App ที่เปิดให้ Everyone access
 * รองรับ CORS โดยไม่ต้องตั้งค่าเพิ่มเติม
 */

/**
 * ส่งข้อมูล entry
 * @param {string} url - URL ของ Web App (entryUrl)
 * @param {Object} formDataObject - ข้อมูลที่รวบรวมจากแบบฟอร์ม
 * @returns {Promise<string>} - ข้อความตอบกลับจาก server
 */
export async function postData(url, formDataObject) {
    const data = new URLSearchParams();
    for (const [key, value] of Object.entries(formDataObject)) {
      data.append(key, value);
    }
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString()
    });
  
    if (!res.ok) {
      throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  
    return await res.text(); // หรือ .json() ถ้า backend ส่ง JSON
  }
  