package net.balmir.chatbot.agents;


import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class AIAgent {
    private ChatClient chatClient;

    public AIAgent(ChatClient.Builder builder,
                   ChatMemory memory,
                   ToolCallbackProvider tools) {

        Arrays.stream(tools.getToolCallbacks()).forEach(toolCallback -> {
            System.out.println("----------------------");
            System.out.println("Outil chargé: " + toolCallback.getToolDefinition().name());
            System.out.println("Description: " + toolCallback.getToolDefinition().description());
            System.out.println("----------------------");
        });

        this.chatClient = builder
                .defaultSystem("""
                        Vous êtes un assistant bancaire qui se charge de répondre aux questions
                        de l'utilisateur en fonction du contexte fourni.
                        Si aucun contexte n'est fourni, répondez avec "JE NE SAIS PAS".
                        
                        Vous avez accès aux outils suivants:
                        - getCustomer: Récupérer un client par son ID
                        - getAllCustomers: Lister tous les clients
                        
                        Utilisez ces outils quand c'est pertinent pour répondre à l'utilisateur.
                        """)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(memory).build())
                .defaultToolCallbacks(tools)
                .build();
    }

    public String askAgent(String query) {
        return chatClient.prompt()
                .user(query)
                .call()
                .content();
    }
}
