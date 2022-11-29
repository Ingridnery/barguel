package com.example.barguel.controllers;

import com.example.barguel.dtos.AluguelDto;
import com.example.barguel.models.aluguel.AluguelModel;
import com.example.barguel.models.cliente.ClienteModel;
import com.example.barguel.services.AluguelService;
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
@RequestMapping("aluguel")
public class AluguelController {
    final AluguelService aluguelService;

    public AluguelController(AluguelService aluguelService) {
        this.aluguelService = aluguelService;
    }


    @PostMapping(value = "/save")
    public ResponseEntity<Object> saveAluguel(@Valid @RequestBody AluguelDto aluguelDto){
        var aluguelModel = new AluguelModel();
        BeanUtils.copyProperties(aluguelDto, aluguelModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(aluguelService.save(aluguelModel));
    }
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateAluguel(@PathVariable UUID id, @RequestBody @Valid AluguelDto aluguelDto){
        Optional<AluguelModel> aluguelModelOptional = aluguelService.findById(id);
        if(aluguelModelOptional.isPresent()){
            var aluguelModel = aluguelModelOptional.get();
            aluguelModel.setBarco(aluguelDto.getBarco());
            aluguelModel.setCliente(aluguelDto.getCliente());
            aluguelModel.setDataInicio(aluguelDto.getDataInicio());
            aluguelModel.setDataFinal(aluguelDto.getDataFim());
            aluguelModel.setQtdPassageiros(aluguelDto.getQtdPassageiros());

            return ResponseEntity.status(HttpStatus.OK).body(aluguelService.save(aluguelModel));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(aluguelService.findAll());
    }

    @GetMapping(value = "/findBy/{id}")
    public ResponseEntity<Object> getById(@PathVariable(value = "id")UUID id){
        Optional<AluguelModel> aluguelModelOptional = aluguelService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(aluguelModelOptional.get());
    }
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteAluguel(@PathVariable(value = "id")UUID id){
        Optional<AluguelModel> aluguelModelOptional = aluguelService.findById(id);
        if(aluguelModelOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluguel não encontrado!");
        }
        aluguelService.deleteByid(aluguelModelOptional.get().getId());
        return ResponseEntity.status(HttpStatus.OK).body("Aluguel deletado com sucesso!");
    }
    @GetMapping(value = "getAll")
    public ResponseEntity<List<AluguelModel>> getAllAlugueis(){
        return ResponseEntity.status(HttpStatus.OK).body(aluguelService.findAll());
    }
}
