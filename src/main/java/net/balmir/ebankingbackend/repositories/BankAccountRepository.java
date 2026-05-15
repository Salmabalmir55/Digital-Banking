package net.balmir.ebankingbackend.repositories;

import net.balmir.ebankingbackend.entities.BankAccount;
import net.balmir.ebankingbackend.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, String> {
    List<BankAccount> findByCustomerId(Long customerId);
}
