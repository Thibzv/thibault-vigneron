# Analyse SEO - Éléments manquants

## 📊 État actuel

### Champs SEO existants

- ✅ **metaTitle** (Pages & Projets)
- ✅ **metaDescription** (Pages & Projets)

### Métadonnées générées actuellement

- ✅ `<title>` (via metaTitle ou title)
- ✅ `<meta name="description">` (via metaDescription)

---

## ❌ Éléments manquants pour un SEO optimal

### 1. **Open Graph (Facebook, LinkedIn, etc.)** 🔴 CRITIQUE

**Impact** : Améliore le partage sur les réseaux sociaux

**Champs manquants** :

- `og:title` - Titre optimisé pour le partage
- `og:description` - Description pour le partage
- `og:image` - Image de partage (1200x630px recommandé)
- `og:url` - URL canonique de la page
- `og:type` - Type de contenu (website, article, etc.)
- `og:site_name` - Nom du site
- `og:locale` - Langue (fr_FR)

### 2. **Twitter Cards** 🟡 IMPORTANT

**Impact** : Améliore l'affichage sur Twitter/X

**Champs manquants** :

- `twitter:card` - Type de carte (summary_large_image, summary)
- `twitter:title` - Titre pour Twitter
- `twitter:description` - Description pour Twitter
- `twitter:image` - Image pour Twitter
- `twitter:site` - Compte Twitter (optionnel)
- `twitter:creator` - Créateur du contenu (optionnel)

### 3. **Canonical URL** 🟡 IMPORTANT

**Impact** : Évite le contenu dupliqué, améliore le référencement

**Manquant** :

- Balise `<link rel="canonical">` avec l'URL complète de la page

### 4. **Image de partage sociale** 🟡 IMPORTANT

**Impact** : Image optimisée pour les réseaux sociaux

**Recommandations** :

- Format : 1200x630px minimum
- Format : JPG ou PNG
- Taille : < 1MB
- Ratio : 1.91:1

### 5. **Structured Data (JSON-LD)** 🟢 RECOMMANDÉ

**Impact** : Aide Google à mieux comprendre votre contenu

**Types recommandés** :

- **Person** - Pour l'auteur/créateur
- **WebSite** - Informations sur le site
- **WebPage** - Informations sur chaque page
- **BreadcrumbList** - Fil d'Ariane (si applicable)
- **Article** - Pour les projets (si applicable)

### 6. **Robots Meta** 🟢 RECOMMANDÉ

**Impact** : Contrôle l'indexation

**Champs manquants** :

- `robots` - noindex, nofollow, etc.
- `googlebot` - Paramètres spécifiques Google
- `googlebot-news` - Pour les actualités

### 7. **Métadonnées supplémentaires** 🟢 RECOMMANDÉ

- **keywords** - Mots-clés (moins important mais utile)
- **author** - Auteur du contenu
- **publisher** - Éditeur
- **datePublished** / **dateModified** - Dates de publication/modification

### 8. **Page d'accueil** 🔴 CRITIQUE

**Problème** : La page d'accueil (`page.tsx`) n'a pas de `generateMetadata()`

**Manquant** :

- Métadonnées spécifiques pour la page d'accueil
- Open Graph pour la page d'accueil
- Structured Data pour la page d'accueil

---

## 📋 Plan d'action recommandé

### Priorité 1 (Critique) 🔴

1. Ajouter les champs Open Graph dans les collections
2. Implémenter `generateMetadata()` pour la page d'accueil
3. Ajouter les balises Open Graph dans toutes les pages

### Priorité 2 (Important) 🟡

4. Ajouter les champs Twitter Cards dans les collections
5. Implémenter les Twitter Cards dans les métadonnées
6. Ajouter les URLs canoniques
7. Ajouter un champ pour l'image de partage sociale

### Priorité 3 (Recommandé) 🟢

8. Implémenter le Structured Data (JSON-LD)
9. Ajouter les champs robots meta
10. Ajouter les métadonnées supplémentaires (author, dates, etc.)

---

## 💡 Recommandations spécifiques

### Pour les Pages

- Ajouter un champ `ogImage` (upload media)
- Ajouter un champ `twitterImage` (upload media, optionnel, peut utiliser ogImage)
- Ajouter un champ `canonicalUrl` (text, optionnel, auto-généré si vide)
- Ajouter un champ `noindex` (checkbox)
- Ajouter un champ `keywords` (text, optionnel)

### Pour les Projets

- Même chose que Pages
- Utiliser l'image principale comme fallback pour ogImage
- Ajouter Structured Data de type "CreativeWork" ou "Article"

### Configuration globale

- Créer un Global "SEO Settings" avec :
  - Site name
  - Site URL
  - Default ogImage
  - Twitter handle
  - Author name
  - Default description

---

## 🔧 Prochaines étapes

Souhaitez-vous que je :

1. Ajoute les champs SEO manquants dans les collections Payload ?
2. Implémente les métadonnées complètes (Open Graph, Twitter Cards) dans les pages ?
3. Ajoute le Structured Data (JSON-LD) ?
4. Crée un Global "SEO Settings" pour la configuration globale ?
