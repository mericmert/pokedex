package tech.obss.pokedex.auth.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static tech.obss.pokedex.auth.model.Permission.*;

@RequiredArgsConstructor
@Getter
public enum Role {
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_CREATE,
                    ADMIN_UPDATE,
                    ADMIN_DELETE
            )),
    TRAINER(
            Set.of(
                    TRAINER_READ,
                    TRAINER_CREATE,
                    TRAINER_UPDATE,
                    TRAINER_DELETE
            )
    );

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
       List<SimpleGrantedAuthority> authorities = permissions.stream()
               .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
               .collect(Collectors.toList());
       authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
       return authorities;
    }

}
