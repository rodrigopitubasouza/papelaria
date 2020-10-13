package com.example.papelaria.handler;

import com.example.papelaria.exception.BusinessException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@Order(1)
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String message = "JSON da requisição está com formato errado.";
        return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, message, ex), status);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<ApiValidationError> messageErrosField = getMessagesOfField(ex);
        List<String> messageErrorsGlobal = getMessagesGlobal(ex);
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, messageErrorsGlobal, ex, messageErrosField);

        return new ResponseEntity<>(apiError, status);
    }

    @ExceptionHandler(BusinessException.class)
    protected ResponseEntity<Object> handleException(BusinessException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage(), ex);
        return new ResponseEntity<>(apiError, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    private List<ApiValidationError> getMessagesOfField(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getFieldErrors().stream()
                .map(error -> new ApiValidationError(error.getField(), error.getRejectedValue(), error.getDefaultMessage()))
                .collect(Collectors.toList());
    }

    private List<String> getMessagesGlobal(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getGlobalErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());
    }

}
