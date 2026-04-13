package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Evento;
import com.example.gestao_convidados.service.dto.EventoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EventoMapper {

    EventoDTO toDTO(Evento evento);

    Evento toEntity(EventoDTO dto);
}
