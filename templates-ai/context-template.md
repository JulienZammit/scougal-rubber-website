````markdown
# 📚 CONTEXTE COMPLET - SITE WEB SCOUGAL RUBBER

> **FICHIER DE RÉFÉRENCE** : Ce fichier contient l'intégralité du contexte technique et architectural du site web Scougal Rubber. Il doit être inclus en début de toute conversation pour fournir à l'IA une compréhension complète de l'écosystème.

---

## 🏗️ ARCHITECTURE GÉNÉRALE

### Vue d'ensemble du système Scougal Rubber
Scougal Rubber est un site web corporate B2B pour une entreprise industrielle spécialisée dans la fabrication de pièces en caoutchouc moulé sur mesure depuis 1916. Le site web est construit avec Next.js 14 et intègre un système de blog avec gestion de contenu interne.

**Principe fondamental** : Site web vitrine optimisé SEO avec système de blog intégré et outil de gestion de contenu interne pour l'équipe marketing.

### Infrastructure et Déploiement
- **Framework** : Next.js 14 avec App Router
- **Hébergement** : Déploiement sur serveur avec build statique optimisé
- **Port de développement** : 3000 (next dev)
- **Port de production** : 8080 (serveur standalone)
- **Build** : Génération statique avec standalone output
- **Assets** : Stockage local et Azure Blob Storage pour les images du blog

## 🎯 STANDARDS DE DÉVELOPPEMENT

### Conventions de Code
- **Langue** : ANGLAIS pour les commentaires et documentation
- **Naming Convention** : camelCase pour les variables et fonctions, PascalCase pour les composants React
- **Structure** : Séparation claire entre composants côté client et serveur
- **Styling** : Tailwind CSS avec composants UI personnalisés
- **Validation** : Validation côté client avec react-hook-form

### Standards SEO et Performance
- **Métadonnées** : Optimisation complète avec OpenGraph, Twitter Cards, structured data
- **Sitemap** : Génération automatique avec sitemap.js
- **Robots.txt** : Configuration automatique
- **Images** : Optimisation avec next/image et formats WebP
- **Performance** : Lazy loading, code splitting, compression

## 🎯 STACK TECHNIQUE

### Frontend et Framework
- **Next.js 14** : Framework React avec App Router, Server Components
- **React 18** : Hooks, Context API, Suspense
- **TypeScript** : Pas utilisé actuellement (JavaScript pur)
- **Tailwind CSS** : Framework CSS utilitaire avec configuration personnalisée
- **Framer Motion** : Animations et transitions fluides

### UI et Composants
- **Preline UI** : Composants UI pré-construits
- **Headless UI** : Composants accessibles sans style
- **Lucide React** : Icônes SVG modernes
- **React Icons** : Bibliothèque d'icônes supplémentaires
- **React Modal** : Modales et pop-ups
- **React Slick** : Carrousels et sliders

### Gestion de Contenu et Blog
- **Gray Matter** : Parsing du front matter des fichiers Markdown
- **React Markdown** : Rendu des contenus Markdown en React
- **Remark** : Traitement des fichiers Markdown
- **NextAuth.js** : Authentification pour l'outil de gestion de blog
- **Azure Blob Storage** : Stockage des images du blog

### Communication et Intégrations
- **Nodemailer** : Envoi d'emails pour le formulaire de contact
- **Leaflet** : Cartes interactives pour la localisation
- **React Leaflet** : Intégration React pour les cartes
- **AOS** : Animation on scroll
- **React Intersection Observer** : Détection de visibilité des éléments

## 📋 STRUCTURE DU PROJET

