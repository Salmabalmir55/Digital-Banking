package net.balmir.ebankingbackend.web;

import net.balmir.ebankingbackend.dtos.AccountHistoryDTO;
import net.balmir.ebankingbackend.dtos.AccountOperationDTO;
import net.balmir.ebankingbackend.dtos.BankAccountDTO;
import net.balmir.ebankingbackend.exceptions.BankAccoutNotFoundException;
import net.balmir.ebankingbackend.services.BankAccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BankAccountRestAPI {
    private BankAccountService bankAccountService;

    public BankAccountRestAPI(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }
@GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccoutNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }


    @GetMapping("/accounts")
    public List<BankAccountDTO> BankAccounts(){
        return bankAccountService.BankAccountList();
    }

    @GetMapping("/accounts/{accountId}/operations")
    public List<AccountOperationDTO>getHistory (@PathVariable String accountId){
        return bankAccountService.accountHistory(accountId);
    }

    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory (
            @PathVariable String accountId ,
            @RequestParam (name="page" , defaultValue="0" )int page ,
            @RequestParam (name="size" , defaultValue="5" ) int size ) throws BankAccoutNotFoundException {
            return bankAccountService.getAccountHistory(accountId,page , size);
    }
}
