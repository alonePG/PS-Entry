// storage.js

/**
 * เก็บข้อมูลลง queue ใน localStorage ถ้า offline
 * @param {Object} data - ข้อมูลที่ต้องส่ง
 */
function queueOffline(data) {
    const queueKey = config.localKeys.offlineQueue;
    const queue = JSON.parse(localStorage.getItem(queueKey) || "[]");
    queue.push(data);
    localStorage.setItem(queueKey, JSON.stringify(queue));
  }
  
  /**
   * พยายาม sync ข้อมูลทั้งหมดใน queue ถ้าออนไลน์
   */
  async function syncIfOnline() {
    if (!navigator.onLine) return;
  
    const queueKey = config.localKeys.offlineQueue;
    const queue = JSON.parse(localStorage.getItem(queueKey) || "[]");
    if (queue.length === 0) return;
  
    const successList = [];
  
    for (let data of queue) {
      try {
        await postData(config.entryUrl, data);
        successList.push(data);
      } catch (err) {
        console.warn("❌ Sync failed for:", data);
      }
    }
  
    const remaining = queue.filter(d => !successList.includes(d));
    localStorage.setItem(queueKey, JSON.stringify(remaining));
  }
  
  /**
   * โหลดรายชื่อบ้าน (แบบแคชไว้ใน localStorage 1 ชั่วโมง)
   * @returns {Promise<Array>} รายชื่อบ้าน
   */
  async function loadHousesWithCache() {
    const key = config.localKeys.cachedHouses;
    const cached = JSON.parse(localStorage.getItem(key) || "{}");
  
    const oneHour = 1000 * 60 * 60;
    const now = Date.now();
  
    if (cached.ts && now - cached.ts < oneHour && cached.data) {
      return cached.data;
    }
  
    try {
      const res = await getData(config.houseListUrl);
      localStorage.setItem(key, JSON.stringify({ ts: now, data: res }));
      return res;
    } catch (err) {
      console.warn("⚠️ โหลดรายชื่อบ้านล้มเหลว ใช้ข้อมูลเก่าถ้ามี");
      return cached.data || [];
    }
  }
  