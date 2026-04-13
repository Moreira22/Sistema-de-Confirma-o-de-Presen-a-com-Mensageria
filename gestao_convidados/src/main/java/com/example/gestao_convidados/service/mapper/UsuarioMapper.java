package com.example.gestao_convidados.service.mapper;

import com.example.gestao_convidados.model.Usuario;
import com.example.gestao_convidados.service.dto.UsuarioDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioDTO toDTO(Usuario usuario);

    Usuario toEntity(UsuarioDTO dto);
}
