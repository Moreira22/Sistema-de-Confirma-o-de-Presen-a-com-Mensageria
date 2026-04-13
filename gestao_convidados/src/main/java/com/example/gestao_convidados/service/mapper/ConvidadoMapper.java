package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Convidado;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface ConvidadoMapper {

//    @Mapping(target = "", ignore = true)
    ConvidadoDTO toDTO(Convidado convidado);

    Convidado toEntity(ConvidadoDTO dto);
}
