function transformHTML(inputHTML) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(inputHTML, 'text/html');
    
    // Adjust for individual elements like text, email, tel, textarea, etc.
    doc.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea').forEach(elem => {
        const associatedLabel = elem.previousElementSibling && elem.previousElementSibling.tagName.toLowerCase() === 'label' ? elem.previousElementSibling : null;
        if (associatedLabel) {
            const labelText = associatedLabel.textContent.trim().replace(/\s+/g, '_').toLowerCase();
            associatedLabel.setAttribute('for', `sfval:${labelText}`);
            elem.setAttribute('id', `sfval:${labelText}`);
            elem.setAttribute('name', `sfval:${labelText}`);
        }
    });

    // Adjust the IDs for checkbox and radio groups and set the corresponding 'for' attributes.
    doc.querySelectorAll('.formbuilder-checkbox-group, .formbuilder-radio-group').forEach(group => {
        const mainLabel = group.querySelector('.formbuilder-checkbox-group-label, .formbuilder-radio-group-label');
        if (mainLabel) {
            const mainLabelText = mainLabel.textContent.trim().replace(/\s+/g, '_').toLowerCase();
            let index = 1;
            group.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
                input.setAttribute('id', `sfval:${mainLabelText}${String(index).padStart(2, '0')}`);
                input.setAttribute('name', `sfval:${mainLabelText}`);
                const associatedLabel = input.closest('div').querySelector('label');
                if (associatedLabel) {
                    associatedLabel.setAttribute('for', input.getAttribute('id'));
                }
                index++;
            });
        }
    });

    // Adjust for select groups.
    doc.querySelectorAll('.formbuilder-select').forEach(group => {
        const mainLabel = group.querySelector('.formbuilder-select-label');
        if (mainLabel) {
            const mainLabelText = mainLabel.textContent.trim().replace(/\s+/g, '_').toLowerCase();
            mainLabel.setAttribute('for', `sfval:${mainLabelText}`);
            const selectElem = group.querySelector('select');
            if (selectElem) {
                selectElem.setAttribute('name', `sfval:${mainLabelText}`);
                selectElem.setAttribute('id', `sfval:${mainLabelText}`);
            }
        }
    });

    // Modifications for the email and phone patterns
    doc.querySelectorAll('input[type="email"]').forEach(elem => {
        elem.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    });
    
    doc.querySelectorAll('input[type="tel"]').forEach(elem => {
        elem.setAttribute('pattern', '\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}');
    });

    return doc.body.innerHTML;
}
