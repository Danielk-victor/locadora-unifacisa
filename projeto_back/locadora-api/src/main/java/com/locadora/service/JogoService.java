package com.locadora.service;

import com.locadora.entity.Jogo;
import com.locadora.exception.RecursoNaoEncontradoException;
import com.locadora.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JogoService {

    private final JogoRepository jogoRepository;

    @Autowired
    public JogoService(JogoRepository jogoRepository) {
        this.jogoRepository = jogoRepository;
    }

    public List<Jogo> listarTodos() {
        return jogoRepository.findAll();
    }

    public Jogo buscarPorId(Long id) {
        return jogoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Jogo não encontrado com o id: " + id));
    }

    public Jogo criar(Jogo jogo) {
        jogo.setId(null);
        return jogoRepository.save(jogo);
    }

    public Jogo atualizar(Long id, Jogo jogoAtualizado) {
        Jogo jogoExistente = buscarPorId(id);

        jogoExistente.setTitulo(jogoAtualizado.getTitulo());
        jogoExistente.setGenero(jogoAtualizado.getGenero());
        jogoExistente.setPlataforma(jogoAtualizado.getPlataforma());
        jogoExistente.setAnoLancamento(jogoAtualizado.getAnoLancamento());
        jogoExistente.setValorLocacao(jogoAtualizado.getValorLocacao());
        jogoExistente.setDisponivel(jogoAtualizado.getDisponivel());

        return jogoRepository.save(jogoExistente);
    }

    public void deletar(Long id) {
        Jogo jogo = buscarPorId(id);
        jogoRepository.delete(jogo);
    }
}