### Architecture des Dossiers
```
scougal-rubber-website/
├── app/                        # Next.js App Router
│   ├── layout.js              # Layout principal avec métadonnées
│   ├── page.js                # Page d'accueil
│   ├── globals.css            # Styles globaux
│   ├── MainPageClient.js      # Composant client page d'accueil
│   ├── LayoutClient.js        # Layout côté client
│   ├── providers.jsx          # Providers React (Auth, Toast)
│   ├── robots.js              # Génération robots.txt
│   ├── sitemap.js             # Génération sitemap
│   ├── api/                   # API Routes Next.js
│   │   ├── auth/              # Authentification NextAuth
│   │   ├── ai/                # Intégration IA pour le blog
│   │   ├── generate-post/     # Génération d'articles
│   │   ├── list-posts/        # Listing des articles
│   │   ├── get-post/          # Récupération d'un article
│   │   ├── delete-post/       # Suppression d'articles
│   │   ├── upload-image/      # Upload d'images vers Azure
│   │   ├── list-categories/   # Gestion des catégories
│   │   ├── submit-application/ # Formulaire emploi
│   │   └── linkedin-latest-posts/ # Intégration LinkedIn
│   ├── blog/                  # Section blog public
│   │   ├── page.js            # Page listing blog
│   │   ├── BlogPageClient.js  # Composant client blog
│   │   └── [slug]/            # Pages d'articles dynamiques
│   ├── blog-management/       # Outil de gestion interne
│   │   ├── page.js            # Page de gestion
│   │   └── BlogManagementPageClient.js # Interface de gestion
│   ├── bearing-pads/          # Page produit paliers
│   ├── rubber-parts/          # Page produit pièces caoutchouc
│   ├── ramps/                 # Page produit rampes
│   ├── steel/                 # Page produit acier
│   ├── company/               # Page entreprise
│   ├── experience/            # Page expérience
│   ├── projects/              # Page projets
│   ├── contact-us/            # Page contact
│   └── employment/            # Page emploi
├── components/                # Composants React réutilisables
│   ├── Header.jsx             # Navigation principale
│   ├── Footer.jsx             # Pied de page
│   ├── Hero.jsx               # Section héro
│   ├── CallToAction.jsx       # Boutons d'action
│   ├── GoogleMap.jsx          # Cartes Google Maps
│   ├── AnimatedModal.jsx      # Modales animées
│   ├── FadeInAnimation.jsx    # Animations d'apparition
│   ├── LinkedInPostGrid.jsx   # Grille posts LinkedIn
│   ├── blog/                  # Composants spécifiques au blog
│   │   ├── ArticleCreation.jsx # Création d'articles
│   │   ├── BlogContentBuilder.jsx # Constructeur de contenu
│   │   ├── MetadataForm.jsx   # Formulaire métadonnées
│   │   ├── PostsListManager.jsx # Gestion des articles
│   │   └── BlockItem.jsx      # Blocs de contenu
│   └── ui/                    # Composants UI de base
├── service/                   # Services et utilitaires
│   ├── posts.js               # Gestion des articles (fichiers)
│   └── postsAzure.js          # Gestion des articles (Azure)
├── public/                    # Assets statiques
│   ├── logo/                  # Logos de l'entreprise
│   ├── about/                 # Images section À propos
│   ├── bearing/               # Images produits paliers
│   ├── rubber/                # Images produits caoutchouc
│   ├── project/               # Images projets
│   ├── employees/             # Photos employés
│   ├── certification/         # Certificats et labels
│   └── blog/                  # Images articles de blog
├── templates-ai/              # Templates pour l'IA
│   └── context-template.md    # Ce fichier de contexte
└── example/                   # Exemples et documentation
```

## 🎯 PAGES ET FONCTIONNALITÉS

### 1. Page d'Accueil (/)
**Fichiers** : `app/page.js`, `app/MainPageClient.js`
**Fonctionnalités** :
- Hero section avec animation et CTA
- Présentation des produits principaux
- Témoignages clients et certifications
- Intégration posts LinkedIn récents
- Optimisation SEO complète avec structured data

**Métadonnées SEO** :
- Title optimisé avec mots-clés industrie
- Description riche avec historique entreprise
- OpenGraph pour réseaux sociaux
- Structured data Organisation et Website

