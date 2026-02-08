package com.lakshman.Billing_Software.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "items_tbl")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String itemId;

    private String itemName;

    private BigDecimal itemPrice;

    private String itemDescription;

    private String itemImageUrl;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp itemCreatedAt;

    @UpdateTimestamp
    private Timestamp itemUpdatedAt;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    private CategoryEntity itemCategory;
}
