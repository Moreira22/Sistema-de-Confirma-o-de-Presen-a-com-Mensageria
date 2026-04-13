package com.example.gestao_convidados.repository;

import com.example.gestao_convidados.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByUsuarioId(Long usuarioId);
}
