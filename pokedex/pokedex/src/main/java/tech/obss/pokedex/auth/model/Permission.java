package tech.obss.pokedex.auth.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_CREATE("admin:create"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    TRAINER_READ("trainer:read"),
    TRAINER_CREATE("trainer:create"),
    TRAINER_UPDATE("trainer:update"),
    TRAINER_DELETE("trainer:delete");

    private final String permission;

}
