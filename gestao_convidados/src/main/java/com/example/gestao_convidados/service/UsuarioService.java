package com.example.gestao_convidados.service;
import com.example.gestao_convidados.model.Usuario;
import com.example.gestao_convidados.repository.UsuarioRepository;
import com.example.gestao_convidados.service.dto.UsuarioDTO;
import com.example.gestao_convidados.service.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private UsuarioMapper mapper;


    public Usuario findEntity(Long id){
        return repository.findById(id).orElse(null);
    }

    public UsuarioDTO findById(Long id){
        return  mapper.toDto(findEntity(id));
    }

    public List<UsuarioDTO> listar(){
        return mapper.toDto(repository.findAll());
    }

    public UsuarioDTO salvar(UsuarioDTO dto) {
        return mapper.toDto( repository.save(mapper.toEntity(dto)));
    }

}
