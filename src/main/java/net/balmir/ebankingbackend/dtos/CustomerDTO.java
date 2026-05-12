package net.balmir.ebankingbackend.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({ "id", "name", "email" })
public class CustomerDTO {
    private Long id ;
    private String name ;
    private String email ;
}
