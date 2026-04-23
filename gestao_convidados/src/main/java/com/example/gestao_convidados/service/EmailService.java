package com.example.gestao_convidados.service;

import com.example.gestao_convidados.model.Convidado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void enviarCodigoConfirmacao(String email, String nome, String codigo) {

        SimpleMailMessage mensagem = new SimpleMailMessage();

        mensagem.setTo(email);
        mensagem.setSubject("Confirmação de presença no evento");

        mensagem.setText(
                "Olá " + nome + ",\n\n" +
                        "Seu código para confirmar presença é:\n\n" +
                        codigo + "\n\n" +
                        "Digite esse código no sistema para confirmar sua presença."
        );

        mailSender.send(mensagem);
    }

    public String gerarCodigo() {

        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder codigo = new StringBuilder();

        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            codigo.append(caracteres.charAt(random.nextInt(caracteres.length())));
        }

        return codigo.toString();
    }
}
