# 🚀 NOVACOM - Site Web d'Agence Digitale

[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Site web professionnel et moderne pour l'agence digitale **NOVACOM**, spécialisée dans le graphic design, community management, développement web et media buying.

![NOVACOM Preview](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=NOVACOM+Website)

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Captures d'écran](#-captures-décran)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Contact](#-contact)

---

## ✨ Fonctionnalités

### 🎨 Design & UI/UX
- ✅ Design moderne et minimaliste
- ✅ Interface responsive (mobile, tablette, desktop)
- ✅ Animations fluides et effets hover
- ✅ Palette de couleurs personnalisée (bleu #1e3a8a & jaune #FDB913)
- ✅ Navigation sticky avec menu mobile
- ✅ Sections colorées avec icônes SVG professionnelles

### 📄 Pages & Sections
- ✅ **Page d'accueil** : Hero section, présentation, services, aperçu réalisations, contact
- ✅ **Page réalisations** : Liste complète avec filtres par catégorie
- ✅ **Page détail** : Galerie d'images illimitée, informations projet, projets similaires
- ✅ **Breadcrumb navigation** pour une meilleure UX

### 🖼️ Gestion des réalisations
- ✅ Deux types de réalisations : **Simple** (1 image) et **Projet** (images illimitées)
- ✅ Upload d'images illimitées pour les projets
- ✅ Légendes personnalisables pour chaque image
- ✅ Réorganisation facile via champ "ordre"
- ✅ Catégorisation : Graphic Design, Community Management, Web Dev, Media Buying
- ✅ Modal lightbox pour agrandir les images

### 🔧 Administration
- ✅ Interface d'administration Django intuitive
- ✅ Inline pour ajouter plusieurs images en une fois
- ✅ Gestion des services et réalisations
- ✅ Filtre par type, catégorie et affichage accueil
- ✅ Recherche et tri avancés

### 📱 Contact
- ✅ Contact direct via WhatsApp
- ✅ Message pré-rempli personnalisé par projet
- ✅ Informations de contact complètes
- ✅ Liens réseaux sociaux (Facebook, Instagram, LinkedIn)

### 🚀 Performance
- ✅ Tailwind CSS via CDN (pas de compilation nécessaire)
- ✅ Images optimisées avec attribut `loading="lazy"`
- ✅ Code JavaScript vanilla optimisé
- ✅ Templates Django avec cache

---

## 🛠️ Technologies

### Backend
- **Django 5.0+** - Framework web Python
- **Python 3.8+** - Langage de programmation
- **SQLite** - Base de données (développement)
- **Pillow** - Traitement d'images

### Frontend
- **Tailwind CSS 3.0** - Framework CSS utility-first
- **JavaScript Vanilla** - Interactions dynamiques
- **HTML5** - Structure sémantique

### Outils
- **Django Admin** - Interface d'administration
- **Django Template Language** - Templates dynamiques
- **Template Tags personnalisés** - Filtres `split` et `trim`

---

## 📦 Prérequis

- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)
- Virtualenv (recommandé)

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/novacom-website.git
cd novacom-website
```

### 2. Créer un environnement virtuel

```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Créer la structure des dossiers

```bash
mkdir -p media/realisations
mkdir -p main/templatetags
```

### 5. Créer le fichier `main/templatetags/__init__.py`

```bash
touch main/templatetags/__init__.py
```

### 6. Créer `main/templatetags/custom_filters.py`

```python
from django import template

register = template.Library()

@register.filter
def split(value, arg):
    if value:
        return value.split(arg)
    return []

@register.filter
def trim(value):
    if value:
        return value.strip()
    return value
```

### 7. Appliquer les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. Créer un superutilisateur

```bash
python manage.py createsuperuser
```

### 9. (Optionnel) Charger des données de test

```bash
python manage.py shell < fixtures.py
```

### 10. Lancer le serveur

```bash
python manage.py runserver
```

Le site sera accessible sur **http://127.0.0.1:8000/**

---

## ⚙️ Configuration

### Modifier le numéro WhatsApp

Dans `main/templates/main/index.html` et `realisation_detail.html`, remplacez :

```javascript
'https://wa.me/237600000000?text=...'
```

Par votre vrai numéro au format international (sans +)

### Modifier les informations de contact

Dans `main/templates/main/base.html` et `index.html`, mettez à jour :
- Adresse
- Téléphone
- Email
- Liens réseaux sociaux

### Personnaliser les couleurs

Dans `main/templates/main/base.html`, modifiez la configuration Tailwind :

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'novacom-yellow': '#VOTRE_COULEUR',
                'novacom-blue': '#VOTRE_COULEUR',
            }
        }
    }
}
```

---

## 📚 Utilisation

### Accéder à l'interface d'administration

1. Allez sur http://127.0.0.1:8000/admin/
2. Connectez-vous avec votre superutilisateur
3. Gérez les services et réalisations

### Ajouter un service

1. Admin → Services → Ajouter
2. Remplir : Titre, Description, Icône (emoji), Ordre
3. Enregistrer

### Ajouter une réalisation simple

1. Admin → Réalisations → Ajouter
2. Type : **Simple**
3. Remplir : Titre, Description, Catégorie
4. Uploader **une image**
5. Cocher "Afficher sur accueil" pour les 3 premières
6. Enregistrer

### Ajouter un projet avec plusieurs images

1. Admin → Réalisations → Ajouter
2. Type : **Projet**
3. Remplir : Titre, Description, Catégorie, Client, Dates, Services
4. Scroller jusqu'à "**Images de réalisations**"
5. Ajouter autant d'images que nécessaire (avec légendes et ordre)
6. Cliquer sur "**+ Ajouter une autre Image**" pour plus
7. Enregistrer

---

## 📁 Structure du projet

```
novacom_project/
│
├── novacom_project/           # Configuration Django
│   ├── settings.py            # Paramètres du projet
│   ├── urls.py                # URLs principales
│   └── wsgi.py                # Point d'entrée WSGI
│
├── main/                      # Application principale
│   ├── migrations/            # Migrations de base de données
│   ├── templatetags/          # Tags et filtres personnalisés
│   │   ├── __init__.py
│   │   └── custom_filters.py # Filtres split/trim
│   ├── templates/main/        # Templates HTML
│   │   ├── base.html          # Template de base
│   │   ├── index.html         # Page d'accueil
│   │   ├── realisations.html  # Liste des réalisations
│   │   └── realisation_detail.html  # Détail d'une réalisation
│   ├── static/main/js/        # JavaScript
│   │   └── main.js            # Fonctions JS principales
│   ├── models.py              # Modèles (Service, Realisation, ImageRealisation)
│   ├── views.py               # Vues Django
│   ├── urls.py                # URLs de l'application
│   └── admin.py               # Configuration admin
│
├── media/                     # Fichiers uploadés
│   └── realisations/          # Images des réalisations
│
├── staticfiles/               # Fichiers statiques collectés
├── fixtures.py                # Script de données de test
├── requirements.txt           # Dépendances Python
├── manage.py                  # Utilitaire Django
└── README.md                  # Ce fichier
```

---

## 📸 Captures d'écran

### Page d'accueil
![Home](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=Page+Accueil)

### Services
![Services](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=Services)

### Réalisations
![Realisations](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=Realisations)

### Détail projet
![Detail](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=Detail+Projet)

### Interface Admin
![Admin](https://via.placeholder.com/800x400/1e3a8a/FDB913?text=Admin+Django)

---

## 🌐 Déploiement

### Option 1 : Heroku

```bash
# Installer Heroku CLI
# Créer un Procfile
echo "web: gunicorn novacom_project.wsgi" > Procfile

