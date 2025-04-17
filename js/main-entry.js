// main-entry.js

window.addEventListener("DOMContentLoaded", async () => {
    await populateHouseDropdown();
    syncIfOnline();
  
    const form = document.getElementById("form");
    form.addEventListener("submit", handleSubmit);
  
    const photoInput = document.getElementById("photo");
    if (photoInput) {
      photoInput.addEventListener("change", (e) => previewPhoto(e, "previewImage"));
    }
  
    const vehiclePhotoInput = document.getElementById("vehiclePhoto");
    if (vehiclePhotoInput) {
      vehiclePhotoInput.addEventListener("change", (e) => previewPhoto(e, "vehiclePreviewImage"));
    }
  });
  
  /**
   * โหลดรายชื่อบ้านจาก mock (หรือ API จริงภายหลัง)
   */
  async function populateHouseDropdown() {
    const houseSelect = document.getElementById("houseNo");
    const houses = ["88/1", "88/2", "88/3", "88/4", "99/1", "99/2"];
  
    houseSelect.innerHTML = houses.map(h => `<option value="${h}">${h}</option>`).join("\n");
  }
  
  /**
   * เมื่อผู้ใช้กด submit
   */
  async function handleSubmit(e) {
    e.preventDefault();
    toggleLoading(true);
  
    const formData = await collectFormData();
  
    try {
      await postData(config.entryUrl, formData);
      showToast("✅ บันทึกสำเร็จ");
      resetForm();
      setTimeout(() => window.location.href = "dashboard.html", 1000);
    } catch (err) {
      queueOffline(formData);
      showToast("📴 ไม่มีเน็ต บันทึกชั่วคราว", false);
    } finally {
      toggleLoading(false);
    }
  }
  
  /**
   * รวบรวมข้อมูลจากฟอร์ม
   * @returns {Object}
   */
  async function collectFormData() {
    const plate = document.getElementById("plate").value.trim();
    const houseNo = document.getElementById("houseNo").value;
    const purpose = document.getElementById("purpose").value;
    const note = document.getElementById("note").value.trim();
    const officer = config.officerName;
    const timeIn = new Date().toISOString();
  
    const photoFile = document.getElementById("photo").files[0];
    const vehiclePhotoFile = document.getElementById("vehiclePhoto").files[0];
  
    const imageBase64 = photoFile ? await toBase64(photoFile) : "";
    const vehicleImageBase64 = vehiclePhotoFile ? await toBase64(vehiclePhotoFile) : "";
  
    return {
      plate,
      houseNo,
      purpose,
      note,
      imageBase64,         // รูปบัตร
      vehicleImageBase64,  // รูปรถเข้า
      timeIn,
      officerIn: officer,
      status: "อยู่ภายใน"
    };
  }
  
  /**
   * แสดงภาพ preview จาก input[type="file"]
   */
  function previewPhoto(event, previewId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewId);
  
    if (file && preview) {
      const reader = new FileReader();
      reader.onload = e => preview.src = e.target.result;
      reader.readAsDataURL(file);
    }
  }
  
  /**
   * แปลงภาพเป็น base64
   * @param {File} file
   * @returns {Promise<string>}
   */
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  