import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        profile: "Profile",
        settings: "Settings",
        signOut: "Sign Out",
      },
      sidebar: {
        home: "Home",
        search: "Search",
        history: "History",
        analytics: "Analytics",
        chat: "Chat",
        recentSearches: "Recent Searches",
      },
      search: {
        placeholder: "Search products or paste URL...",
        searchButton: "Search",
        voiceButton: "Voice Search",
      },
      product: {
        price: "Price",
        originalPrice: "Original Price",
        discount: "Discount",
        rating: "Rating",
        reviews: "Reviews",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        negotiate: "Negotiate Price",
        addToCart: "Add to Cart",
      },
      chat: {
        placeholder: "Type your message...",
        send: "Send",
        startVoice: "Start Voice Chat",
        stopVoice: "Stop Voice Chat",
      },
      settings: {
        title: "Settings",
        account: "Account Settings",
        theme: "Theme",
        language: "Language",
        notifications: "Notifications",
        privacy: "Privacy",
        security: "Security",
        data: "Data Management",
      },
    },
  },
  es: {
    translation: {
      navbar: {
        profile: "Perfil",
        settings: "Configuración",
        signOut: "Cerrar Sesión",
      },
      sidebar: {
        home: "Inicio",
        search: "Buscar",
        history: "Historial",
        analytics: "Análisis",
        chat: "Chat",
        recentSearches: "Búsquedas Recientes",
      },
      search: {
        placeholder: "Buscar productos o pegar URL...",
        searchButton: "Buscar",
        voiceButton: "Búsqueda por Voz",
      },
      product: {
        price: "Precio",
        originalPrice: "Precio Original",
        discount: "Descuento",
        rating: "Calificación",
        reviews: "Reseñas",
        inStock: "En Stock",
        outOfStock: "Agotado",
        negotiate: "Negociar Precio",
        addToCart: "Agregar al Carrito",
      },
      chat: {
        placeholder: "Escribe tu mensaje...",
        send: "Enviar",
        startVoice: "Iniciar Chat de Voz",
        stopVoice: "Detener Chat de Voz",
      },
      settings: {
        title: "Configuración",
        account: "Configuración de Cuenta",
        theme: "Tema",
        language: "Idioma",
        notifications: "Notificaciones",
        privacy: "Privacidad",
        security: "Seguridad",
        data: "Gestión de Datos",
      },
    },
  },
  // Add more languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
