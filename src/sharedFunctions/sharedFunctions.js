
//Updating Object..
export const updateObject = (oldObject, updateProp) => {
    return {
        ...oldObject,
        ...updateProp
    }
}


//Check valid of inputs
export const checkValid = (value, rules) => {
    //required - not an empty input
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
}