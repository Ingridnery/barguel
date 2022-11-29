package com.example.barguel.dtos;

import com.example.barguel.models.barco.BarcoModel;
import com.example.barguel.models.cliente.ClienteModel;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AluguelDto {
    @NotNull
    private ClienteModel cliente;
    @NotNull
    private BarcoModel barco;
    @NotNull
    private LocalDate dataInicio;
    @NotNull
    private LocalDate dataFim;
    @NotNull
    private int qtdPassageiros;

    public AluguelDto(ClienteModel cliente, BarcoModel barco, LocalDate dataInicio, LocalDate dataFim, int qtdPassageiros) {
        this.cliente = cliente;
        this.barco = barco;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.qtdPassageiros = qtdPassageiros;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public BarcoModel getBarco() {
        return barco;
    }

    public void setBarco(BarcoModel barco) {
        this.barco = barco;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public int getQtdPassageiros() {
        return qtdPassageiros;
    }

    public void setQtdPassageiros(int qtdPassageiros) {
        this.qtdPassageiros = qtdPassageiros;
    }
}
