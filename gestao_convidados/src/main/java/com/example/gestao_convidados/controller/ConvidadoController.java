package com.example.gestao_convidados.controller;

import com.example.gestao_convidados.service.ConvidadoService;
import com.example.gestao_convidados.service.dto.ConvidadoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/convidados")
public class ConvidadoController {

    @Autowired
    private ConvidadoService service;

    @PostMapping

    public ResponseEntity<ConvidadoDTO> criar(@RequestBody ConvidadoDTO dto) {

        ConvidadoDTO novo = service.salvar(dto);

        return ResponseEntity.ok(novo);
    }
}
