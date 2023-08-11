package tech.obss.pokedex.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;



@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "SERIAL")
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Color color;

    @Column(unique = true, nullable = false)
    private String name;

    @JsonBackReference
    @ManyToMany (mappedBy = "types")
    List<Pokemon> pokemons;


    public enum Color {
        YELLOW,
        BLUE,
        GREEN,
        BLACK,
        ORANGE,
    }


}
