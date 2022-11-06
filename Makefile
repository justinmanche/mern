.DEFAULT_GOAL := build

build:
	@echo "Building MERN frontend & backend images"
	@docker-compose build 

up:
	@echo "Running MERN frontend & backend"
	@docker-compose up

down:
	@echo "Tearing down MERN frontend & backend"
	@docker-compose down

push:
	@echo "Pushing MERN frontend & backend images"
	@docker-compose push