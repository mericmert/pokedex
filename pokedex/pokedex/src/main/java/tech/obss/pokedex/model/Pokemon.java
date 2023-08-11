package tech.obss.pokedex.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "SERIAL")
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer hp;
    private Integer attack;
    private Integer defence;
    private Integer speed;
    private Double height;
    private Double weight;
    private String info;

    @JsonBackReference
    @ManyToMany(mappedBy = "wishList")
    List<User> wishedListBy;

    @JsonBackReference
    @ManyToMany(mappedBy = "catchList")
    List<User> users;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "pokemons_types",
            joinColumns = @JoinColumn(name = "pokemon_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id")
    )
    private List<Type> types;

    @JsonManagedReference
    @OneToOne(mappedBy = "pokemon", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private FileData image;

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