# Installer gunicorn
pip install gunicorn

# Créer requirements.txt
pip freeze > requirements.txt

# Déployer
heroku create novacom-app
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### Option 2 : PythonAnywhere

1. Uploader le projet
2. Créer une webapp Django
3. Configurer le WSGI
4. Configurer les médias statiques
5. Recharger l'application

### Option 3 : VPS (DigitalOcean, AWS, etc.)

Suivre le guide de déploiement Django classique :
1. Configurer nginx + gunicorn
2. Configurer PostgreSQL
3. Collecter les fichiers statiques : `python manage.py collectstatic`
4. Configurer SSL avec Let's Encrypt

### Configuration production

Dans `settings.py` :

```python
DEBUG = False
ALLOWED_HOSTS = ['votre-domaine.com', 'www.votre-domaine.com']

# Base de données PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'novacom_db',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Sécurité
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

### Guidelines

- Respecter le style de code existant
- Ajouter des tests si nécessaire
- Mettre à jour la documentation
- Utiliser des messages de commit clairs

---

## 📝 Changelog

### Version 2.0.0 (2024)
- ✅ Images illimitées pour les projets
- ✅ Système de légendes pour les images
- ✅ Réorganisation des images via champ "ordre"
- ✅ Nouveau modèle `ImageRealisation`
- ✅ Interface admin améliorée avec inline

### Version 1.0.0 (2024)
- ✅ Version initiale
- ✅ Page d'accueil, réalisations, contact
- ✅ Interface admin Django
- ✅ Design responsive Tailwind CSS
- ✅ Contact WhatsApp

---

## 🐛 Bugs connus

Aucun bug majeur connu actuellement. Si vous en trouvez, veuillez ouvrir une [issue](https://github.com/votre-username/novacom-website/issues).

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**NOVACOM Team**

- Website: [novacom.cm](https://novacom.cm)
- Email: contact@novacom.cm
- WhatsApp: +237 6 00 00 00 00

---

## 🙏 Remerciements

- [Django](https://www.djangoproject.com/) - Framework web
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Unsplash](https://unsplash.com/) - Images de placeholder
- [Lucide Icons](https://lucide.dev/) - Icônes SVG
- Communauté open source

---

## 📞 Support

Pour toute question ou support :

- 📧 Email: contact@novacom.cm
- 💬 WhatsApp: +237 6 00 00 00 00
- 🐛 Issues: [GitHub Issues](https://github.com/votre-username/novacom-website/issues)

---

<div align="center">

**Fait avec ❤️ par NOVACOM**

⭐ N'oubliez pas de mettre une étoile si ce projet vous plaît !

[🔝 Retour en haut](#-novacom---site-web-dagence-digitale)

</div>
