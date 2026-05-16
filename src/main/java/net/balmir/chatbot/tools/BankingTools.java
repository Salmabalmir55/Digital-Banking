package net.balmir.chatbot.tools;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class BankingTools {

        @Tool(name = "getCustomer",
                description = "Récupérer un client par son ID")
        public Customer getCustomer(@ToolParam(description = "The Customer Id") Long id) {
            return new Customer(id, "Salma", "salma@gmail.com");
        }
        @Tool(description = "Get All Customers" )
        public List<Customer> getAllCustomers (){
            return List.of(
                    new Customer(1L , "Alaa" , "alaa@gmail.com"),
                    new Customer(2L , "Celia" , "celia@gmail.com"),
                    new Customer(3L , "Assil" , "assil@gmail.com")
            );
        }
}
    record Customer(Long id, String name, String email) {}


