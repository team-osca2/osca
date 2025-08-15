package com.osca.config;

import static java.nio.charset.StandardCharsets.UTF_8;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import javax.sql.DataSource;
import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

/**
 * Flyway 설정 클래스
 * MyBatis보다 먼저 실행되도록 보장
 *
 * @author :Uheejoon
 * @date :2025-08-11 오전 1:05
 */
@Configuration
public class FlywayConfiguration {

  /**
   * Flyway 수동 설정
   * 애플리케이션 시작 시 가장 먼저 실행되도록 함
   */
  @Bean(initMethod = "migrate", name = "flyway")
  public Flyway flyway(DataSource dataSource) {
    return Flyway.configure()
        .dataSource(dataSource)
        .locations("classpath:db/migration")
        .baselineOnMigrate(true)
        .validateOnMigrate(true)
        .outOfOrder(false)
        .encoding(UTF_8)
        .load();
  }

  /**
   * FlywayMigrationInitializer를 명시적으로 생성
   * 다른 빈들이 이에 의존하도록 함
   */
  @DependsOn("flyway")
  @Bean("flywayInitializer")
  public FlywayMigrationInitializer flywayInitializer(Flyway flyway) {
    return new FlywayMigrationInitializer(flyway);
  }

}
