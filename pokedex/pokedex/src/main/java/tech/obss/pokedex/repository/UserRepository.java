package tech.obss.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.obss.pokedex.auth.model.Role;
import tech.obss.pokedex.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);
    List<User> findAllByRole(Role role);
    boolean existsByIdAndRole(Long id, Role role);
    Optional<User> findByIdAndRole(Long id, Role role);


}
