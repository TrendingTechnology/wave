ifneq ($(origin VERSION), undefined)
	LDFLAGS := -ldflags '-X github.com/h2oai/telesync/build.Date=$(BUILD_DATE) -X github.com/h2oai/telesync/build.Version=$(VERSION) -X github.com/h2oai/telesync/build.ID=$(BUILD_ID)'
endif

all: clean setup build ## Setup and build everything

setup: ## Set up development dependencies
	cd ui && $(MAKE) setup
	cd py && $(MAKE) setup

clean: ## Clean
	cd ui && $(MAKE) clean
	cd py && $(MAKE) clean
	rm -f telesync

.PHONY: build
build: build-ui build-py build-server ## Build everything

build-py: ## Build Python driver
	cd py && $(MAKE)

build-ui: ## Build UI
	cd ui && $(MAKE) build

run-ui: ## Run UI in development mode (hot reloading)
	cd ui && $(MAKE) run

build-db: ## Build database
	CGO_ENABLED=1 go build ${LDFLAGS} -o teledb cmd/teledb/main.go

run-db: ## Run database
	go run cmd/teledb/main.go

build-server: ## Build server
	go build ${LDFLAGS} -o telesync cmd/telesync/main.go

run: ## Run server
	go run cmd/telesync/main.go

help: ## List all make tasks
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'