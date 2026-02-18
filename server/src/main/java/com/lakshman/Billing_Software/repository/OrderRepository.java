package com.lakshman.Billing_Software.repository;

import com.lakshman.Billing_Software.entity.OrderEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByOrderId(String orderId);
    List<OrderEntity> findAllByOrderByOrderIdDesc();

    @Query("select  sum(o.grandTotal) from OrderEntity o where date(o.orderCreatedAt) = :date")
    Double salesSumByDate(@Param("date") LocalDate date);

    @Query("select count(o) from OrderEntity o where date(o.orderCreatedAt) = :date")
    Long countByOrderDate(@Param("date") LocalDate date);

    @Query("select o from OrderEntity o order by o.orderCreatedAt desc")
    List<OrderEntity> findRecentOrders(PageRequest pageRequest);
}
