package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Evento;
import com.example.gestao_convidados.service.dto.EventoDTO;
import org.mapstruct.Mapper;

import org.mapstruct.InheritInverseConfiguration;

@Mapper(componentModel = "spring")
public interface EventoMapper extends EntityMapper<EventoDTO,Evento>{

    @Override
    EventoDTO toDto(Evento evento);

    @Override
    @InheritInverseConfiguration
    Evento toEntity(EventoDTO dto);
}
