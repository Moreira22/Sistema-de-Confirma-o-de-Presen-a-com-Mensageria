package com.example.gestao_convidados.controller;

import com.example.gestao_convidados.service.ConvidadoService;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/convidado")
public class ConvidadoController {

    @Autowired
    private ConvidadoService service;

    @PostMapping
    public ResponseEntity<ConvidadoDTO> criar(@RequestBody ConvidadoDTO dto) {

        ConvidadoDTO novo = service.salvar(dto);

        return ResponseEntity.ok(novo);
    }

    @GetMapping("/liste")
    public ResponseEntity<List<ConvidadoDTO>> liste(){
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/bussca/{Id}")
    public ResponseEntity<ConvidadoDTO> buscar(@PathVariable Long Id) {

        ConvidadoDTO dto = service.findById(Id);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/listaPorEvento/{Id}")
    public ResponseEntity<List<ConvidadoDTO>> listaPorEvento(@PathVariable Long Id) {
        return ResponseEntity.ok(service.listarPorEvento(Id));
    }

    @PostMapping("/convidados/{id}/confirmar")
    public ResponseEntity enviarConfirmacao(@PathVariable Long id) {

        ConvidadoDTO convidado = service.findById(id);

        service.enviarConfirmacao(convidado);

        return ResponseEntity.ok("Email enviado com sucesso");
    }
}
