package com.lakshman.Billing_Software.repository;

import com.lakshman.Billing_Software.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity,Long> {

}
