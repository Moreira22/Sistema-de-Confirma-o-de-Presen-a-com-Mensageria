package com.example.gestao_convidados.repository;

import com.example.gestao_convidados.model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ConvidadoRepository extends JpaRepository<Convidado, Long> {

    List<Convidado> findByEventoId(Long eventoId);

    Optional<Convidado> findByCodigoConfirmacao(String codigoConfirmacao);
}
