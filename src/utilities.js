export const createEl = {

    div(className, innerText) {
        const div = document.createElement('div');
        if (className) div.classList.add(className);
        if (innerText) div.innerText = innerText;
        return div;
    },

    span(className, innerText) {
        const span = document.createElement('span');
        if (className) span.classList.add(className);
        if (innerText) span.innerText = innerText;
        return span;        
    },

    input(className, type, id, label) {
        const inputBox = document.createElement('input');
        if (className) inputBox.classList.add(className);
        (type) ? inputBox.type = type : inputBox.type = 'text';
        if (id) {
            inputBox.id = id;
            inputBox.name = id;
        }

        if (label) {
            const labelEl = document.createElement('label');
            labelEl.classList.add('inputLabel');
            labelEl.for = id;
            labelEl.innerText = label;
            
            const inputCoupleDiv = document.createElement('div');
            inputCoupleDiv.classList.add('inputCoupleDiv');
            inputCoupleDiv.appendChild(labelEl);
            inputCoupleDiv.appendChild(inputBox);
            return inputCoupleDiv
        } else {
            return inputBox
        }
    },

};

//export {createEl as default};