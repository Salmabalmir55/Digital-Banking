package net.balmir.ebankingbackend.dtos;


import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({ "type", "id", "balance", "createdAt", "status", "customerDTO" })
public class BankAccountDTO {
    private String type ;
}