### 2. Pages Produits
**Pages** : `/bearing-pads`, `/rubber-parts`, `/ramps`, `/steel`
**Architecture** : Chaque page a un fichier `page.js` (Server Component) et `[Product]Client.js` (Client Component)

**Fonctionnalités communes** :
- Hero section spécifique au produit
- Galerie d'images avec slider
- Spécifications techniques détaillées
- Projets de référence
- Formulaire de devis intégré
- Métadonnées SEO optimisées par produit

### 3. Pages Entreprise
**Pages** : `/company`, `/experience`, `/projects`
**Contenu** :
- Histoire de l'entreprise (depuis 1916)
- Équipe et expertises
- Galerie de projets avec études de cas
- Certifications et labels qualité
- Localisation et installations

### 4. Système de Blog (/blog)
**Architecture** :
- **Blog public** : `/blog` avec listing et `/blog/[slug]` pour les articles
- **Gestion interne** : `/blog-management` avec authentification

**Fonctionnalités publiques** :
- Listing des articles avec pagination
- Système de catégories et tags
- Recherche et filtres
- Articles connexes automatiques
- Partage réseaux sociaux
- Optimisation SEO par article

**Système de gestion interne** :
- Authentification NextAuth avec credentials
- Éditeur WYSIWYG avec blocs de contenu
- Upload d'images vers Azure Blob Storage
- Gestion des métadonnées SEO
- Prévisualisation avant publication
- Système de brouillons

### 5. Pages Utilitaires
**Contact** : `/contact-us` avec formulaire et carte interactive
**Emploi** : `/employment` avec formulaire de candidature
**Sitemap** : Génération automatique `/sitemap.xml`
**Robots** : Configuration automatique `/robots.txt`

## 🔧 SYSTÈME DE BLOG AVANCÉ

### Architecture du Blog
Le blog utilise un système hybride avec deux modes de fonctionnement :
- **Fichiers Markdown** : Pour le contenu statique (service/posts.js)
- **Azure Blob Storage** : Pour les articles dynamiques (service/postsAzure.js)

### Workflow de Création d'Articles
```
1. Connexion via /blog-management (NextAuth)
   ↓
2. Interface de création avec deux onglets :
   - Métadonnées (SEO, images, catégories)
   - Contenu (éditeur par blocs)
   ↓
3. Upload d'images vers Azure Blob Storage
   ↓
4. Génération du fichier Markdown avec front matter
   ↓
5. Sauvegarde et publication automatique
```

### Composants de Gestion
- **MetadataForm** : Formulaire complet pour les métadonnées SEO
- **BlogContentBuilder** : Constructeur de contenu par blocs
- **BlockItem** : Blocs individuels (texte, image, code, citation)
- **ArticleCreation** : Interface principale de création
- **PostsListManager** : Gestion et édition des articles existants

### Types de Blocs de Contenu
- **Texte** : Paragraphes avec formatage Markdown
- **Image** : Upload et intégration d'images
- **Code** : Blocs de code avec coloration syntaxique
- **Citation** : Citations avec attribution
- **Liste** : Listes à puces ou numérotées
- **Titre** : Titres H2, H3, H4 pour la structure

### Optimisation SEO du Blog
- **Métadonnées complètes** : Title, description, canonical, OpenGraph
- **Structured data** : Article, Author, Organization
- **Images optimisées** : Alt text, lazy loading, formats WebP
- **URL structure** : Slugs SEO-friendly
- **Mots-clés** : Système de tags intégré

## 📡 API ROUTES ET INTÉGRATIONS

### API Routes Next.js
- **`/api/auth/[...nextauth]`** : Authentification NextAuth
- **`/api/generate-post`** : Création d'articles avec validation
- **`/api/list-posts`** : Listing des articles avec pagination
- **`/api/get-post/[slug]`** : Récupération d'un article spécifique
- **`/api/delete-post`** : Suppression d'articles (admin)
- **`/api/upload-image`** : Upload vers Azure Blob Storage
- **`/api/list-categories`** : Gestion des catégories
- **`/api/submit-application`** : Formulaire de candidature
- **`/api/linkedin-latest-posts`** : Intégration LinkedIn
- **`/api/ai`** : Intégration IA pour génération de contenu

