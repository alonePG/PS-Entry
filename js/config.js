// config.js

const config = {
  // URL สำหรับเรียก backend (Google Apps Script Web App URL)
  entryUrl: "https://script.google.com/macros/s/AKfycbwaHhlycGjXypL05n58PAiVuZKZN7peAV5AMk9TnlJFsf4vTGcBDlvghpPwCQVwSXU/exec",
  checkoutUrl: "https://script.google.com/macros/s/CHECKOUT_SCRIPT_ID/exec",
  houseListUrl: "https://script.google.com/macros/s/HOUSE_LIST_SCRIPT_ID/exec?action=houses",

  // ชื่อ รปภ. ที่ใช้ในการบันทึก
  officerName: "แพ็ค",

  // ตั้งค่าคีย์ localStorage
  localKeys: {
    cachedHouses: "houses"
  },

  // ตั้งค่าอื่น ๆ
  successSound: "https://media.vocaroo.com/mp3/16O6YCTv88bJ",
  logoUrl: "https://i.imgur.com/QEBYa5H.png"
};
