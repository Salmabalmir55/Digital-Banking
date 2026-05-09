package net.balmir.ebankingbackend.repositories;

import net.balmir.ebankingbackend.entities.AccountOperation;
import net.balmir.ebankingbackend.entities.BankAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
     List<AccountOperation> findByBankAccountId(String accountId);
     Page<AccountOperation> findByBankAccountId(String accountId , Pageable pageable);


}