### Intégrations Externes
- **Azure Blob Storage** : Stockage des images du blog
- **LinkedIn API** : Récupération des posts récents
- **Google Maps** : Cartes interactives pour la localisation
- **Nodemailer** : Envoi d'emails pour les formulaires
- **IA (OpenAI)** : Génération de contenu et suggestions

## 🎨 SYSTÈME DE DESIGN

### Tailwind CSS Configuration
- **Couleurs personnalisées** : Palette de couleurs Scougal Rubber
- **Animations** : Aurora effect, fade-in, slide-in
- **Composants** : Boutons, cards, modales standardisés
- **Responsive** : Mobile-first avec breakpoints personnalisés

### Composants UI Réutilisables
- **CallToAction** : Boutons d'action avec variants
- **AnimatedModal** : Modales avec animations Framer Motion
- **FadeInAnimation** : Wrapper d'animation d'apparition
- **ProductDisplay** : Affichage produits standardisé
- **Pagination** : Navigation entre pages

### Système d'Icônes
- **Lucide React** : Icônes modernes et cohérentes
- **React Icons** : Icônes spécialisées (réseaux sociaux, industrie)
- **Icônes personnalisées** : Logos et symboles spécifiques

## 🔒 SÉCURITÉ ET AUTHENTIFICATION

### NextAuth.js Configuration
- **Provider** : Credentials avec username/password
- **Session** : JWT strategy pour les sessions
- **Protection** : Pages `/blog-management` protégées
- **Variables d'environnement** : Credentials sécurisés

### Sécurité des Formulaires
- **Validation** : Côté client avec react-hook-form
- **Sanitisation** : Nettoyage des inputs utilisateur
- **Rate limiting** : Protection contre le spam
- **CSRF** : Protection intégrée Next.js

## 📊 MONITORING ET ANALYTICS

### Performance et SEO
- **Core Web Vitals** : Optimisation des métriques Google
- **Lighthouse** : Scores élevés en performance et accessibilité
- **Sitemap** : Génération automatique pour le référencement
- **Robots.txt** : Configuration pour les crawlers

### Analytics et Tracking
- **Google Analytics** : Suivi du trafic et conversions
- **Search Console** : Monitoring du référencement
- **Structured Data** : Rich snippets pour meilleure visibilité

## 🚀 DÉPLOIEMENT ET MAINTENANCE

### Build et Déploiement
- **Build standalone** : Génération d'un serveur Node.js autonome
- **Assets statiques** : Optimisation et compression
- **Variables d'environnement** : Configuration par environnement
- **Scripts npm** : dev, build, start, lint

### Maintenance
- **Mise à jour** : Dépendances et sécurité
- **Backup** : Sauvegarde des articles et images
- **Monitoring** : Surveillance des performances
- **Support** : Documentation et formation équipe

---

## 🎯 CONTEXTE MÉTIER

### Scougal Rubber Corporation
- **Fondée en 1916** : Plus de 100 ans d'expertise
- **Spécialisation** : Caoutchouc moulé sur mesure pour l'industrie
- **Marchés** : Infrastructure, défense, industrie, gouvernement
- **Certification** : Buy American Act, AISC, ISO standards

### Produits Principaux
- **Bearing Pads** : Paliers élastomériques pour ponts
- **Rubber Parts** : Pièces caoutchouc industrielles sur mesure
- **Ramps** : Rampes d'accès et de chargement
- **Steel Fabrication** : Fabrication d'acier et assemblage

### Secteurs d'Activité
- **Infrastructure** : Ponts, autoroutes, tunnels
- **Défense** : Équipements militaires et aérospatiaux
- **Industrie** : Mines, pétrole, énergie
- **Gouvernement** : Projets fédéraux et étatiques

