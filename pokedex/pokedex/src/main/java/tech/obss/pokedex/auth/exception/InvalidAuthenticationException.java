package tech.obss.pokedex.auth.exception;

public class InvalidAuthenticationException extends RuntimeException {
    public InvalidAuthenticationException(String message) {
        super(message);
    }
}
