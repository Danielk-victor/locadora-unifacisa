package com.locadora.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jogos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título é obrigatório")
    private String titulo;

    @NotBlank(message = "O gênero é obrigatório")
    private String genero;

    @NotBlank(message = "A plataforma é obrigatória")
    private String plataforma;

    @NotNull(message = "O ano de lançamento é obrigatório")
    private Integer anoLancamento;

    @NotNull(message = "O valor da locação é obrigatório")
    @Positive(message = "O valor da locação deve ser maior que zero")
    private Double valorLocacao;

    @NotNull(message = "É necessário informar se o jogo está disponível")
    private Boolean disponivel;
}
