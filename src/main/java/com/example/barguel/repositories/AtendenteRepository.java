package com.example.barguel.repositories;

import com.example.barguel.models.atendente.AtendenteModel;
import com.example.barguel.models.cliente.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AtendenteRepository extends JpaRepository<AtendenteModel, UUID> {
}
