// ui.js

/**
 * เล่นเสียงและแสดงข้อความแจ้งเตือน
 * @param {string} message - ข้อความที่จะแจ้ง
 * @param {boolean} playSound - เปิดเสียงหรือไม่ (default: true)
 */
function showToast(message, playSound = true) {
    if (playSound && config.successSound) {
      const audio = new Audio(config.successSound);
      audio.play().catch(() => {});
    }
    alert(message); // สามารถเปลี่ยนเป็น toast UI ภายหลังได้
  }
  
  /**
   * แสดงหรือซ่อนปุ่ม loading
   * @param {boolean} isLoading - true = ปิดปุ่ม + เปลี่ยนข้อความ
   * @param {string} btnId - id ของปุ่ม (default: "submitBtn")
   */
  function toggleLoading(isLoading, btnId = "submitBtn") {
    const btn = document.getElementById(btnId);
    if (!btn) return;
  
    btn.disabled = isLoading;
    btn.innerText = isLoading ? "กำลังบันทึก..." : "บันทึก";
  }
  
  /**
   * ล้างค่าฟอร์มทั้งหมด + รูป preview
   * @param {string} formId - id ของ <form> (default: "form")
   */
  function resetForm(formId = "form") {
    const form = document.getElementById(formId);
    if (form) form.reset();
  
    const preview = document.getElementById("previewImage");
    if (preview) preview.src = "";
  
    const vehiclePreview = document.getElementById("vehiclePreviewImage");
    if (vehiclePreview) vehiclePreview.src = "";
  }
  