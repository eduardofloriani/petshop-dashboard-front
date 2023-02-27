import { Pet, FormPet } from "./PetService.js";
import { User } from "./UserService.js";

// Check if the user is valid
const user = new User();
const userData = await user.getUser();
if (!userData) window.location.href = './index.html';
document.querySelector('#username').innerHTML = `${userData.firstname}!`;


// Changing themes on the site
const themeToggler = document.querySelector(".theme-toggler");

themeToggler.addEventListener("click", () => {
    document.body.classList.toggle('dark-theme-variables')

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})
// ------------------------------------------------------------------------------------

// Search function based on pet attributes
const searchInput = document.getElementById('search-pet__input');
const petTable = document.getElementById('pet-table__table');

searchInput.addEventListener('keyup', () => {
    let key = searchInput.value.toLowerCase();
    if (key.lenght < 2) {
        return;
    }

    let lines = petTable.querySelectorAll('tbody tr');
    for (let pos in lines) {
        if (true == isNaN(pos)) {
            continue;
        }

        let lineContent = lines[pos].innerHTML.toLowerCase();
        if (true == lineContent.includes(key)) {
            lines[pos].style.display = '';
        } else {
            lines[pos].style.display = 'none';
        }
    }
});
// ------------------------------------------------------------------------------------

// Load pets and update pet and customers counters
const tbody = document.getElementById('pet-table__table');
const pet = new Pet();
const allPets = await pet.getAllPets();

allPets.forEach(pet => {
    tbody.innerHTML += `
        <tr data-id="${pet.id}">
        <td>${pet.id}</td>
        <td>${pet.animalName}</td>
        <td>${pet.species}</td>
        <td>${pet.breed}</td>
        <td>${pet.height}cm</td>
        <td>${pet.weight}kg</td>
        <td>${pet.fur.toLowerCase()}</td>
        <td>${pet.treatment.toLowerCase()}</td>
        <td class="petDetails"><a href="#" class="warning">Detalhes</a></td>
    </tr>
    `
});

document.querySelector('.pet-numbers h1').innerHTML = allPets.length;
const allCustomers = allPets.reduce((accumulator, pet) => {
    const alreadyExists = accumulator.some(u => u.responsibleEmail === pet.responsibleEmail);
    
    if (!alreadyExists) {
        accumulator.push(pet)
    }

    return accumulator;

}, []);

document.querySelector('.customers-numbers h1').innerHTML = allCustomers.length;
// ------------------------------------------------------------------------------------

// Save pet
const addPetForm = document.getElementById('formAddPet');
addPetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formPet = new FormPet('#formAddPet');
    await formPet.addNewPet();
    window.location.reload();
})
// ------------------------------------------------------------------------------------

// Update pet
const detailsPetForm = document.getElementById('formDetailsPet');
detailsPetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formPet = new FormPet('#formDetailsPet');
    await formPet.updatePet();
    window.location.reload();
});

// Delete pet
const deletePetBtn = document.getElementById('deletePetBtn')
deletePetBtn.addEventListener('click', async () => {
    const formPet = new FormPet('#formDetailsPet');
    await formPet.deletePet();
    window.location.reload();
});

document.querySelector('h2').addEventListener('click', () => {
    window.location.href = './home.html'
})

// ------------------------------------------------------------------------------------

// Pet Details

async function PetDetails(id) {
    const pet = new Pet();
    const data = await pet.getPetById(id);
    return data;
}

const petIdInput = document.querySelector('input[name="id"]');
const animalNameInput = document.querySelectorAll('input[name="animalName"]')[1];
const speciesSelect = document.querySelectorAll('select[name="species"]')[1];
const breedInput = document.querySelectorAll('input[name="breed"]')[1];
const heightInput = document.querySelectorAll('input[name="height"]')[1];
const weightInput = document.querySelectorAll('input[name="weight"]')[1];
const furSelect = document.querySelectorAll('select[name="fur"]')[1];
const treatmentSelect = document.querySelectorAll('select[name="treatment"]')[1];
const responsibleNameInput = document.querySelectorAll('input[name="responsibleName"]')[1];
const responsiblePhoneInput = document.querySelectorAll('input[name="responsiblePhone"]')[1];
const responsibleEmailInput = document.querySelectorAll('input[name="responsibleEmail"]')[1];

// Open and close modal
const openModalRegisterButton = document.querySelector('#register-pet__btn');
const openModalDetailsButton = document.getElementsByClassName('petDetails');
const closeModalButton = document.getElementsByClassName('close-modal');
const modal = document.getElementsByClassName("modal");
const fade = document.getElementsByClassName("fade");

const toggleModal = (modalID) => {
    if (modalID == 1) {
        [modal[0], fade[0]].forEach((el) => el.classList.toggle('hide'));
    } else if (modalID == 2) {
        [modal[1], fade[1]].forEach((el) => el.classList.toggle('hide'));
    }
}

[openModalRegisterButton, closeModalButton[0], fade[0]].forEach((el) => {
    el.addEventListener('click', () => toggleModal(1))
});
for (const td of openModalDetailsButton) {
    td.addEventListener('click', async (event) => {
        toggleModal(2);
        const petID = event.target.closest('tr').dataset.id;
        const data = await PetDetails(petID);
        petIdInput.value = data.id;
        animalNameInput.value = data.animalName;
        speciesSelect.value = data.species;
        breedInput.value = data.breed;
        heightInput.value = data.height;
        weightInput.value = data.weight;
        furSelect.value = data.fur;
        treatmentSelect.value = data.treatment;
        responsibleNameInput.value = data.responsibleName;
        responsiblePhoneInput.value = data.responsiblePhone;
        responsibleEmailInput.value = data.responsibleEmail;
        
    });
}

closeModalButton[1].addEventListener('click', () => toggleModal(2));
// ------------------------------------------------------------------------------------