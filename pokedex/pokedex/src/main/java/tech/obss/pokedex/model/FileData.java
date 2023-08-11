package tech.obss.pokedex.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "file_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String type;
    private String filePath;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "pokemon_id")
    private Pokemon pokemon;

}
