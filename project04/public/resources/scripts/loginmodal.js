document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('loginModal');
    const closeBtn = document.getElementById('closeLogin');

    // Function to open the modal
    function openModal() {
        modal.style.display = 'block';
    }

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    openModal();
});
