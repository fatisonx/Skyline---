// إنشاء الخريطة وتحديد مركزها
var map = L.map('map').setView([23.8859, 45.0792], 6); // مركز السعودية

// إضافة طبقة الخريطة
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// بيانات المدن ونسبة الخطر
var cities = {
  "الرياض": { lat: 24.7136, lon: 46.6753, risk: 5 },
  "جدة": { lat: 21.4858, lon: 39.1925, risk: 35 },
  "الأحساء": { lat: 25.383, lon: 49.586, risk: 12 }, 
  "مكة":        { lat: 21.3891, lon: 39.8579, risk: 30 },
  "المدينة":     { lat: 24.5247, lon: 39.5692, risk: 28 },
  "ينبع":       { lat: 24.0899, lon: 38.0637, risk: 32 },
  "تبوك":       { lat: 28.3838, lon: 36.5662, risk: 18 },
  "نجران":      { lat: 17.5650, lon: 44.2289, risk: 10 },
  "أبها":       { lat: 18.2465, lon: 42.5117, risk: 15 },
  "جازان":      { lat: 16.8892, lon: 42.5706, risk: 20 },
  "الطائف":     { lat: 21.2854, lon: 40.4256, risk: 25 },
  "حائل":       { lat: 27.5114, lon: 41.7208, risk: 8 },
  "الخبر":      { lat: 26.2172, lon: 50.1971, risk: 6 },
  "الدمام":     { lat: 26.4207, lon: 50.0888, risk: 7 },
  "عرعر":       { lat: 30.9813, lon: 41.0380, risk: 5 },
  /// مدن عالمية
  "إسطنبول":     { lat: 41.0082, lon: 28.9784, risk: 85 },
  "طهران":       { lat: 35.6892, lon: 51.3890, risk: 80 },
  "كاتماندو":    { lat: 27.7172, lon: 85.3240, risk: 90 },
  "سان فرانسيسكو": { lat: 37.7749, lon: -122.4194, risk: 88 },
  "طوكيو":       { lat: 35.6762, lon: 139.6503, risk: 92 },
  "أثينا":       { lat: 37.9838, lon: 23.7275, risk: 60 },
  "الجزائر":     { lat: 36.7538, lon: 3.0588, risk: 55 },
  "باريس":       { lat: 48.8566, lon: 2.3522, risk: 10 },
  "نيو دلهي":     { lat: 28.6139, lon: 77.2090, risk: 50 },
  "لوس أنجلوس":  { lat: 34.0522, lon: -118.2437, risk: 75 }
};

// إضافة علامات المدن
for (var city in cities) {
  var data = cities[city];
  var color = data.risk > 30 ? 'red' : data.risk > 10 ? 'orange' : 'green';

  var marker = L.circleMarker([data.lat, data.lon], {
    radius: 10,
    color: color,
    fillColor: color,
    fillOpacity: 0.7
  }).addTo(map);

  marker.bindPopup(`<b>${city}</b><br>نسبة الخطر: ${data.risk}%`);

  // تنبيه إذا كانت المدينة خطرة
  (function(cityName, cityData) {
    marker.on('click', function () {
      if (cityData.risk > 30) {
        alert(`⚠️ تنبيه: ${cityName} تعتبر منطقة خطرة! نسبة الخطر ${cityData.risk}%`);
      }
    });
  })(city, data);
}
