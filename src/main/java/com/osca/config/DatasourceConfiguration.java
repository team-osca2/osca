package com.osca.config;

import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

/**
 * DataSource config
 *
 * @author :Uheejoon
 * @date :2025-08-11 오전 12:11
 */
@Configuration
public class DatasourceConfiguration {

  @Primary
  @Bean("oscaDataSource")
  @ConfigurationProperties(prefix = "spring.datasource.hikari")
  public DataSource oscaDataSource() {
    return DataSourceBuilder.create()
        .type(HikariDataSource.class)
        .build();
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    return new DataSourceTransactionManager(oscaDataSource());
  }

}
