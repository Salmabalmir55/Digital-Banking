package net.balmir.ebankingbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.balmir.ebankingbackend.enums.AccountStatus;

import java.util.Date;
import java.util.List;
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE" , length=4)
@Data @NoArgsConstructor
@AllArgsConstructor

public abstract class BankAccount {
    @Id
    private String id ;
    private double balance ;
    private Date createdAt ;
    private AccountStatus status ;
    @ManyToOne
    private Customer customer ;
    @OneToMany(mappedBy = "bankAccount" , fetch = FetchType.LAZY) //3.00.00 / 05
    private List<AccountOperation> accountOperations ;

}
