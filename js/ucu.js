// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces between words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not include bad language: ugly, dum, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,
function checkValid(condition, stringErrors, message) {
  if (condition) {
    let li = document.createElement('li');
    li.innerText = message;
    stringErrors.appendChild(li);
    return false;
  }
  return true;
}

function lengthFormatCheck(value, name, errors, errorNode, minLength, maxLength, re, checkerValue) {
  checkValid(value.length < minLength || value.length > maxLength, errors,
      `${name} doesn't have appropriate length`);
  checkValid(!!value.match(re) === checkerValue, errors, `${name} has incorrect format`);
  if (errors.childElementCount > 0) {
    errorNode.appendChild(errors);
  }
}

function allValid(event) {
  const stringNode = "target" in event ? event.target : event;
  const nameErrorNode = stringNode.parentNode.querySelector('p.help-block');
  nameErrorNode.innerHTML = '';
  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");
  return [stringNode, nameErrorNode, nameErrors];
}

function emailValid(event) {
  let inf = allValid(event);
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  lengthFormatCheck(inf[0].value, 'email', inf[2], inf[1], 5, 50, re, false);
}

function nameValid(event) {
  let inf = allValid(event);
  lengthFormatCheck(inf[0].value, 'name', inf[2], inf[1], 1, 100,
      /^([A-Za-z]+-?[A-Za-z]*\s{0,2}[A-Za-z]+-?[A-Za-z]*)$/, false);
}

function phoneValid(event) {
  let inf = allValid(event);
  lengthFormatCheck(inf[0].value, 'phone', inf[2], inf[1], 12, 50,
      /^([+0]\d{3}((\(\d{2}\))|(\d{2}))((\s\d{3}(\s\d{2}){2})|(-\d{3}(-\d{2}){2})))$/,
      false);
}

function messageValid(event) {
  let inf = allValid(event);
  lengthFormatCheck(inf[0].value, 'message', inf[2], inf[1], 10, 10000,
      /(ugly)|(stupid)|(ignorant)|(pig)|(dum)/i,true);
}

function validateMe(event) {
  event.preventDefault();
  emailValid(event.target.elements['email']);
  nameValid(event.target.elements['name']);
  phoneValid(event.target.elements['phone']);
  messageValid(event.target.elements['message']);

  return false;
}
