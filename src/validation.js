import Schema from "./Schema";

function checkPhone(phone) {
  const {required, regExp} = Schema.mobilePhone
  if(required && !phone) return false
  return new RegExp(regExp).test(phone)
}

function checkEmail(email) {
  const {required, regExp} = Schema.email
  if(required && !email) return false
  return new RegExp(regExp).test(email)
}

function checkPassword(password) {
  const {required, minLength, maxLength} = Schema.password
  if(required && !password) return false
  return password.length >= minLength && password.length <= maxLength
}

function checkRepeatedPassword(password, repeatedPassword) {
  return password === repeatedPassword
}
//////////////////////////////////////////////////////////////////////////
function checkFirstName(firstName) {
  const {required, minLength, maxLength} = Schema.firstName
  if(required && !firstName) return false
  return firstName.length >= minLength && firstName.length <= maxLength
}
function checkLastName(lastName) {
  const {required, minLength, maxLength} = Schema.lastName
  if(required && !lastName) return false
  return lastName.length >= minLength && lastName.length <= maxLength
}
function checkSex(sex) {
  const {required} = Schema.sex
  if(required && !sex) return false
  return true
}

function checkBirthday(birthday) {
  const {required, minAge, maxAge} = Schema.birthday
  if(required && !birthday) return false
  const today = new Date()
  const dateBirthday = new Date(birthday);
  let total = (today - dateBirthday)/(1000 * 60 * 60 * 24 * 365)
  return total >= minAge && total <= maxAge
}

function checkOcean(ocean) {
  const {required, oneOf} = Schema.ocean
  if(required && !ocean) return false
  return !!oneOf.find(i => i === ocean)
}

function checkHobby(hobby) {
  const {required, anyOf} = Schema.hobby
  if(required && !hobby.length) return false
  return hobby.every(i => anyOf.includes(i))
}

function ValidateSignUp({phone, email, password, repeatedPassword}) {
  return {
    phone: checkPhone(phone),
    email: checkEmail(email),
    password: checkPassword(password),
    repeatedPassword: checkRepeatedPassword(password, repeatedPassword)
  };
  //return checkPhone(phone) && checkEmail(email) && checkPassword(password) && checkRepeatedPassword(password, repeatedPassword)
}

function ValidatePersonalInfo({firstName, lastName, sex, birthday, ocean, hobby}) {
  return {
    firstName: checkFirstName(firstName),
    lastName: checkLastName(lastName),
    sex: checkSex(sex),
    birthday: checkBirthday(birthday), 
    ocean: checkOcean(ocean), 
    hobby: checkHobby(hobby)
  };
 // return checkFirstName(firstName) && checkLastName(lastName) && checkSex(sex) && checkBirthday(birthday) && checkOcean(ocean) && checkHobby(hobby)
}

export {
  ValidateSignUp,
  ValidatePersonalInfo
}