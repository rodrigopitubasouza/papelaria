package com.example.papelaria.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProdutoDto {
    private Integer id;

    @NotBlank(message = "{codigo.barras.not.blank}")
    @Size(max = 25, message = "{codigo.barras.size}")
    private String codigoBarras;

    @NotBlank(message = "{nome.not.blank}")
    @Size(max = 150, message = "{nome.size}")
    private String nome;

    @NotBlank(message = "{descricao.not.blank}")
    @Size(max = 350, message = "{descricao.size}")
    private String descricao;

    @NotNull(message = "{quantidade.not.null}")
    @Min(value = 0, message = "{quantidade.min.value}")
    @Max(value = Integer.MAX_VALUE, message = "{quantidade.max.value}")
    private Integer quantidade;

    @NotNull(message = "{categoria.not.null}")
    @Min(value = 1, message = "{categoria.min.value}")
    private Integer categoria;

    private String nomeCategoria;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCategoria() {
        return categoria;
    }

    public void setCategoria(Integer categoria) {
        this.categoria = categoria;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getNomeCategoria() {
        return nomeCategoria;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeCategoria = nomeCategoria;
    }
}
