var FormHandlerModule = (function() {
    // Create a private variable for the form builder instance
    var formBuilderInstance = null;

    // Method to initialize form builder and set up event listeners
    function initializeFormBuilder(selector) {
        formBuilderInstance = $(selector).formBuilder();
        setupEventListeners();
    }

    // Private method to set up event listeners for save and load buttons
    function setupEventListeners() {
        $("#saveTemplateBtn").click(function() {
            const formData = formBuilderInstance.actions.getData('json');
            StorageModule.save("formTemplate", formData);
            alert("Form template saved!");
        });

        $("#loadTemplateBtn").click(function() {
            const savedFormData = StorageModule.load("formTemplate");
            if(savedFormData) {
                formBuilderInstance.actions.setData(savedFormData);
                alert("Form template loaded!");
            } else {
                alert("No form template found!");
            }
        });
    }

    // Expose the initializeFormBuilder method to the outside
    return {
        init: initializeFormBuilder
    };
})();
