package com.example.gestao_convidados.service;

import com.example.gestao_convidados.model.Convidado;
import com.example.gestao_convidados.repository.ConvidadoRepository;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import com.example.gestao_convidados.service.mapper.ConvidadoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConvidadoService {

    @Autowired
    private ConvidadoRepository repository;

    @Autowired
    private ConvidadoMapper mapper;

    @Autowired
    private EmailService emailService;


    public Convidado findEntity(Long id){
        return repository.findById(id).orElse(null);
    }

    public ConvidadoDTO findById(Long id){
        return  mapper.toDto(findEntity(id));
    }

    public List<ConvidadoDTO> listar(){
        return mapper.toDto(repository.findAll());
    }

    public List<ConvidadoDTO> listarPorEvento(Long idEvento ){
        return mapper.toDto(repository.findByEventoId(idEvento));
    }

    public ConvidadoDTO salvar(ConvidadoDTO dto) {
        return mapper.toDto( repository.save(mapper.toEntity(dto)));
    }

    public void enviarConfirmacao(ConvidadoDTO dto) {

        String codigo = emailService.gerarCodigo();

        dto.setCodigoConfirmacao(codigo);

        repository.save(mapper.toEntity(dto));

        emailService.enviarCodigoConfirmacao(
                dto.getEmail(),
                dto.getNome(),
                codigo
        );
    }

}
