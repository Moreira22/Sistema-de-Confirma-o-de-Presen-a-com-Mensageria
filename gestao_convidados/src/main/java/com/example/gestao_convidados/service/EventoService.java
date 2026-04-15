package com.example.gestao_convidados.service;

import com.example.gestao_convidados.model.Evento;
import com.example.gestao_convidados.repository.EventoRepository;
import com.example.gestao_convidados.service.dto.EventoDTO;
import com.example.gestao_convidados.service.mapper.EventoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EventoService {
    @Autowired
    private EventoRepository repository;
    @Autowired
    private EventoMapper mapper;

    public Evento findEntity(Long id){
        return repository.findById(id).orElse(null);
    }

    public EventoDTO findById(Long id){
        return  mapper.toDto(findEntity(id));
    }

    public List<EventoDTO> listar(){
        return mapper.toDto(repository.findAll());
    }
    public List<EventoDTO> listarPorUsuarrio(Long idUsuario){
        return mapper.toDto(repository.findByUsuarioId(idUsuario));
    }

    public EventoDTO salvar(EventoDTO dto) {
        return mapper.toDto( repository.save(mapper.toEntity(dto)));
    }



}
