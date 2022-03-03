const accordion = document.getElementById('accordion-id');

for (i = 0; i < accordion.height; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
  });
}