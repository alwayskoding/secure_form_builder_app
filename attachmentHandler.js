// Declare a global variable to check if the form has an attachment or not
var hasAttachment = false;

document.addEventListener("DOMContentLoaded", function(event) { 

    window.addAttachmentToForm = function(content) {
        let formStart = '<form action="' + (window.isMailboxForm ? "/app/secureForms/submitFormAsMessage" : "/app/secureForms/submit") + 
        '" method="POST" enctype="multipart/form-data" name="form_name_goes_here">' +
        '<input type="hidden" value="form_name_goes_here" name="sf:form_name" />' +
        '<input type="hidden" name="sf:success_page" value="/success_page_link_goes_here" />' +
        '<input type="hidden" name="sf:failure_page" value="/failure_page_link_goes_here" />';

        if (window.isMailboxForm) {
            formStart += '<input type="hidden" name="sf:recipient_mailbox" value="mailbox_id_number_goes_here">';
        }

        let attachmentSection = '';
        if (hasAttachment) {
            attachmentSection = '<script src="/lib/secureForms/attachments.js"></script>' +
            '<div id="sf:attachmentsContainer"></div>' +
            '<button id="sf:addAttachment" class="btn">Add Attachment</button>';
        }

        const formContent = content + attachmentSection;
        
        const formEnd = '<div class="submit_btn">' +
            '<input type="submit" value="Submit">' +
            '</div></form>';

        return formStart + formContent + formEnd;
    }

    // Skip the execution of scripts with the 'data-skip' attribute on GitHub Pages
    const scriptsToSkip = document.querySelectorAll('script[data-skip="true"]');
    scriptsToSkip.forEach(script => {
        script.type = "text/plain"; // Changing the type will prevent the script from being executed by the browser
    });
    
});

function toggleAttachmentStatus(buttonElement) {
    console.log("toggleAttachmentStatus called. Previous state:", hasAttachment);
    hasAttachment = !hasAttachment;  // Toggle the attachment status
    console.log("New state:", hasAttachment);
    buttonElement.innerText = hasAttachment ? "Remove Attachment from Form" : "Add Attachment to Form";
}
