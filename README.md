# 🔐 RBAC-Enabled Next.js Authentication System

Bu proje, Next.js 15 App Router mimarisi ve Auth0 entegrasyonu ile geliştirilmiş, JWT tabanlı session yönetimine sahip modern bir **Role-Based Access Control (RBAC)** sistemidir.

---

## 🚀 Özellikler

- 🔐 **Auth0 OAuth Entegrasyonu** (Google, GitHub gibi sağlayıcılar)
- 🧠 **JWT Tabanlı Oturum Yönetimi** (NextAuth.js)
- 🛡️ **Middleware ile Sayfa Erişim Kontrolü**
- 👥 **Admin Panel: Kullanıcıları Listele, Rol Ata**
- ⚙️ **Auth0 Management API Entegrasyonu**
- 💅 **TailwindCSS**

---

## 🧰 Kullanılan Teknolojiler

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [NextAuth.js](https://authjs.dev)
- [Auth0](https://auth0.com)
- [TailwindCSS](https://tailwindcss.com)
- TypeScript

---

## 📦 Kurulum

### 1. Bu repoyu klonla:

git clone https://github.com/murat-aydin01/cms-next-app  
cd cms-next-app  
npm install  

### 2. Auth0 yapılandırması:

Auth0 Dashboard'da single page app oluşturun.  
M2M uygulaması oluşturun ve Auth0 Management API erişimini verin.  
read:users, update:users, read:roles izinlerini verin.  
Kullanıcıya admin rolü atayın.  

### 3. Auth0 uygulama ayarları:
- Allowed Callback URLs: http://localhost:3000/api/auth/callback/auth0  
- Allowed Logout URLs: http://localhost:3000  
- Allowed Web Origins: http://localhost:3000  

### 4. .env dosyası oluştur:
AUTH_SECRET="secret" # npx auth secret  
AUTH_AUTH0_ID=auth0-id  
AUTH_AUTH0_SECRET=auth0-secret  
AUTH_AUTH0_ISSUER=https://auth0-id.auth0.com  

AUTH0_MANAGEMENT_CLIENT_ID=auth0-management-client-id  
AUTH0_MANAGEMENT_CLIENT_SECRET=auth0-management-client-secret  
AUTH0_MANAGEMENT_AUDIENCE=https://auth0-id.auth0.com/api/v2/  
AUTH0_DOMAIN=auth0-id.auth0.com  

### 5. Uygulamayı başlat:
npm run dev  
