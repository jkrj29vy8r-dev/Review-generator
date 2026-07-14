/**
 * UI translations for the platform interface.
 * Keys are English identifiers; values are translated strings.
 * Add all new UI strings here.
 */
export type TranslationKey =
  | "nav.dashboard"
  | "nav.reviews"
  | "nav.businesses"
  | "nav.analytics"
  | "nav.notifications"
  | "nav.settings"
  | "nav.admin"
  | "dashboard.title"
  | "dashboard.subtitle"
  | "dashboard.totalReviews"
  | "dashboard.avgRating"
  | "dashboard.replied"
  | "dashboard.unanswered"
  | "dashboard.timeSaved"
  | "dashboard.newReviews"
  | "reviews.title"
  | "reviews.subtitle"
  | "reviews.generateAI"
  | "reviews.publishGoogle"
  | "reviews.replied"
  | "reviews.unanswered"
  | "reviews.all"
  | "reviews.search"
  | "ai.generate"
  | "ai.regenerate"
  | "ai.tone"
  | "ai.language"
  | "ai.autoDetect"
  | "ai.forceLanguage"
  | "ai.variant"
  | "ai.edit"
  | "ai.publish"
  | "ai.rewrite"
  | "ai.shorter"
  | "ai.longer"
  | "ai.friendlier"
  | "ai.professional"
  | "ai.elegant"
  | "ai.empathetic"
  | "translate.button"
  | "translate.to"
  | "translate.result"
  | "common.save"
  | "common.cancel"
  | "common.loading"
  | "common.copy"
  | "common.copied"
  | "common.close"
  | "settings.title"
  | "settings.account"
  | "settings.notifications"
  | "settings.autoReply"
  | "settings.subscription";

export type Translations = Record<TranslationKey, string>;

