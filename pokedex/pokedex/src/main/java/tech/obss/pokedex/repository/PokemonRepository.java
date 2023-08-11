package tech.obss.pokedex.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.obss.pokedex.model.Pokemon;
import tech.obss.pokedex.model.Type;

import java.util.List;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

    List<Pokemon> findAll(Specification<Pokemon> spec, Pageable pageSortRequest);

    List<Pokemon> findAll(Specification<Pokemon> spec, Sort sort);

    List<Pokemon> findAll(Specification<Pokemon> spec);
}
