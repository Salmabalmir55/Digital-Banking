package net.balmir.ebankingbackend.services;

import net.balmir.ebankingbackend.dtos.*;
import net.balmir.ebankingbackend.entities.BankAccount;
import net.balmir.ebankingbackend.entities.CurrentAccount;
import net.balmir.ebankingbackend.entities.Customer;
import net.balmir.ebankingbackend.entities.SavingAccount;
import net.balmir.ebankingbackend.exceptions.BalanceNotSufficentException;
import net.balmir.ebankingbackend.exceptions.BankAccoutNotFoundException;
import net.balmir.ebankingbackend.exceptions.CustomerNotFoundException;
import net.balmir.ebankingbackend.repositories.AccountOperationRepository;

import java.util.List;

public interface BankAccountService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);
    CurrentBankAccountDTO  saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException;
    SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException;
    List<CustomerDTO> listCustomers();
    BankAccountDTO getBankAccount(String accountId) throws BankAccoutNotFoundException;
    void debit(String accountId, double amount, String description) throws BankAccoutNotFoundException, BalanceNotSufficentException;
    void credit(String accountId, double amount, String description) throws BankAccoutNotFoundException;
    void transfer(String accountIdSource, String accountIdDestination, double amount) throws BankAccoutNotFoundException, BalanceNotSufficentException;


    List<BankAccountDTO> BankAccountList();


    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;

    CustomerDTO updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer(Long customerId);

    AccountOperationRepository getAccountOperationRepository();

    List<AccountOperationDTO> accountHistory(String accountId);

    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccoutNotFoundException;
}