const translations: Record<string, Translations> = {
  ro: {
    "nav.dashboard": "Dashboard",
    "nav.reviews": "Recenzii",
    "nav.businesses": "Afaceri",
    "nav.analytics": "Statistici",
    "nav.notifications": "Notificări",
    "nav.settings": "Setări",
    "nav.admin": "Admin Panel",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Bun venit! Iată ce se întâmplă cu recenziile tale.",
    "dashboard.totalReviews": "Total Recenzii",
    "dashboard.avgRating": "Rating Mediu",
    "dashboard.replied": "Răspunse",
    "dashboard.unanswered": "Nerăspunse",
    "dashboard.timeSaved": "Timp Economisit",
    "dashboard.newReviews": "Recenzii Noi",
    "reviews.title": "Recenzii",
    "reviews.subtitle": "Gestionează și răspunde la toate recenziile tale Google",
    "reviews.generateAI": "Generează răspuns AI",
    "reviews.publishGoogle": "Publică pe Google",
    "reviews.replied": "Răspuns publicat",
    "reviews.unanswered": "Nerăspuns",
    "reviews.all": "Toate",
    "reviews.search": "Caută în recenzii...",
    "ai.generate": "Generează 3 variante AI",
    "ai.regenerate": "Regenerează",
    "ai.tone": "Ton",
    "ai.language": "Limbă răspuns",
    "ai.autoDetect": "Auto Detect",
    "ai.forceLanguage": "Forțează limbă",
    "ai.variant": "Varianta",
    "ai.edit": "Editează răspunsul final",
    "ai.publish": "Publică pe Google",
    "ai.rewrite": "Rescrie",
    "ai.shorter": "Mai scurt",
    "ai.longer": "Mai lung",
    "ai.friendlier": "Mai prietenos",
    "ai.professional": "Mai profesionist",
    "ai.elegant": "Mai elegant",
    "ai.empathetic": "Mai empatic",
    "translate.button": "Traduce",
    "translate.to": "Traduce în",
    "translate.result": "Traducere",
    "common.save": "Salvează",
    "common.cancel": "Anulează",
    "common.loading": "Se încarcă...",
    "common.copy": "Copiază",
    "common.copied": "Copiat!",
    "common.close": "Închide",
    "settings.title": "Setări",
    "settings.account": "Cont",
    "settings.notifications": "Notificări",
    "settings.autoReply": "Auto Reply",
    "settings.subscription": "Abonament",
  },
  en: {
    "nav.dashboard": "Dashboard",
    "nav.reviews": "Reviews",
    "nav.businesses": "Businesses",
    "nav.analytics": "Analytics",
    "nav.notifications": "Notifications",
    "nav.settings": "Settings",
    "nav.admin": "Admin Panel",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Welcome back! Here's what's happening with your reviews.",
    "dashboard.totalReviews": "Total Reviews",
    "dashboard.avgRating": "Average Rating",
    "dashboard.replied": "Replied",
    "dashboard.unanswered": "Unanswered",
    "dashboard.timeSaved": "Time Saved",
    "dashboard.newReviews": "New Reviews",
    "reviews.title": "Reviews",
    "reviews.subtitle": "Manage and reply to all your Google reviews",
    "reviews.generateAI": "Generate AI reply",
    "reviews.publishGoogle": "Publish on Google",
    "reviews.replied": "Reply published",
    "reviews.unanswered": "Unanswered",
    "reviews.all": "All",
    "reviews.search": "Search reviews...",
    "ai.generate": "Generate 3 AI variants",
    "ai.regenerate": "Regenerate",
    "ai.tone": "Tone",
    "ai.language": "Reply language",
    "ai.autoDetect": "Auto Detect",
    "ai.forceLanguage": "Force language",
    "ai.variant": "Variant",
    "ai.edit": "Edit final reply",
    "ai.publish": "Publish on Google",
    "ai.rewrite": "Rewrite",
    "ai.shorter": "Shorter",
    "ai.longer": "Longer",
    "ai.friendlier": "Friendlier",
    "ai.professional": "More professional",
    "ai.elegant": "More elegant",
    "ai.empathetic": "More empathetic",
    "translate.button": "Translate",
    "translate.to": "Translate to",
    "translate.result": "Translation",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.loading": "Loading...",
    "common.copy": "Copy",
    "common.copied": "Copied!",
    "common.close": "Close",
    "settings.title": "Settings",
    "settings.account": "Account",
    "settings.notifications": "Notifications",
    "settings.autoReply": "Auto Reply",
    "settings.subscription": "Subscription",
  },
  fr: {
    "nav.dashboard": "Tableau de bord",
    "nav.reviews": "Avis",
    "nav.businesses": "Établissements",
    "nav.analytics": "Statistiques",
    "nav.notifications": "Notifications",
    "nav.settings": "Paramètres",
    "nav.admin": "Admin",
    "dashboard.title": "Tableau de bord",
    "dashboard.subtitle": "Bienvenue ! Voici ce qui se passe avec vos avis.",
    "dashboard.totalReviews": "Total Avis",
    "dashboard.avgRating": "Note Moyenne",
    "dashboard.replied": "Répondus",
    "dashboard.unanswered": "Sans réponse",
    "dashboard.timeSaved": "Temps Économisé",
    "dashboard.newReviews": "Nouveaux Avis",
    "reviews.title": "Avis",
    "reviews.subtitle": "Gérez et répondez à tous vos avis Google",
    "reviews.generateAI": "Générer une réponse IA",
    "reviews.publishGoogle": "Publier sur Google",
    "reviews.replied": "Réponse publiée",
    "reviews.unanswered": "Sans réponse",
    "reviews.all": "Tous",
    "reviews.search": "Rechercher des avis...",
    "ai.generate": "Générer 3 variantes IA",
    "ai.regenerate": "Régénérer",
    "ai.tone": "Ton",
    "ai.language": "Langue de réponse",
    "ai.autoDetect": "Détection auto",
    "ai.forceLanguage": "Forcer la langue",
    "ai.variant": "Variante",
    "ai.edit": "Modifier la réponse finale",
    "ai.publish": "Publier sur Google",
    "ai.rewrite": "Réécrire",
    "ai.shorter": "Plus court",
    "ai.longer": "Plus long",
    "ai.friendlier": "Plus convivial",
    "ai.professional": "Plus professionnel",
    "ai.elegant": "Plus élégant",
    "ai.empathetic": "Plus empathique",
    "translate.button": "Traduire",
    "translate.to": "Traduire en",
    "translate.result": "Traduction",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.loading": "Chargement...",
    "common.copy": "Copier",
    "common.copied": "Copié !",
    "common.close": "Fermer",
    "settings.title": "Paramètres",
    "settings.account": "Compte",
    "settings.notifications": "Notifications",
    "settings.autoReply": "Réponse automatique",
    "settings.subscription": "Abonnement",
  },
  de: {
    "nav.dashboard": "Dashboard",
    "nav.reviews": "Bewertungen",
    "nav.businesses": "Unternehmen",
    "nav.analytics": "Statistiken",
    "nav.notifications": "Benachrichtigungen",
    "nav.settings": "Einstellungen",
    "nav.admin": "Adminbereich",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Willkommen! Hier ist, was mit Ihren Bewertungen passiert.",
    "dashboard.totalReviews": "Bewertungen gesamt",
    "dashboard.avgRating": "Durchschnittsbewertung",
    "dashboard.replied": "Beantwortet",
    "dashboard.unanswered": "Unbeantwortet",
    "dashboard.timeSaved": "Gesparte Zeit",
    "dashboard.newReviews": "Neue Bewertungen",
    "reviews.title": "Bewertungen",
    "reviews.subtitle": "Verwalten und beantworten Sie alle Ihre Google-Bewertungen",
    "reviews.generateAI": "KI-Antwort generieren",
    "reviews.publishGoogle": "Auf Google veröffentlichen",
    "reviews.replied": "Antwort veröffentlicht",
    "reviews.unanswered": "Unbeantwortet",
    "reviews.all": "Alle",
    "reviews.search": "Bewertungen suchen...",
    "ai.generate": "3 KI-Varianten generieren",
    "ai.regenerate": "Neu generieren",
    "ai.tone": "Ton",
    "ai.language": "Antwortsprache",
    "ai.autoDetect": "Automatisch erkennen",
    "ai.forceLanguage": "Sprache erzwingen",
    "ai.variant": "Variante",
    "ai.edit": "Endgültige Antwort bearbeiten",
    "ai.publish": "Auf Google veröffentlichen",
    "ai.rewrite": "Umschreiben",
    "ai.shorter": "Kürzer",
    "ai.longer": "Länger",
    "ai.friendlier": "Freundlicher",
    "ai.professional": "Professioneller",
    "ai.elegant": "Eleganter",
    "ai.empathetic": "Empathischer",
    "translate.button": "Übersetzen",
    "translate.to": "Übersetzen nach",
    "translate.result": "Übersetzung",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.loading": "Lädt...",
    "common.copy": "Kopieren",
    "common.copied": "Kopiert!",
    "common.close": "Schließen",
    "settings.title": "Einstellungen",
    "settings.account": "Konto",
    "settings.notifications": "Benachrichtigungen",
    "settings.autoReply": "Automatische Antwort",
    "settings.subscription": "Abonnement",
  },
  es: {
    "nav.dashboard": "Panel",
    "nav.reviews": "Reseñas",
    "nav.businesses": "Negocios",
    "nav.analytics": "Estadísticas",
    "nav.notifications": "Notificaciones",
    "nav.settings": "Configuración",
    "nav.admin": "Admin",
    "dashboard.title": "Panel de control",
    "dashboard.subtitle": "¡Bienvenido! Aquí está lo que pasa con tus reseñas.",
    "dashboard.totalReviews": "Total Reseñas",
    "dashboard.avgRating": "Valoración Media",
    "dashboard.replied": "Respondidas",
    "dashboard.unanswered": "Sin responder",
    "dashboard.timeSaved": "Tiempo Ahorrado",
    "dashboard.newReviews": "Nuevas Reseñas",
    "reviews.title": "Reseñas",
    "reviews.subtitle": "Gestiona y responde a todas tus reseñas de Google",
    "reviews.generateAI": "Generar respuesta IA",
    "reviews.publishGoogle": "Publicar en Google",
    "reviews.replied": "Respuesta publicada",
    "reviews.unanswered": "Sin responder",
    "reviews.all": "Todas",
    "reviews.search": "Buscar reseñas...",
    "ai.generate": "Generar 3 variantes IA",
    "ai.regenerate": "Regenerar",
    "ai.tone": "Tono",
    "ai.language": "Idioma de respuesta",
    "ai.autoDetect": "Detección automática",
    "ai.forceLanguage": "Forzar idioma",
    "ai.variant": "Variante",
    "ai.edit": "Editar respuesta final",
    "ai.publish": "Publicar en Google",
    "ai.rewrite": "Reescribir",
    "ai.shorter": "Más corto",
    "ai.longer": "Más largo",
    "ai.friendlier": "Más amigable",
    "ai.professional": "Más profesional",
    "ai.elegant": "Más elegante",
    "ai.empathetic": "Más empático",
    "translate.button": "Traducir",
    "translate.to": "Traducir a",
    "translate.result": "Traducción",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.loading": "Cargando...",
    "common.copy": "Copiar",
    "common.copied": "¡Copiado!",
    "common.close": "Cerrar",
    "settings.title": "Configuración",
    "settings.account": "Cuenta",
    "settings.notifications": "Notificaciones",
    "settings.autoReply": "Respuesta automática",
    "settings.subscription": "Suscripción",
  },
};

// For languages without explicit translations, fall back to English
const fallback = translations["en"];

export function getTranslations(locale: string): Translations {
  return translations[locale] || fallback;
}

export function t(key: TranslationKey, locale: string): string {
  const dict = translations[locale] || fallback;
  return dict[key] || fallback[key] || key;
}

export { translations };
