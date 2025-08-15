package com.osca.member.mapper;

import com.osca.member.domain.MemberEntity;
import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * please explain class!
 *
 * @author :Uheejoon
 * @date :2025-08-14 오전 12:27
 */
@Mapper
public interface MemberMapper {

  Optional<MemberEntity> findByEmail(@Param("email") String email);
}