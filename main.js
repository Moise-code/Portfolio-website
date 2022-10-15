const hamburger = document.querySelector('.hamburger');
const navLists = document.querySelector('.nav-lists');
const projectCollection = document.querySelector('.collection');
const popupModal = document.querySelector('.popup');
const contactForm = document.querySelector('#contact-me');
const errorMsg = document.querySelector('.error-msg');

hamburger.addEventListener('click', (e) => {
  e.preventDefault();
  hamburger.classList.toggle('active');
  navLists.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((nav) => nav.addEventListener('click', (e) => {
  e.preventDefault();
  hamburger.classList.remove('active');
  navLists.classList.remove('active');
}));

const displayProjects = ({
  name, description, technologies, id,
}, index) => {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="work2" id="${id}">
  <h5>${name}</h5>
  <p>${description}</p>
  <ul class="lists">
    <li>${technologies[0]}</li>
    <li>${technologies[1]}</li>
    <li>${technologies[2]}</li>
  </ul>
  <button class="work2-button" id="${index}">See
    project</button>
</div>
  `;

  return div;
};

const displayProjectDetail = ({
  name, description, technologies, image,
}) => {
  const div = document.createElement('div');
  div.className = 'popup-body';
  div.innerHTML = `
  <div class="pop-title">
    <h2>${name}</h2>
    <div class="popup-hamburger">
      <span class="bar1"></span>
      <span class="bar1"></span>
      <span class="bar1"></span>
    </div>
  </div>
  <div class="technologies">
    <ul>
      <li>${technologies[0]}</li>
      <li>${technologies[1]}</li>
      <li>${technologies[2]}</li>
    </ul>
  </div>
  <div class="popup-content">
    <div class="popup-content-img">
          <img src="${image}" alt="">
    </div>
    <div class="popup-content-pararaph">
      <p>${description}</p>
      <div class="popup-content-buttona">
        <button>See Live <span><img src="./items/see-live-icon.png" alt=""></span></button>
        <button>See Source <span><img src="./items/see-source-icon.png" alt=""></span></button>
      </div>
    </div>
  </div>
  `;

  return div;
};

const getProjects = async () => {
  const response = await fetch('../projects.json');

  try {
    const data = await response.json();

    data.forEach((project, index) => {
      projectCollection.append(displayProjects(project, index));
    });
  } catch (error) {
    // console.log(error);
  }
};

const addhumburgerEvent = () => {
  document.querySelector('.popup-hamburger').addEventListener('change', () => {
    popupModal.classList.remove('show-popup');
    popupModal.innerHTML = '';
  });
};

window.onload = async () => {
  document.querySelectorAll('.work2-button').forEach((button) => button.addEventListener('click', async () => {
    const response = await fetch('./projects.json');
    const data = await response.json();

    const item = data[button.id];

    popupModal.append(displayProjectDetail(item));

    popupModal.classList.add('show-popup');

    addhumburgerEvent();
  }));
};

const containUpperCase = (email) => email !== email.toLowerCase();

contactForm.addEventListener('submit', (e) => {
  const emailAddress = contactForm.elements.email.value;
  e.preventDefault();

  if (containUpperCase(emailAddress)) {
    errorMsg.textContent = 'The email must contain only lower case letters';
  } else {
    contactForm.submit();
  }
});

getProjects();
