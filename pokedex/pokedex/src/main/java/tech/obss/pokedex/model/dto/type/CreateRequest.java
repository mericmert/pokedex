package tech.obss.pokedex.model.dto.type;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateRequest {
    String name;
    String color;
}
