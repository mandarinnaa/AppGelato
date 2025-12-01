⭐ 1. Nombre del Proyecto
🍧 AppGelato – Sistema móvil de gestión para pastelería Sereno
⭐ 2. Descripción del Módulo (lo que hace tu aplicación)
📱 AppGelato es una aplicación móvil desarrollada en Ionic Angular diseñada para gestionar una pastelería digital.

Incluye:
🔐 Autenticación completa
Registro de usuarios
Login
Recuperación de contraseña
Uso de Firebase Authentication

🍰 Gestión de pasteles (CRUD)
Agregar pasteles
Subir imágenes (ImgBB API)
Editar stock
Eliminar pasteles

🛒 Carrito de compras funcional
Agregar productos
Eliminar productos
Guardado en localStorage
Actualización en tiempo real con BehaviorSubject

💳 Pasarela de pago
Implementación del SDK de PayPal
Botón dinámico
Total de compra en USD
Confirmación del pago

🧾 Generación de tickets en PDF
Uso de jsPDF + autoTable
Logo de la pastelería
Listado de productos
Fecha de compra
Total y mensaje final

📊 Dashboard optimizado
Bienvenida
Chef ilustrado
Diseño rosa pastel

📱 Compatibilidad móvil
App Android generada con Capacitor
APK list@ para instalación



🛠 Requerimientos
Node.js 18+
Ionic CLI
Angular CLI
Cuenta de Firebase
API key de ImgBB
Client ID PayPl

⚙️ Instalación
git clone https://github.com/mandarinnaa/AppGelato.git
cd AppGelato
npm install

🔧 Configurar environment.ts
Ve a:
src/environments/environment.ts
Y coloca tus valores:
firebaseConfig: { ... },
imgbbKey: 'AQUI_KEY',
paypalClientId: 'AQUI_CLIENT_ID'

▶️ Ejecutar en modo desarrollo
ionic serve

📱 Construir APK
ionic build
npx cap sync android
npx cap open android

En Android Studio:
Build → Build Bundle(s)/APK → Build APK
