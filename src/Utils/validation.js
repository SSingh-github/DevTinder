

const validateUserPatchData = (req) => {
    const data = req.body;
    const ALLOWED_KEYS = ["photoUrl", "about", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_KEYS.includes(k));
    if(!isUpdateAllowed) {
        throw new Error("Invalid data, update not allowed");
    }
    if(data.skills?.length > 10) {
        throw new Error("10 skills are allowed at max");
    }
};

const validateUserSignupData = (req) => {
    const data = req.body;
    const ALLOWED_KEYS = ["firstName", "lastName", "email", "password"];
    const isSignupAllowed = Object.keys(data).every((k) => ALLOWED_KEYS.includes(k));
    if(!isSignupAllowed) {
        throw new Error("Invalid data, signup not allowed");
    }
};

const validatePasswordPatchData = (req) => {
    const data = req.body;
    const ALLOWED_KEYS = ["oldPassword", "newPassword"];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_KEYS.includes(k));
    if(!isUpdateAllowed) {
        throw new Error("Invalid data, update not allowed");
    }
    const {oldPassword, newPassword} = data;
    if(!oldPassword || !newPassword) {
        throw new Error("invalid data");
    }
};

module.exports = {
    validateUserPatchData,
    validateUserSignupData,
    validatePasswordPatchData,
}