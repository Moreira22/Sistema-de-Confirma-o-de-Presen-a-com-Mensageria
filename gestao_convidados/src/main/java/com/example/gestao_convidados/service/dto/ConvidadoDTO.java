package com.example.gestao_convidados.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConvidadoDTO {

    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String codigoConfirmacao;
    private boolean confirmado;

}
