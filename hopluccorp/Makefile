.DEFAULT_GOAL := oneshot
COMPOSE_FILE ?= local.yml

shell:
	docker compose -f ${COMPOSE_FILE} exec django /bin/bash

makemigrations:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py makemigrations

migrate:
	docker compose -f ${COMPOSE_FILE} exec django python manage.py migrate

oneshot:
	docker compose -f ${COMPOSE_FILE} up -d

restart: stop oneshot

stop:
	docker compose -f ${COMPOSE_FILE} down

destroy:
	docker compose -f ${COMPOSE_FILE} down -v

test:
	docker compose -f ${COMPOSE_FILE} run --rm django python -m pytest .

build:
	docker compose -f ${COMPOSE_FILE} build --no-cache

build.cache:
	docker compose -f ${COMPOSE_FILE} build

logs:
	docker compose -f ${COMPOSE_FILE} logs -f

logs.%:
	docker compose -f ${COMPOSE_FILE} logs -f $*

createsuperuser:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py createsuperuser

seed:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_db

seed.reset:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_db --reset

seed.homepage:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_homepage

seed.homepage.reset:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_homepage --reset

seed.about:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_about

seed.organization:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_organization

seed.resources:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_resources

seed.projects:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_projects

seed.projects.reset:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_projects --reset

seed.business:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_business_fields

seed.business.reset:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_business_fields --reset

seed.all:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py seed_all

runserver:
	python manage.py runserver

celery:
	celery -A config.celery_app worker --loglevel=INFO
