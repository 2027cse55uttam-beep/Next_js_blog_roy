#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
pip install -r requirements.txt

# 2. Collect Static Files (CSS/Images)
python manage.py collectstatic --no-input

# 3. Migrate Database
python manage.py migrate