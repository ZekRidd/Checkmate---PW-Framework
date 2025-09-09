# Docker Kullanım Kılavuzu

Bu proje Docker ile her yerden kullanılabilir hale getirilmiştir.

## 🐳 Docker Kurulumu

### 1. Docker Build

```bash
# Docker image'ı oluştur
npm run docker:build
# veya
docker build -t checkmate-tests .
```

### 2. Docker Compose ile Çalıştırma

```bash
# Tüm servisleri başlat
docker-compose up

# Arka planda çalıştır
docker-compose up -d

# Belirli bir servisi çalıştır
docker-compose up checkmate-tests
docker-compose up planning-tests
docker-compose up configuration-tests
```

## 🚀 Kullanım Senaryoları

### 1. Tüm Testleri Çalıştır

```bash
# Docker Compose ile
docker-compose up checkmate-tests

# Docker run ile
npm run docker:run
```

### 2. Belirli Test Suite'ini Çalıştır

```bash
# Planning tests
docker-compose up planning-tests

# Configuration tests
docker-compose up configuration-tests
```

### 3. İnteraktif Kullanım

```bash
# Container'a bağlan
npm run docker:interactive

# Container içinde test çalıştır
npx playwright test tests/planning-page.spec.ts
```

## 📁 Volume Mounts

Docker container'ı aşağıdaki dosyaları mount eder:

- `./test-results` → `/app/test-results` (Test sonuçları)
- `./playwright-report` → `/app/playwright-report` (Raporlar)
- `./.env` → `/app/.env` (Environment variables)
- `./credentials.json` → `/app/credentials.json` (Gmail credentials)
- `./token.json` → `/app/token.json` (Gmail token)

## 🔧 Environment Variables

Container içinde aşağıdaki environment variables kullanılır:

```bash
NODE_ENV=production
HEADLESS_MODE=true
```

## 📊 Test Sonuçları

Test sonuçları host makinede aşağıdaki dizinlerde görülebilir:

- `./test-results/` - Test sonuçları
- `./playwright-report/` - HTML raporları

## 🛠️ Geliştirme

### Container İçinde Geliştirme

```bash
# İnteraktif mod
docker-compose run --rm checkmate-tests /bin/sh

# Container içinde
npm install
npx playwright test --headed
```

### Logs Görüntüleme

```bash
# Container logs
docker-compose logs checkmate-tests

# Real-time logs
docker-compose logs -f checkmate-tests
```

## 🚨 Sorun Giderme

### 1. Permission Issues

```bash
# Test results dizini için permission
sudo chown -R $USER:$USER test-results/
sudo chown -R $USER:$USER playwright-report/
```

### 2. Gmail Credentials

```bash
# Credentials dosyalarının varlığını kontrol et
ls -la credentials.json token.json
```

### 3. Environment Variables

```bash
# .env dosyasının varlığını kontrol et
ls -la .env
```

## 📋 Örnek Kullanım

```bash
# 1. Projeyi klonla
git clone <repository>
cd checkmate

# 2. Gmail credentials'ları ayarla
npm run setup-gmail

# 3. Docker image'ı oluştur
npm run docker:build

# 4. Testleri çalıştır
docker-compose up planning-tests

# 5. Sonuçları kontrol et
open playwright-report/index.html
```

## 🌐 Her Yerden Erişim

Bu Docker setup'ı ile proje:

- ✅ **Herhangi bir makinede** çalıştırılabilir
- ✅ **CI/CD pipeline'larında** kullanılabilir
- ✅ **Cloud platformlarında** deploy edilebilir
- ✅ **Takım üyeleri** arasında paylaşılabilir
- ✅ **Farklı ortamlarda** tutarlı çalışır
