import os
import dj_database_url
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# ==========================================
# SECURITY SETTINGS
# ==========================================

# SECRET_KEY environment variable se aayega. Local ke liye fallback hai.
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key-for-local-dev-only')

# Render par automatically False ho jayega, Local par True rahega
DEBUG = 'RENDER' not in os.environ

# Sabhi domains ko allow karein (Render ke liye zaroori hai)
ALLOWED_HOSTS = ['*']


# ==========================================
# APPLICATIONS
# ==========================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party apps
    'rest_framework',
    'corsheaders',
    'ckeditor',
    # Your apps
    'notes',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Sabse upar hona chahiye
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Security ke baad static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# ==========================================
# DATABASE CONFIGURATION (Bulletproof Fix)
# ==========================================

# Step 1: Default Local Database (SQLite) set karein
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Step 2: Agar Render par DATABASE_URL mile, toh Postgres use karein
database_url = os.environ.get("DATABASE_URL")

if database_url:
    DATABASES['default'] = dj_database_url.parse(
        database_url,
        conn_max_age=600,
        conn_health_checks=True,
    )


# ==========================================
# PASSWORD VALIDATION
# ==========================================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ==========================================
# INTERNATIONALIZATION
# ==========================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ==========================================
# STATIC FILES (CSS, JavaScript, Images)
# ==========================================

STATIC_URL = '/static/'

# Production ke liye static root location
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# WhiteNoise storage engine
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# ==========================================
# MEDIA FILES
# ==========================================

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# ==========================================
# CORS SETTINGS
# ==========================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    # IMPORTANT: Jab Vercel deploy ho jaye, uska link yahan niche add karein
    # "https://my-blog-frontend.vercel.app", 
]

CORS_ALLOW_ALL_ORIGINS = True

# Agar Vercel link add karne me issue ho, toh temporary testing ke liye ye True kar sakte hain:
# CORS_ALLOW_ALL_ORIGINS = True 

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'