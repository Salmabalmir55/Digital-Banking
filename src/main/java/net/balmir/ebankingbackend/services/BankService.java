package net.balmir.ebankingbackend.services;


import net.balmir.ebankingbackend.entities.BankAccount;
import net.balmir.ebankingbackend.entities.CurrentAccount;
import net.balmir.ebankingbackend.entities.SavingAccount;
import net.balmir.ebankingbackend.repositories.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional

public class BankService {
    @Autowired
    private BankAccountRepository bankAccountRepository;
    public void consulter () {
        BankAccount bankAccount =
                bankAccountRepository.findById("3fbf02fa-7aa3-489d-90fa-e5264361636c").orElse(null);
        if (bankAccount != null) {
            System.out.println("****************************");
            System.out.println(bankAccount.getId());
            System.out.println(bankAccount.getBalance());
            System.out.println(bankAccount.getStatus());
            System.out.println(bankAccount.getCreatedAt());
            System.out.println(bankAccount.getCustomer().getName());
            System.out.println(bankAccount.getClass().getSimpleName());
            if (bankAccount instanceof CurrentAccount) {
                System.out.println("Over Draft => " + ((CurrentAccount) bankAccount).getOverDraft());
            } else if (bankAccount instanceof SavingAccount) {
                System.out.println("Rate => " + ((SavingAccount) bankAccount).getInterestRate());
            }

            bankAccount.getAccountOperations().forEach(op -> {
                System.out.println(op.getType() + "\t" + op.getOperationDate() + "\t" + op.getAmount());
            });
        }
    }
}
