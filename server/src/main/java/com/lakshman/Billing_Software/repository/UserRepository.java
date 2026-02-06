package com.lakshman.Billing_Software.repository;

import com.lakshman.Billing_Software.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUserEmail(String userEmail);

    Optional<UserEntity> findByUserId(String userId);
}
