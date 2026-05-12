package net.balmir.ebankingbackend.services;


import lombok.AllArgsConstructor;

import net.balmir.ebankingbackend.dtos.CustomerDTO;
import net.balmir.ebankingbackend.dtos.DashboardDTO;
import net.balmir.ebankingbackend.entities.AccountOperation;
import net.balmir.ebankingbackend.entities.BankAccount;
import net.balmir.ebankingbackend.entities.CurrentAccount;
import net.balmir.ebankingbackend.entities.SavingAccount;
import net.balmir.ebankingbackend.enums.AccountStatus;
import net.balmir.ebankingbackend.enums.OperationType;
import net.balmir.ebankingbackend.repositories.AccountOperationRepository;
import net.balmir.ebankingbackend.repositories.BankAccountRepository;
import net.balmir.ebankingbackend.repositories.CustomerRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

  private final CustomerRepository customerRepository;
  private final BankAccountRepository bankAccountRepository;
  private final AccountOperationRepository operationRepository;

  private static final SimpleDateFormat SDF =
    new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

  @Override
  public DashboardDTO getDashboardData() {
    DashboardDTO dto = new DashboardDTO();

    List<BankAccount> allAccounts = bankAccountRepository.findAll();

    dto.setTotalCustomers(customerRepository.count());
    dto.setTotalAccounts(allAccounts.size());
    dto.setActiveAccounts(
      allAccounts.stream()
        .filter(a -> a.getStatus() == AccountStatus.ACTIVATED).count());
    dto.setSuspendedAccounts(
      allAccounts.stream()
        .filter(a -> a.getStatus() == AccountStatus.SUSPENDED).count());
    dto.setCurrentAccounts(
      allAccounts.stream().filter(a -> a instanceof CurrentAccount).count());
    dto.setSavingAccounts(
      allAccounts.stream().filter(a -> a instanceof SavingAccount).count());
    dto.setTotalBalance(
      allAccounts.stream().mapToDouble(BankAccount::getBalance).sum());

    dto.setRecentCustomers(
      customerRepository
        .findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "id")))
        .stream().map(c -> {
          CustomerDTO cdto = new CustomerDTO();
          cdto.setId(c.getId());
          cdto.setName(c.getName());
          cdto.setEmail(c.getEmail());
          return cdto;
        }).collect(Collectors.toList()));

    dto.setRecentAccounts(
      bankAccountRepository
        .findAll(PageRequest.of(0, 5, Sort.by(Sort.Direction.DESC, "createdAt")))
        .stream().map(this::mapAccount).collect(Collectors.toList()));


    dto.setRecentOperations(
      operationRepository
        .findAll(PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "operationDate")))
        .stream().map(this::mapOperation).collect(Collectors.toList()));

    return dto;
  }

  private DashboardDTO.RecentAccountDTO mapAccount(BankAccount a) {
    DashboardDTO.RecentAccountDTO d = new DashboardDTO.RecentAccountDTO();
    d.setId(a.getId());
    d.setBalance(a.getBalance());
    d.setStatus(a.getStatus() != null ? a.getStatus().name() : "");
    d.setCreatedAt(a.getCreatedAt() != null ? SDF.format(a.getCreatedAt()) : "");
    if (a.getCustomer() != null) d.setCustomerName(a.getCustomer().getName());
    if (a instanceof CurrentAccount ca) { d.setType("CurrentAccount"); d.setOverdraft(ca.getOverDraft()); }
    else if (a instanceof SavingAccount sa) { d.setType("SavingAccount"); d.setInterestRate(sa.getInterestRate()); }
    return d;
  }

  private DashboardDTO.RecentOperationDTO mapOperation(AccountOperation op) {
    DashboardDTO.RecentOperationDTO d = new DashboardDTO.RecentOperationDTO();
    d.setId(op.getId());
    d.setAmount(op.getAmount());
    d.setDescription(op.getDescription());
    d.setType(op.getType() != null ? op.getType().name() : "");
    d.setOperationDate(op.getOperationDate() != null ? SDF.format(op.getOperationDate()) : "");
    if (op.getBankAccount() != null) {
      d.setAccountId(op.getBankAccount().getId());
      if (op.getBankAccount().getCustomer() != null)
        d.setCustomerName(op.getBankAccount().getCustomer().getName());
    }
    return d;
  }
}
