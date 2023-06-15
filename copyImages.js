const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

const sourceDir = path.join(__dirname, 'src', 'resim'); // Resimlerin kaydedildiği klasör
const destinationDir = path.join(__dirname, 'public', 'resimler'); // Kopyalanacak hedef klasör

// Resimleri kopyala ve hedef klasöre kaydet
function copyImages() {
  fs.copy(sourceDir, destinationDir)
    .then(() => {
      console.log('Resimler başarıyla kopyalandı ve kaydedildi.');
    })
    .catch((error) => {
      console.error('Resim kopyalama ve kaydetme işlemi sırasında bir hata oluştu:', error);
    });
}

// Resimleri kopyalamayı tetikleyen fonksiyonu tanımla
function handleImageChange() {
  console.log('Resim değişiklikleri algılandı. Resimleri kopyalama işlemi başlatılıyor...');
  copyImages();
}

// Resim klasörünü izle ve değişiklikleri algıla
const watcher = chokidar.watch(sourceDir);
watcher.on('all', (event, filePath) => {
  console.log(`Dosya değişikliği algılandı: ${event} - ${filePath}`);
  handleImageChange();
});

console.log('Resim izleme işlemi başlatıldı.');
