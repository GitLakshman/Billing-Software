package com.lakshman.Billing_Software.controller;


import com.lakshman.Billing_Software.dto.DashboardResponse;
import com.lakshman.Billing_Software.dto.OrderResponse;
import com.lakshman.Billing_Software.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;

    @GetMapping
    public DashboardResponse getDashboardData(){
        LocalDate now = LocalDate.now();
        Double todaySales = orderService.salesSumByDate(now);
        Long todayOrderCount = orderService.countByOrderDate(now);
        List<OrderResponse> recentOrders = orderService.getLatestOrders();

        return new DashboardResponse(
                todaySales != null ? todaySales : 0.0,
                todayOrderCount != null ? todayOrderCount : 0,
                recentOrders
        );

    }

}
