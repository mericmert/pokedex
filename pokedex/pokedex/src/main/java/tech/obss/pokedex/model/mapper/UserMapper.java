package tech.obss.pokedex.model.mapper;

import tech.obss.pokedex.model.dto.user.UserDTO;
import tech.obss.pokedex.model.User;

public class UserMapper {

    public static UserDTO toDTO(User user){
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

}
