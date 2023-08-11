package tech.obss.pokedex.auth.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthResponse {
    @JsonProperty("access-token")
    private String access_token;
    @JsonProperty("refresh-token")
    private String refresh_token;
}
