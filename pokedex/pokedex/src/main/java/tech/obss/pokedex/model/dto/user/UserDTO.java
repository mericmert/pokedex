package tech.obss.pokedex.model.dto.user;

import lombok.Builder;
import lombok.Data;
import tech.obss.pokedex.auth.model.Role;

@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;
}
