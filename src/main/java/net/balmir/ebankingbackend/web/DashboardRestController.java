package net.balmir.ebankingbackend.web;

import lombok.AllArgsConstructor;

import net.balmir.ebankingbackend.dtos.DashboardDTO;
import net.balmir.ebankingbackend.services.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@AllArgsConstructor
//@CrossOrigin("*")
public class DashboardRestController {

  private final DashboardService dashboardService;

  @GetMapping
  public DashboardDTO getDashboard() {
    return dashboardService.getDashboardData();
  }
}
