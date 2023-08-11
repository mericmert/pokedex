package tech.obss.pokedex.model.dto.pokemon;

import lombok.Getter;
import lombok.Setter;
import tech.obss.pokedex.model.Type;

@Getter @Setter
public class PutRequest {
    private String name;
    private String info;
    private Double height;
    private Double weight;
    private Integer hp;
    private Integer attack;
    private Integer defence;
    private Integer speed;
    private String types;
}
