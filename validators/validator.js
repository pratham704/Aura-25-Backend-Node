const isValidFirebaseUID = (firebaseUID) => {
    const firebaseUIDRegex = /^[A-Za-z0-9_-]{28,36}$/;
    return firebaseUIDRegex.test(firebaseUID);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export { isValidEmail, isValidFirebaseUID }
