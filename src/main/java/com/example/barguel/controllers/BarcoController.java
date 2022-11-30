package com.example.barguel.controllers;

import com.example.barguel.dtos.BarcoDto;
import com.example.barguel.models.barco.BarcoModel;
import com.example.barguel.services.BarcoService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("barco")
public class BarcoController {

    final BarcoService barcoService;

    public BarcoController(BarcoService barcoService) {
        this.barcoService = barcoService;
    }
    @PostMapping(value = "/save")
    public ResponseEntity<Object> saveBarco(@Valid @RequestBody BarcoDto barcoDto){
        var barcoModel= new BarcoModel();
        BeanUtils.copyProperties(barcoDto,barcoModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(barcoService.save(barcoModel));
    }
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateBarco(@PathVariable UUID id, @RequestBody @Valid BarcoDto barcoDto){
        Optional<BarcoModel> barcoModelOptional = barcoService.findById(id);
        if(barcoModelOptional.isPresent()){
            var barcoModel = barcoModelOptional.get();
            barcoModel.setNome(barcoDto.getNome());
            barcoModel.setTipoBarco(barcoDto.getTipoBarco());
            barcoModel.setTamanho(barcoDto.getTamanho());
            barcoModel.setQtdPassageiros(barcoDto.getQtdPassageiros());
            barcoModel.setValorDiaria(barcoDto.getValorDiaria());

            return ResponseEntity.status(HttpStatus.OK).body(barcoService.save(barcoModel));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(barcoService.findAll());
    }

    @GetMapping(value = "/findBy/{id}")
    public ResponseEntity<Object> getById(@PathVariable(value = "id")UUID id){
        Optional<BarcoModel> barcoModelOptional = barcoService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(barcoModelOptional.get());
    }
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteCliente(@PathVariable(value = "id")UUID id){
        Optional<BarcoModel> barcoModelOptional = barcoService.findById(id);
        if(barcoModelOptional.isEmpty()){

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barco não encontrado!");
        }
        //verificar se o barco possui um aluguel em aberto antes de excluir
        barcoService.deleteByid(barcoModelOptional.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body("Barco deletado com sucesso!");
    }
    @GetMapping(value = "getAll")
    public ResponseEntity<List<BarcoModel>> getAllClientes(){
        return ResponseEntity.status(HttpStatus.OK).body(barcoService.findAll());
    }
}
