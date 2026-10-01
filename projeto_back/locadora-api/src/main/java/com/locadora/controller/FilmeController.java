package com.locadora.controller;

import com.locadora.entity.Filme;
import com.locadora.service.FilmeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filmes")
public class FilmeController {

    private final FilmeService filmeService;

    @Autowired
    public FilmeController(FilmeService filmeService) {
        this.filmeService = filmeService;
    }

    @GetMapping
    public ResponseEntity<List<Filme>> listarTodos() {
        return ResponseEntity.ok(filmeService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(filmeService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Filme> criar(@Valid @RequestBody Filme filme) {
        Filme novoFilme = filmeService.criar(filme);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoFilme);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filme> atualizar(@PathVariable Long id, @Valid @RequestBody Filme filme) {
        return ResponseEntity.ok(filmeService.atualizar(id, filme));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        filmeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
