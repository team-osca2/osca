APP_NAME        ?= osca
REGISTRY        ?=
IMAGE           := $(if $(REGISTRY),$(REGISTRY)/,)$(APP_NAME)
PORT            ?= 8080
PROFILE         ?= prod

MEM_LIMIT       ?= 1g
INIT_RAM_PCT    ?= 40.0
MAX_RAM_PCT     ?= 75.0
HEAP_XMS        ?=
HEAP_XMX        ?=

GRADLEW         ?= ./gradlew
JAR_FILE        ?= build/libs/$(APP_NAME).jar

VERSION         ?= $(shell git describe --tags --always 2>/dev/null || echo "latest")
VCS_REF         ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_DATE      ?= $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")

DOCKER          ?= docker
BUILD_ARGS      := --build-arg JAR_FILE=$(JAR_FILE) \
                   --build-arg APP_NAME=$(APP_NAME) \
                   --build-arg APP_VERSION=$(VERSION) \
                   --build-arg VCS_REF=$(VCS_REF) \
                   --build-arg BUILD_DATE=$(BUILD_DATE)

.PHONY: bootjar build build-nocache build-fixed run run-fixed logs stop push clean debug-image debug-run

bootjar:
	$(GRADLEW) clean bootJar

build: bootjar
	DOCKER_BUILDKIT=1 $(DOCKER) build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest \
		$(BUILD_ARGS) \
		--build-arg INIT_RAM_PCT=$(INIT_RAM_PCT) \
		--build-arg MAX_RAM_PCT=$(MAX_RAM_PCT) \
		.

build-nocache: bootjar
	DOCKER_BUILDKIT=1 $(DOCKER) build --no-cache -t $(IMAGE):$(VERSION) -t $(IMAGE):latest \
		$(BUILD_ARGS) \
		--build-arg INIT_RAM_PCT=$(INIT_RAM_PCT) \
		--build-arg MAX_RAM_PCT=$(MAX_RAM_PCT) \
		.

build-fixed: bootjar
	@if [ -z "$(HEAP_XMX)" ]; then echo ">> HEAP_XMX is required (e.g., HEAP_XMX=512m HEAP_XMS=512m)"; exit 1; fi
	DOCKER_BUILDKIT=1 $(DOCKER) build -t $(IMAGE):$(VERSION) -t $(IMAGE):latest \
		$(BUILD_ARGS) \
		--build-arg HEAP_XMX=$(HEAP_XMX) \
		$(if $(HEAP_XMS),--build-arg HEAP_XMS=$(HEAP_XMS),) \
		.

run:
	-$(DOCKER) rm -f $(APP_NAME) >/dev/null 2>&1 || true
	$(DOCKER) run --name $(APP_NAME) --rm \
		--read-only -v $(APP_NAME)-tmp:/tmp \
		--memory=$(MEM_LIMIT) \
		-p $(PORT):8080 \
		-e SPRING_PROFILES_ACTIVE=$(PROFILE) \
		$(IMAGE):$(VERSION)

run-fixed:
	@if [ -z "$(HEAP_XMX)" ]; then echo ">> (권장) build-fixed로 고정 힙 이미지 빌드 후 사용하세요."; fi
	-$(DOCKER) rm -f $(APP_NAME) >/dev/null 2>&1 || true
	$(DOCKER) run --name $(APP_NAME) --rm \
		--read-only -v $(APP_NAME)-tmp:/tmp \
		--memory=$(MEM_LIMIT) \
		-p $(PORT):8080 \
		-e SPRING_PROFILES_ACTIVE=$(PROFILE) \
		$(IMAGE):$(VERSION)

logs:
	$(DOCKER) logs -f $(APP_NAME)

stop:
	-$(DOCKER) rm -f $(APP_NAME) || true
	-$(DOCKER) volume rm $(APP_NAME)-tmp || true

push:
	@if [ -z "$(REGISTRY)" ]; then echo ">> REGISTRY is empty. Set REGISTRY=... to push."; exit 1; fi
	$(DOCKER) push $(IMAGE):$(VERSION)
	$(DOCKER) push $(IMAGE):latest

clean:
	-$(DOCKER) rm -f $(APP_NAME) || true
	-$(DOCKER) volume rm $(APP_NAME)-tmp || true
	-$(DOCKER) image rm $(IMAGE):$(VERSION) || true
	-$(DOCKER) image rm $(IMAGE):latest || true

debug-image: bootjar
	DOCKER_BUILDKIT=1 $(DOCKER) build -f Dockerfile.debug -t $(IMAGE):debug \
		--build-arg JAR_FILE=$(JAR_FILE) .

debug-run:
	-$(DOCKER) rm -f $(APP_NAME)-debug >/dev/null 2>&1 || true
	$(DOCKER) run --name $(APP_NAME)-debug --rm \
		-p $(PORT):8080 \
		-e SPRING_PROFILES_ACTIVE=$(PROFILE) \
		$(IMAGE):debug
