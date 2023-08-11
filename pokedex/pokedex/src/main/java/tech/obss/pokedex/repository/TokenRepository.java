package tech.obss.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.obss.pokedex.model.Token;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query(value = """
        SELECT t from Token t\s
        INNER JOIN User u on u.id = t.user.id\s
        WHERE u.id = :id and (t.isExpired = false and t.isRevoked = false)
    """)
    List<Token> findAllValidTokensByUser(Long id);

    Optional<Token> findByToken(String token);
}
