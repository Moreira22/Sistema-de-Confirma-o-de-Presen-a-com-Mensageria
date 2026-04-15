package com.example.gestao_convidados.controller;
import com.example.gestao_convidados.service.EventoService;
import com.example.gestao_convidados.service.dto.EventoDTO;
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
@RequestMapping("/app/evento")
public class EventoController {
    @Autowired
    private EventoService service;

    @PostMapping
    public ResponseEntity<EventoDTO> criar(@RequestBody EventoDTO dto) {

        EventoDTO novo = service.salvar(dto);

        return ResponseEntity.ok(novo);
    }

    @GetMapping("/lista")
    public ResponseEntity<List<EventoDTO>> liste(){
        return ResponseEntity.ok(service.listar());
    }


    @GetMapping("/lista/{IdUsurio}")
    public ResponseEntity<List<EventoDTO>> liste(@PathVariable Long IdUsurio){
        return ResponseEntity.ok(service.listarPorUsuarrio(IdUsurio));
    }

    @GetMapping("/bussca/{machineId}")
    public ResponseEntity<EventoDTO> buscar(@PathVariable Long Id) {

        EventoDTO dto = service.findById(Id);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(dto);
    }
}
