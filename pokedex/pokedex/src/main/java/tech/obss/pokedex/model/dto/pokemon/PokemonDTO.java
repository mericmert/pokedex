package tech.obss.pokedex.model.dto.pokemon;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import tech.obss.pokedex.model.User;

import java.util.List;

@Getter
@Setter
@Builder
public class PokemonDTO {
    @NotBlank(message = "Name cannot be null!")
    private String name;
    private Integer hp;
    private Integer attack;
    private Integer defence;
    private Integer speed;
    private Double height;
    private Double weight;
    private String info;
    List<User> users;
}