### Avantages Concurrentiels
- **Expérience** : Plus de 100 ans d'expertise
- **Qualité** : Certifications industrie et gouvernementales
- **Innovation** : R&D continue et technologies avancées
- **Service** : Support technique et livraison rapide

## 📱 COMPOSANTS PRINCIPAUX

### Header.jsx
**Fonctionnalités** :
- Navigation responsive avec menus déroulants
- Logo animé avec changement selon scroll
- Intégration réseaux sociaux
- Menu mobile avec hamburger
- Highlight de la page active

**Structure de navigation** :
```javascript
const menuItems = [
  {
    title: "Our products",
    links: [
      { href: "/bearing-pads", text: "Bearing Pads" },
      { href: "/rubber-parts", text: "Industrial Rubber Parts" },
      { href: "/ramps", text: "Ramps" },
      { href: "/steel", text: "Steel Fabrication" },
    ],
  },
  {
    title: "About us",
    links: [
      { href: "/company", text: "Company" },
      { href: "/experience", text: "Experience" },
      { href: "/projects", text: "Projects" },
    ],
  },
];
```

### Hero.jsx
**Fonctionnalités** :
- Section héro avec background vidéo/image
- Titre et description dynamiques
- Boutons d'action avec animations
- Indicateurs de performance (années d'expérience, projets)
- Responsive design avec variants mobile/desktop

### Footer.jsx
**Fonctionnalités** :
- Informations de contact complètes
- Liens vers pages importantes
- Certifications et labels
- Intégration réseaux sociaux
- Newsletter et formulaire de contact

### ProductDisplay.jsx
**Fonctionnalités** :
- Affichage standardisé des produits
- Galerie d'images avec zoom
- Spécifications techniques
- Projets de référence
- Formulaire de devis intégré

### GoogleMap.jsx
**Fonctionnalités** :
- Carte interactive avec localisation
- Marqueurs personnalisés
- Intégration avec informations de contact
- Responsive design
- Optimisation de performance

## 🔧 SERVICES ET UTILITAIRES

### service/posts.js
**Responsabilités** :
- Lecture des fichiers Markdown depuis `/posts`
- Parsing du front matter avec gray-matter
- Tri et filtrage des articles
- Génération des métadonnées

**Fonctions principales** :
- `getAllPosts()` : Récupération de tous les articles
- `getPostBySlug(slug)` : Récupération d'un article spécifique
- Validation de l'existence des fichiers
- Gestion d'erreurs avec logging

### service/postsAzure.js
**Responsabilités** :
- Gestion des articles sur Azure Blob Storage
- Upload et téléchargement de fichiers
- Métadonnées et indexation
- Gestion des images associées

**Fonctions principales** :
- Upload d'articles au format JSON
- Téléchargement avec cache local
- Gestion des versions et backup
- Optimisation des performances

### components/utils.js
**Utilitaires** :
- Fonctions de formatage de dates
- Calcul de temps de lecture
- Génération de slugs SEO
- Validation de données
- Helpers pour métadonnées

## 📝 CONFIGURATION DES MÉTADONNÉES

### Structure des Métadonnées Page
```javascript
export const metadata = {
  title: "Titre optimisé SEO",
  description: "Description détaillée avec mots-clés",
  keywords: "mots-clés, industrie, caoutchouc",
  robots: "index, follow",
  author: "Scougal Rubber Corporation",
  openGraph: {
    title: "Titre OpenGraph",
    description: "Description pour réseaux sociaux",
    type: "website",
    url: "https://www.scougalrubber.com/",
    images: [
      {
        url: "https://www.scougalrubber.com/logo/logo-grey.ico",
        alt: "Scougal Rubber Company Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://www.scougalrubber.com/",
  },
};
```

### Structured Data
```javascript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.scougalrubber.com",
  name: "Scougal Rubber Corporation",
  foundingDate: "1916",
  address: {
    "@type": "PostalAddress",
    streetAddress: "885 Denmark Drive Suite 103",
    addressLocality: "McCarran",
    addressRegion: "NV",
    postalCode: "89437-4425",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-775-284-8500",
    contactType: "customer service",
  },
};
```

## 🎬 ANIMATIONS ET INTERACTIONS

### Framer Motion Configuration
- **Animations d'apparition** : Fade-in, slide-in, scale
- **Transitions** : Smooth et optimisées performance
- **Hover effects** : Boutons et cards interactifs
- **Page transitions** : Navigation fluide entre pages

### AOS (Animate On Scroll)
- **Trigger points** : Animations déclenchées par scroll
- **Variants** : Fade, slide, zoom, flip
- **Durée** : Ajustable selon le contexte
- **Offset** : Déclenchement personnalisé

### CSS Animations
- **Aurora effect** : Background animé avec dégradés
- **Pulse effects** : Boutons et indicateurs
- **Hover states** : Feedback visuel utilisateur
- **Loading states** : Spinners et skeletons

## 🌐 INTERNATIONALISATION ET ACCESSIBILITÉ

### Accessibilité
- **Semantic HTML** : Structure logique et accessible
- **Alt text** : Descriptions détaillées pour images
- **Keyboard navigation** : Navigation complète au clavier
- **Color contrast** : Ratios conformes WCAG 2.1
- **Screen readers** : Compatibilité avec technologies d'assistance

### SEO International
- **hreflang** : Balises pour versions linguistiques
- **Canonical URLs** : Éviter contenu dupliqué
- **Structured data** : Données structurées multilingues
- **Sitemap** : Inclure toutes les versions linguistiques

## 📊 PERFORMANCE ET OPTIMISATION

### Optimisation Images
- **Next.js Image** : Lazy loading et formats optimisés
- **WebP support** : Formats modernes pour navigateurs compatibles
- **Responsive images** : Tailles adaptées selon device
- **Placeholder** : Blur et couleurs pendant chargement

### Code Splitting
- **Dynamic imports** : Chargement conditionnel des composants
- **Route-based splitting** : Séparation par page
- **Component-based splitting** : Composants lourds en lazy loading
- **Bundle analysis** : Monitoring de la taille des bundles

### Caching Strategy
- **Static assets** : Cache long terme pour images et CSS
- **API responses** : Cache intelligent pour données dynamiques
- **CDN** : Distribution géographique du contenu
- **Browser caching** : Headers appropriés pour performance

---

## 🔧 DÉVELOPPEMENT ET MAINTENANCE

### Workflow de Développement
1. **Développement local** : `npm run dev` sur port 3000
2. **Tests** : Validation des fonctionnalités
3. **Build** : `npm run build` pour production
4. **Déploiement** : `npm run start` sur port 8080

### Scripts Package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build && cp -r .next/static .next/standalone/.next/static && cp -r public .next/standalone/public",
    "start": "PORT=8080 node .next/standalone/server.js",
    "lint": "next lint"
  }
}
```

### Maintenance et Mises à Jour
- **Dépendances** : Mise à jour régulière des packages
- **Sécurité** : Monitoring des vulnérabilités
- **Performance** : Optimisation continue
- **Backup** : Sauvegarde régulière du contenu

### Monitoring et Logs
- **Error tracking** : Surveillance des erreurs runtime
- **Performance monitoring** : Métriques de performance
- **User analytics** : Comportement utilisateur
- **Server logs** : Logs serveur pour debugging

## 📚 DOCUMENTATION ET FORMATION

### Documentation Technique
- **Architecture** : Diagrammes et explications
- **API** : Documentation des endpoints
- **Composants** : Guide d'utilisation
- **Déploiement** : Procédures step-by-step

### Formation Équipe
- **Utilisation CMS** : Guide pour l'équipe marketing
- **Création contenu** : Bonnes pratiques SEO
- **Maintenance** : Procédures de base
- **Troubleshooting** : Solutions aux problèmes courants

---

Ce contexte complet permet à l'IA de comprendre tous les aspects techniques, métier et organisationnels du site web Scougal Rubber pour fournir des réponses précises et contextualisées.
````
