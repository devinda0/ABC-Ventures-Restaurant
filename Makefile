# Restaurant App Makefile
# Convenient shortcuts for Docker management

.PHONY: help setup start stop restart logs status seed reset-db cleanup

# Default target
help:
	@echo "Restaurant App Docker Management"
	@echo ""
	@echo "Available commands:"
	@echo "  make setup     - Initial setup and build images"
	@echo "  make start     - Start all services"
	@echo "  make stop      - Stop all services"
	@echo "  make restart   - Restart all services"
	@echo "  make logs      - Show logs for all services"
	@echo "  make status    - Show status of all services"
	@echo "  make seed      - Seed database with sample data"
	@echo "  make reset-db  - Reset database (WARNING: destroys data)"
	@echo "  make cleanup   - Remove all Docker resources"
	@echo ""
	@echo "Service-specific logs:"
	@echo "  make logs-app     - Show application logs"
	@echo "  make logs-mysql   - Show MySQL logs"
	@echo "  make logs-stripe  - Show Stripe mock logs"
	@echo ""

setup:
	./docker-manage.sh setup

start:
	./docker-manage.sh start

stop:
	./docker-manage.sh stop

restart:
	./docker-manage.sh restart

logs:
	./docker-manage.sh logs

logs-app:
	./docker-manage.sh logs app

logs-mysql:
	./docker-manage.sh logs mysql

logs-stripe:
	./docker-manage.sh logs stripe-mock

status:
	./docker-manage.sh status

seed:
	./docker-manage.sh seed

reset-db:
	./docker-manage.sh reset-db

cleanup:
	./docker-manage.sh cleanup

# Development shortcuts
dev: start
	@echo "Development environment started!"
	@echo "Access your app at: http://localhost:3000"