package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Convidado;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.InheritInverseConfiguration;


@Mapper(componentModel = "spring")
public interface ConvidadoMapper extends EntityMapper<ConvidadoDTO, Convidado>  {

//    @Mapping(target = "", ignore = true)
    @Override
    ConvidadoDTO  toDto(Convidado convidado);

    @Override
    @InheritInverseConfiguration
    Convidado toEntity(ConvidadoDTO dto);
}
