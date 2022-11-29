package com.example.barguel.services;

import com.example.barguel.models.aluguel.AluguelModel;
import com.example.barguel.repositories.AluguelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AluguelService {

    final AluguelRepository aluguelRepository;

    public AluguelService(AluguelRepository aluguelRepository) {
        this.aluguelRepository = aluguelRepository;
    }

    @Transactional
    public AluguelModel save(AluguelModel aluguelModel){
        return aluguelRepository.save(aluguelModel);
    }

    public List<AluguelModel> findAll(){return aluguelRepository.findAll();}
    @Transactional
    public void deleteByid(UUID id){
        aluguelRepository.deleteById(id);}

    @Transactional
    public void delete(AluguelModel aluguelModel){deleteByid(aluguelModel.getId());}

    public Optional<AluguelModel> findById(UUID id){return aluguelRepository.findById(id);}
}
