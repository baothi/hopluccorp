# ---- Build Stage ----
FROM python:3.12-slim-bookworm AS python-build-stage
ARG BUILD_ENVIRONMENT=production

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml /app/
WORKDIR /app
RUN pip install --no-cache-dir ".[production]"

# ---- Run Stage ----
FROM python:3.12-slim-bookworm AS python-run-stage
ARG BUILD_ENVIRONMENT=production

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

RUN addgroup --system django && adduser --system --ingroup django django

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    gettext \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=python-build-stage /usr/local/bin /usr/local/bin

COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint && chmod +x /entrypoint

COPY ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start && chmod +x /start

COPY ./compose/production/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker && chmod +x /start-celeryworker

COPY ./compose/production/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat && chmod +x /start-celerybeat

COPY ./compose/production/django/celery/flower/start /start-flower
RUN sed -i 's/\r$//g' /start-flower && chmod +x /start-flower

WORKDIR /app
COPY --chown=django:django . /app

RUN mkdir -p /app/staticfiles && chown django:django /app/staticfiles

RUN DATABASE_URL="" CELERY_BROKER_URL="" DJANGO_SETTINGS_MODULE="config.settings.production" \
    DJANGO_SECRET_KEY="build-only" DJANGO_ADMIN_URL="admin/" \
    python manage.py compilemessages || true

USER django

ENTRYPOINT ["/entrypoint"]
