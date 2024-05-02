$(document).ready(function() {
    $('.form-builder').on('mouseover', '.form-field', function() {
        // Remove existing highlights and tooltips
        $('.highlighted').removeClass('highlighted').find('.hover-label').remove();
        
        // Highlight this element
        $(this).addClass('highlighted');
        
        // Generate the breadcrumb trail for the current element
        var elementPath = getElementPath(this);
        
        // Create and append the label to the hovered element
        var label = $('<div class="hover-label">' + elementPath + ' <button class="add-css-btn">-> CSS</button></div>');
        $(this).append(label);

        // Place the label correctly
        label.css({
            top: 0,
            left: 0
        });
    });

    $('.form-builder').on('mouseout', '.form-field', function() {
        $(this).removeClass('highlighted').find('.hover-label').remove();
    });

    // Event for the CSS button
    $(document).on('click', '.add-css-btn', function(e) {
        e.stopPropagation();
        var cssTargetInfo = $(this).parent().text().replace('-> CSS', '').trim();
        console.log("Add to CSS Panel:", cssTargetInfo); // Placeholder for CSS panel logic
    });
});

// Function to generate the breadcrumb trail of HTML elements
function getElementPath(element) {
    var path = [];
    $(element).parentsUntil('.form-builder').andSelf().each(function() {
        var description = this.tagName.toLowerCase();
        if (this.id) {
            description += '#' + this.id;
        }
        if (this.className) {
            description += '.' + this.className.split(/\s+/).join('.');
        }
        path.unshift(description);
    });
    return path.join(' > ');
}
