package com.osca.config;

import java.io.IOException;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

/**
 * Mybatis config
 *
 * @author :Uheejoon
 * @date :2025-08-11 오전 12:14
 */
@Slf4j
@Configuration
@MapperScan(basePackages = {
    "com.osca.admin.mapper",
    "com.osca.cafe.mapper",
    "com.osca.member.mapper",

})
public class MybatisConfiguration {

  public static final String CLASSPATH_MAPPER_XML = "classpath*:/mapper/*.xml";

  @Bean
  @DependsOn("flywayInitializer")
  @ConditionalOnProperty(name = "spring.flyway.enabled", havingValue = "true", matchIfMissing = true)
  public SqlSessionFactory sqlSessionFactoryWithFlyway(
      @Qualifier("oscaDataSource") DataSource dataSource
  ) {
    return createSqlSessionFactory(dataSource);
  }

  /**
   * SqlSessionFactory 빈 생성 Flyway 마이그레이션 완료 후 실행되도록 의존성 설정
   */
  @Bean
  @ConditionalOnProperty(name = "spring.flyway.enabled", havingValue = "false")
  public SqlSessionFactory sqlSessionFactory(
      @Qualifier("oscaDataSource") DataSource dataSource
  ) {
    return createSqlSessionFactory(dataSource);
  }


  private SqlSessionFactory createSqlSessionFactory(DataSource dataSource) {
    try {
      SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
      sqlSessionFactoryBean.setDataSource(dataSource);

      sqlSessionFactoryBean.setMapperLocations(
          new PathMatchingResourcePatternResolver().getResources(CLASSPATH_MAPPER_XML)
      );

      SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBean.getObject();

      assert sqlSessionFactory != null;
      var configuration = sqlSessionFactory.getConfiguration();
      configuration.setMapUnderscoreToCamelCase(true);
      configuration.setCacheEnabled(true);
      configuration.setLazyLoadingEnabled(true);
      configuration.setAggressiveLazyLoading(false);

      return sqlSessionFactory;

    } catch (IOException e) {
      log.error("Mapper Location Can Not Found Exception : **Not exist {}**\n Exception: {}",
          CLASSPATH_MAPPER_XML, e.getStackTrace());
    } catch (Exception e) {
      log.error("SqlSessionFactory Create Exception : {}", e.getStackTrace());
    }
    return null;
  }
}
