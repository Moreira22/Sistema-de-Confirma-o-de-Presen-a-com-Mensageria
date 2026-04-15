package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Usuario;
import com.example.gestao_convidados.service.dto.UsuarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.InheritInverseConfiguration;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends EntityMapper<UsuarioDTO,Usuario> {

    @Override
    UsuarioDTO toDto(Usuario usuario);

    @Override
    @InheritInverseConfiguration
    Usuario toEntity(UsuarioDTO dto);
}
