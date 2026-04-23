package com.example.gestao_convidados.service.dto;


import java.util.List;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventoDTO {

    private Long id;
    private String nome;
    private LocalDate data;
    private String local;

}
