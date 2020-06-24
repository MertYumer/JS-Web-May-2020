module.exports = {
    TOKEN_KEY: 'auth_cookie',
    USERNAME: 'username',

    UNMATCHING_PASSWORDS_MESSAGE: 'Passwords should match.',
    INCORRECT_PASSWORD_MESSAGE: 'Password should contains only english letters and digits.',
    INCORRECT_PASSWORD_LENGTH_MESSAGE: 'Password should be at least 8 characters long.',
    INCORRECT_USERNAME_LENGTH_MESSAGE: 'Username should be at least 5 characters long.',
    INCORRECT_USERNAME_MESSAGE: 'Username should contains only english letters and digits.',
    USERNAME_EXISTS_MESSAGE: 'User with that username already exists.',
    INVALID_LOGIN_MESSAGE: 'Invalid username or password.',
    INCORRECT_NAME_MESSAGE: 'Name should contains only english letters, digits or white spaces.',
    INCORRECT_NAME_LENGTH_MESSAGE: 'Name should be at least 5 characters long',
    INCORRECT_DESCRIPTION_LENGTH_MESSAGE: 'Description should be at least 20 and no longer than 50 characters long',
    INCORRECT_DESCRIPTION_MESSAGE: 'Description should contains only english letters, digits or white spaces.',
    REQUIRED_USERNAME: 'Username is required',
    REQUIRED_PASSWORD: 'Password is required',
    REQUIRED_NAME: 'Name is required',
    REQUIRED_IMAGE: 'Image link is required',
    REQUIRED_DESCRIPTION: 'Description is required',

    LETTERS_AND_DIGITS_PATTERN: /^[A-Za-z0-9]+$/,
    LETTERS_DIGITS_AND_WHITESPACE_PATTERN: /^[A-Za-z0-9\s]+$/,
    PASSWORD_MIN_LENGTH: 5,
    NAME_MIN_LENGTH: 5,
    DESCRIPTION_MIN_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 50,
    SALT_ROUNDS: 10
};