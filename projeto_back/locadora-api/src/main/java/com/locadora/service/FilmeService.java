package com.locadora.service;

import com.locadora.entity.Filme;
import com.locadora.exception.RecursoNaoEncontradoException;
import com.locadora.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmeService {

    private final FilmeRepository filmeRepository;

    @Autowired
    public FilmeService(FilmeRepository filmeRepository) {
        this.filmeRepository = filmeRepository;
    }

    public List<Filme> listarTodos() {
        return filmeRepository.findAll();
    }

    public Filme buscarPorId(Long id) {
        return filmeRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Filme não encontrado com o id: " + id));
    }

    public Filme criar(Filme filme) {
        filme.setId(null);
        return filmeRepository.save(filme);
    }

    public Filme atualizar(Long id, Filme filmeAtualizado) {
        Filme filmeExistente = buscarPorId(id);

        filmeExistente.setTitulo(filmeAtualizado.getTitulo());
        filmeExistente.setGenero(filmeAtualizado.getGenero());
        filmeExistente.setDiretor(filmeAtualizado.getDiretor());
        filmeExistente.setAnoLancamento(filmeAtualizado.getAnoLancamento());
        filmeExistente.setValorLocacao(filmeAtualizado.getValorLocacao());
        filmeExistente.setDisponivel(filmeAtualizado.getDisponivel());

        return filmeRepository.save(filmeExistente);
    }

    public void deletar(Long id) {
        Filme filme = buscarPorId(id);
        filmeRepository.delete(filme);
    }
}
