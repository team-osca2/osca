package com.osca.admin.mapper;

import com.osca.admin.domain.AdminEntity;
import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:23
 */
@Mapper
public interface AdminMapper {
  Optional<AdminEntity> findByUsername(@Param("username") String username);
}