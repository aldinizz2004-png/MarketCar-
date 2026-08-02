# MarketCar + MiroTalk Integration

موقع Marketplace تجريبي لعرض السيارات، مع زر يفتح غرفة MiroTalk للتواصل مع البائع.

## التشغيل

افتح ملف:

```text
index.html
```

مباشرة بالمتصفح، أو شغله بسيرفر محلي:

```bash
python3 -m http.server 8080
```

ثم افتح:

```text
http://127.0.0.1:8080
```

## تعديل رابط MiroTalk

افتح ملف:

```text
script.js
```

في أول الملف ستجد:

```javascript
const MIROTALK_BASE_URL = "https://CHANGE-ME.trycloudflare.com";
```

استبدله برابط Cloudflare الذي يظهر لك قبل المناقشة، مثل:

```javascript
const MIROTALK_BASE_URL = "https://example-name.trycloudflare.com";
```

لا تعدّل أي شيء آخر.

## آلية الربط

عند الضغط على زر "تواصل مع البائع عبر الفيديو":

1. يختار المستخدم سيارة.
2. يكتب اسمه.
3. ينشئ الموقع Room ID خاص بالسيارة والمستخدم.
4. يفتح رابط MiroTalk في نافذة جديدة.

مثال:

```text
https://example.trycloudflare.com/join/toyota-corolla-2021-izz-123456
```

## الملفات

```text
market-car-integration/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## ملاحظة

الأسعار والمواصفات الموجودة في الموقع تجريبية لأغراض العرض الأكاديمي.

Prepared by Izz Aldeen Mansour
