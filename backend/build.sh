#!/usr/bin/env bash
# exit on error
set -o errexit

# Dependencies install karo
pip install -r requirements.txt

# Static files collect karo
python manage.py collectstatic --noinput

# Database migrate karo
python manage.py migrate