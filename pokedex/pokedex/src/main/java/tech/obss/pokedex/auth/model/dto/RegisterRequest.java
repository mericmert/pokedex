package tech.obss.pokedex.auth.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Email cannot be null!")
    private String email;
    @NotBlank(message = "Username cannot be null!")
    private String username;
    @NotBlank(message = "Password cannot be null!")
    private String password;
}
