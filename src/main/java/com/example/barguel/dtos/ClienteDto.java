package com.example.barguel.dtos;

import javax.validation.constraints.NotBlank;

public class ClienteDto {

    @NotBlank
    private String nome;
    @NotBlank
    private String cpf;
    @NotBlank
    private String email;
    @NotBlank
    private String arraisAmador;

    public ClienteDto(String nome, String cpf, String email, String arraisAmador) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.arraisAmador = arraisAmador;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getArraisAmador() {
        return arraisAmador;
    }

    public void setArraisAmador(String arraisAmador) {
        this.arraisAmador = arraisAmador;
    }
}
