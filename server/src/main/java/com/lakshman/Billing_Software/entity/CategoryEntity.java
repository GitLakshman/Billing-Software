package com.lakshman.Billing_Software.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "category_tbl")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String categoryId;

    @Column(unique = true, nullable = false)
    private String categoryName;

    private String categoryDescription;
    private String categoryImageUrl;
    private String categoryBgColor;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp CategoryCreatedAt;

    @UpdateTimestamp
    private Timestamp CategoryUpdatedAt;
}
