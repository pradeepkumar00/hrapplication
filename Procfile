web: gunicorn mysite.wsgi --bind 0.0.0.0:$PORT
worker: celery -A mysite worker --loglevel=info
