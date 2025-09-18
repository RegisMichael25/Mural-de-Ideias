package com.regis.mural.ideias.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Regis Michael
 * @since 2025-09-17
 */
@Data
@AllArgsConstructor

public class IdeaRequest {
    @NotBlank(message = "O campo 'Titulo' é obrigatório")
    private String title;

    @NotBlank(message = "O campo 'Descrição' é obrigatório")
    private String textarea;
}
