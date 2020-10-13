package com.example.papelaria.service;

import com.example.papelaria.dto.ProdutoDto;
import com.example.papelaria.exception.BusinessException;
import com.example.papelaria.model.Categoria;
import com.example.papelaria.model.Produto;
import com.example.papelaria.repository.ProdutoRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.List;

@Service
@Validated
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private ModelMapper modelMapper;

    public List<ProdutoDto> findAll() {
        List<Produto> produtos = repository.findAll();
        return converterParaListaDeDto(produtos);
    }

    public ProdutoDto findById(Integer id) {
        Produto produto = findByIdValidado(id);
        return converterParaDto(produto);
    }

    public void save(@Valid ProdutoDto produtoDto) {
        Produto produto = converterParaEntidade(produtoDto);
        setupCategoriaNoProduto(produtoDto, produto);
        repository.save(produto);
    }

    public void update(@Valid ProdutoDto produtoAtualizado, @NotNull Integer id) {
        produtoAtualizado.setId(id);
        findByIdValidado(produtoAtualizado.getId());
        Produto produto = converterParaEntidade(produtoAtualizado);
        setupCategoriaNoProduto(produtoAtualizado, produto);
        repository.save(produto);
    }

    public void delete(Integer id) {
        Produto produto = findByIdValidado(id);
        repository.delete(produto);
    }

    private Produto findByIdValidado(Integer id) {
        return repository.findById(id).orElseThrow(() -> new BusinessException(MessageFormat.format("Produto de id {0} não encontrado.", id)));
    }

    private void setupCategoriaNoProduto(ProdutoDto produtoAtualizado, Produto produto) {
        Categoria categoria = categoriaService.findByIdValidado(produtoAtualizado.getCategoria());
        produto.setCategoria(categoria);
    }

    private Produto converterParaEntidade(ProdutoDto produtoAtualizado) {
        return modelMapper.map(produtoAtualizado, Produto.class);
    }

    private ProdutoDto converterParaDto(Produto produto) {
        configModelMapper();
        return modelMapper.map(produto, ProdutoDto.class);
    }

    private List<ProdutoDto> converterParaListaDeDto(List<Produto> produtos) {
        configModelMapper();
        Type listTypeProdutoDto = new TypeToken<List<ProdutoDto>>() {}.getType();
        return modelMapper.map(produtos, listTypeProdutoDto);
    }

    private void configModelMapper() {
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        modelMapper.typeMap(Produto.class, ProdutoDto.class).addMappings(mp -> {
            mp.map(src -> src.getCategoria().getId(), ProdutoDto::setCategoria);
        });
    }
}
