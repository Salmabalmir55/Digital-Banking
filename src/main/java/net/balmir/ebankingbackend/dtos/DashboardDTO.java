package net.balmir.ebankingbackend.dtos;

import lombok.Data;
import java.util.List;

@Data
public class DashboardDTO {

  private long totalCustomers;
  private long totalAccounts;
  private long activeAccounts;
  private long suspendedAccounts;
  private long currentAccounts;
  private long savingAccounts;
  private double totalBalance;
  private double totalDebitAmount;
  private double totalCreditAmount;
  private long totalOperations;

  private List<CustomerDTO> recentCustomers;
  private List<RecentAccountDTO> recentAccounts;
  private List<RecentOperationDTO> recentOperations;

  @Data
  public static class RecentAccountDTO {
    private String id;
    private String type;
    private double balance;
    private String status;
    private String currency;
    private String customerName;
    private String createdAt;
    private double overdraft;
    private double interestRate;
  }

  @Data
  public static class RecentOperationDTO {
    private Long id;
    private String operationDate;
    private double amount;
    private String type;
    private String description;
    private String accountId;
    private String customerName;
  }
}
