package tech.obss.pokedex.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import tech.obss.pokedex.auth.model.Role;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "users")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "SERIAL")
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean isEnabled;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_pokemon_wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "pokemon_id"),
            uniqueConstraints = {@UniqueConstraint(
            columnNames = {"user_id", "pokemon_id"})}
    )
    private List<Pokemon> wishList;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_pokemon_catch_list",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "pokemon_id"),
            uniqueConstraints = {@UniqueConstraint(
            columnNames = {"user_id", "pokemon_id"})}
    )
    private List<Pokemon> catchList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Token> tokens;

    @PrePersist
    private void onPrePersist() {
        setCreatedAt(LocalDateTime.now());
        setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    private void onPreUpdate() {
        setUpdatedAt(LocalDateTime.now());
    }

}
