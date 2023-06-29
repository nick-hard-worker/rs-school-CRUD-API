// username — user's name (string, required);
// age — user's age (number, required);
// hobbies — user's hobbies (array of strings or empty array, required);

export const validateUser = (user) => {
  const { username, age, hobbies } = user;

  const isValidUsername = (username) => {
    // username is 8-20 characters long
    // no _ or.at the beginning 
    // no __ or _.or._ or..inside
    // allowed characters [a-zA-Z0-9._]
    // no _ or.at the end
    const regExpUsername = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

    if (username &&
      typeof username === 'string' &&
      regExpUsername.test(username)) return true;

    return false;
  };

  const isValidAge = (age) => {
    if (age && Number.isInteger(age)) return true;
    return false;
  };

  const isValidHobby = (hobby) => {
    const regExpHobbies = /[a-z\s]{2,50}/i;
    if (typeof (hobby) === 'string') {
      hobby = hobby.trim();
      return regExpHobbies.test(hobby);
    }
  };

  const isValidHobbies = (hobbies) => {
    if (Array.isArray(hobbies)) {
      if (hobbies.length === 0) return true;

      return hobbies.every(isValidHobby);
    }

    return false;
  };

  return (isValidUsername(username) &&
    isValidAge(age) &&
    isValidHobbies(hobbies));
};