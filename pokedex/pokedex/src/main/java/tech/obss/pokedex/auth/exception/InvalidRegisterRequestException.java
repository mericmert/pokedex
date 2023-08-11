package tech.obss.pokedex.auth.exception;

public class InvalidRegisterRequestException extends RuntimeException {
    public InvalidRegisterRequestException(String message) {
        super(message);
    }
}
