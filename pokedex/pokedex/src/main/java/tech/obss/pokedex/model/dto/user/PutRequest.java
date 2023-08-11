package tech.obss.pokedex.model.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PutRequest {

    private String username;
    private String email;
    private String role;
    private String isEnabled;

}
