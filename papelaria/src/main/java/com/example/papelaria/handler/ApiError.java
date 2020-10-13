package com.example.papelaria.handler;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ApiError {

    private HttpStatus httpStatus;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime timestamp;
    private List<String> messages = new ArrayList<>();
    private String debugMessage;
    private List<ApiValidationError> subErrors;


    public ApiError(HttpStatus httpStatus, String message, Throwable error) {
        this.httpStatus = httpStatus;
        messages.add(message);
        this.debugMessage = error.getLocalizedMessage();
        this.timestamp = LocalDateTime.now();
    }


    public ApiError(HttpStatus httpStatus, List<String> messages, Throwable error, List<ApiValidationError> subErrors) {
        this.httpStatus = httpStatus;
        messages.add("TESTANDO ESTA MERDA");
        this.debugMessage = error.getLocalizedMessage();
        this.timestamp = LocalDateTime.now();
        this.subErrors = subErrors;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public String getDebugMessage() {
        return debugMessage;
    }

    public void setDebugMessage(String debugMessage) {
        this.debugMessage = debugMessage;
    }

    public List<ApiValidationError> getSubErrors() {
        return subErrors;
    }

    public void setSubErrors(List<ApiValidationError> subErrors) {
        this.subErrors = subErrors;
    }
}
