package com.example.gestao_convidados.controller;
import com.example.gestao_convidados.service.UsuarioService;
import com.example.gestao_convidados.service.dto.UsuarioDTO;
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
@RequestMapping("/app/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@RequestBody UsuarioDTO dto) {

        UsuarioDTO novo = service.salvar(dto);

        return ResponseEntity.ok(novo);
    }

    @GetMapping("/liste")
    public ResponseEntity<List<UsuarioDTO>> liste(){
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/bussca/{Id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long Id) {

        UsuarioDTO dto = service.findById(Id);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}
