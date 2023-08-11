package tech.obss.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.obss.pokedex.model.Type;

import java.util.Optional;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

    Optional<Type> findByName(String name);
}
