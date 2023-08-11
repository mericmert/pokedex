package tech.obss.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.obss.pokedex.model.FileData;

import java.util.Optional;

public interface FileDataRepository extends JpaRepository<FileData, Long> {
    Optional<FileData> findByName(String name);

    Optional<FileData> findByPokemonId(Long id);
}
