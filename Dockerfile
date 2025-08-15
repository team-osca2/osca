# === Builder: Extract layers from bootJar ===
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Extract layers using layertools
RUN java -Djarmode=layertools -jar app.jar extract

# === Runtime: Use regular JRE instead of distroless for easier debugging ===
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# OCI labels (optional)
ARG APP_NAME=app
ARG APP_VERSION=latest
ARG VCS_REF=unknown
ARG BUILD_DATE=unknown
LABEL org.opencontainers.image.title="${APP_NAME}" \
      org.opencontainers.image.version="${APP_VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.created="${BUILD_DATE}"

# JVM options
ENV BASE_JAVA_OPTS="\
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UseStringDeduplication \
  -Dfile.encoding=UTF-8 \
  -Duser.timezone=Asia/Seoul \
  -Djava.security.egd=file:/dev/urandom \
  -Djava.io.tmpdir=/tmp \
  -XX:+TieredCompilation \
  -XX:MaxMetaspaceSize=256m \
  -XX:MaxDirectMemorySize=256m \
  -Xss512k \
  -XX:+ExitOnOutOfMemoryError \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/tmp \
  -XX:ErrorFile=/tmp/hs_err_%p.log \
"

# Pattern A: Fixed heap (when HEAP_XMX is specified)
ARG HEAP_XMS=
ARG HEAP_XMX=
ENV HEAP_JAVA_OPTS="${HEAP_XMS:+-Xms${HEAP_XMS}} ${HEAP_XMX:+-Xmx${HEAP_XMX}}"

# Pattern B: Percentage-based heap (default)
ARG INIT_RAM_PCT=40.0
ARG MAX_RAM_PCT=75.0
ENV PCT_JAVA_OPTS="\
  -XX:InitialRAMPercentage=${INIT_RAM_PCT} \
  -XX:MaxRAMPercentage=${MAX_RAM_PCT} \
"

# Switch: A if HEAP_XMX exists, otherwise B
ENV JAVA_OPTS="${BASE_JAVA_OPTS} ${HEAP_JAVA_OPTS:-${PCT_JAVA_OPTS}}"

# Copy layers in order (dependencies first for better caching)
COPY --from=builder --chown=appuser:appuser /app/dependencies/ ./
COPY --from=builder --chown=appuser:appuser /app/spring-boot-loader/ ./
COPY --from=builder --chown=appuser:appuser /app/snapshot-dependencies/ ./
COPY --from=builder --chown=appuser:appuser /app/application/ ./

USER appuser
EXPOSE 8080

# Use the correct Spring Boot 3.x launcher
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.launch.JarLauncher"]