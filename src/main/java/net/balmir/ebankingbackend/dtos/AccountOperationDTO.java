package net.balmir.ebankingbackend.dtos;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.balmir.ebankingbackend.entities.BankAccount;
import net.balmir.ebankingbackend.enums.OperationType;

import java.util.Date;

@Data
public class AccountOperationDTO {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private Date operationDate;
    private double amount ;
    private OperationType type ;
    private String description ;

}
