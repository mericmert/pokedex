package tech.obss.pokedex.auth.model.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    @NotBlank(message = "Username cannot be null!")
    private String username;

    @NotBlank(message = "Password cannot be null!")
    private String password;
}
