var StorageModule = (function() {
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    // Expose functions to the outside
    return {
        save: saveData,
        load: loadData
    };
})();
