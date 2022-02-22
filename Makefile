run:
	@docker-compose up --build

node.install:
	@cd client; yarn

version:
	@echo Current version: $(shell git  describe --abbrev=0)