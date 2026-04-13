package com.example.gestao_convidados.service;

import com.example.gestao_convidados.model.Convidado;
import com.example.gestao_convidados.repository.ConvidadoRepository;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import com.example.gestao_convidados.service.mapper.ConvidadoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConvidadoService {

    @Autowired
    private ConvidadoRepository repository;

    @Autowired
    private ConvidadoMapper mapper;

    public ConvidadoDTO salvar(ConvidadoDTO dto) {

        Convidado convidado = mapper.toEntity(dto);

        convidado = repository.save(convidado);

        return mapper.toDTO(convidado);
    }

}
