$(document).ready(function() {
    // Function to make input fields resizable
    function makeFieldsResizable() {
        $(".form-wrap.form-builder .frmb .prev-holder input[type='text'], " +
          ".form-wrap.form-builder .frmb .prev-holder input[type='number'], " +
          ".form-wrap.form-builder .frmb .prev-holder input[type='email'], " +
          ".form-wrap.form-builder .frmb .prev-holder input[type='tel'], " +
          ".form-wrap.form-builder .frmb .prev-holder input[type='date'], " +
          ".form-wrap.form-builder .frmb .prev-holder select, " +
          ".form-wrap.form-builder .frmb .prev-holder textarea").resizable({
            handles: 'e',
            containment: "parent",
            stop: function(event, ui) {
                var newWidth = ui.size.width;
                $(this).css('width', newWidth + 'px');
            }
        });
    }

    // Initial application of resizable
    makeFieldsResizable();

    // Observe DOM changes in the form builder area and reapply resizable
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Check if children are added or removed
                if (mutation.addedNodes.length || mutation.removedNodes.length) {
                    makeFieldsResizable();
                }
            }
        });
    });

    // Configuration of the observer:
    var config = { childList: true, subtree: true };

    // Node to observe:
    var targetNode = document.querySelector('.form-wrap.form-builder .frmb');
    if (targetNode) {
        observer.observe(targetNode, config);
    }

    // Clean up observer when leaving page
    $(window).on('unload', function() {
        observer.disconnect();
    });
});
