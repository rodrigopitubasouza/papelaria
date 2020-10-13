package com.example.papelaria.service;

import com.example.papelaria.dto.CategoriaDto;
import com.example.papelaria.dto.ProdutoDto;
import com.example.papelaria.exception.BusinessException;
import com.example.papelaria.model.Categoria;
import com.example.papelaria.model.Produto;
import com.example.papelaria.repository.CategoriaRepository;
import com.example.papelaria.repository.ProdutoRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    public List<CategoriaDto> findAll() {
        List<Categoria> categorias = repository.findAll();
        return ConverterParaListaDto(categorias);
    }

    public Categoria findByIdValidado(Integer id) {
        return repository.findById(id).orElseThrow(() -> new BusinessException(MessageFormat.format("Categoria de id {0} não encontrado.", id)));
    }

    private List<CategoriaDto> ConverterParaListaDto(List<Categoria> categorias) {
        Type listTypeCategoriaDto = new TypeToken<List<CategoriaDto>>() {}.getType();
        return modelMapper.map(categorias   , listTypeCategoriaDto);
    }
}
