package net.balmir.chatbot.tools;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;



@Component
public class BankingTools {

        @Tool(name = "getCustomer",
                description = "Récupérer un client par son ID")
        public Customer getCustomer(@ToolParam(description = "The Customer Id") Long id) {
            return new Customer(id, "Salma", "salma@gmail.com");
        }
}
    record Customer(Long id, String name, String email) {}


