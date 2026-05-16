package net.balmir.chatbot.agents;

import net.balmir.chatbot.tools.BankingTools;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class AIAgent {
    private final ChatClient chatClient;

    public AIAgent(ChatClient.Builder builder,
                   ChatMemory memory,
                   BankingTools bankingTools) {
        this.chatClient = builder
                .defaultSystem("""
                Vous êtes un assistant qui se charge de répondre aux questions 
                de l'utilisateur en fonction du contexte fourni.
                si aucun contexte n'est fourni, répond avec JE NE SAIS PAS
                
                Vous pouvez utiliser l'outil getCustomer pour obtenir les informations d'un client.
                """)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(memory).build())
                .defaultTools(bankingTools)
                .build();
    }

    public Flux<String> askAgent(String query) {
        return chatClient.prompt()
                .user(query)
                .stream()
                .content();
    }
}