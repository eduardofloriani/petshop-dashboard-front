import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pet } from 'src/app/pet';
import { PetService } from 'src/app/pet.service';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public allPets: Pet[] | undefined = [];
  public dashboardPets: Pet[] = [];
  public servedClients: number | undefined;
  public servedPets: number | undefined;
  public petDetails: Pet | undefined;

  constructor(
    private petService: PetService,
    private userService: UserService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getUsername();
    await this.getAllPets();
    this.counter();
  }

  // Load pets
  public async getAllPets(): Promise<void> {
    const response = await this.petService.getAllPets().toPromise();
    this.allPets = response;

    this.dashboardPets = [];
    this.allPets?.forEach((pet) => {
      if (pet.statusAnimal.toString() === 'PENDING') this.dashboardPets?.push(pet);
    })
  };

  // Add new Pet
  public async addNewPet(addForm: NgForm): Promise<void> {
    document.getElementById('registerFormBtn')?.click();

    await this.petService.addPet(addForm.value).toPromise();
    await this.getAllPets();
    addForm.reset();
    this.openCloseModal('register');
    this.counter();
  }

  //Update pet
  public async updatePet(formValues: Pet): Promise<void> {
    await this.petService.updatePet(formValues).toPromise();
    await this.getAllPets();
    this.openCloseModal('details');
    this.counter();
  }

  //Change status
  public async finishedService(pet: Pet): Promise<void> {
    await this.petService.finishedService(pet).toPromise();
    await this.getAllPets();
    this.counter();
  }

  // Delete pet
  public async deletePet(petId: number | undefined): Promise<void> {
    await this.petService.deletePet(petId).toPromise();
    await this.getAllPets();
    this.openCloseModal('details');
    this.counter();
  }

  // Update pet and customers counters
  public counter(): void {
    this.servedPets = this.dashboardPets?.length;
    const allCustomers = this.dashboardPets?.reduce((accumulator: Pet[], pet: Pet) => {
      const alreadyExists = accumulator.some(u => u.responsibleEmail === pet.responsibleEmail);

      if (!alreadyExists) {
        accumulator.push(pet)
      }

      return accumulator;
    }, []);

    this.servedClients = allCustomers?.length;
  }

  // Changing themes on the site
  public themeChange(): void {
    const themeToggler = document.querySelector('.theme-toggler') as HTMLDivElement;
    document.body.classList.toggle('dark-theme-variables');

    themeToggler?.querySelector('span:nth-child(1)')?.classList.toggle('active');
    themeToggler?.querySelector('span:nth-child(2)')?.classList.toggle('active');
  }

  // Open modals
  public openCloseModal(mode: string, pet?: Pet | undefined): void {
    const modal = document.getElementsByClassName('modal');
    const fade = document.getElementsByClassName('fade');

    if (mode == 'register') [modal[0], fade[0]].forEach(el => el.classList.toggle('hide'));
    if (mode == 'details') {
      [modal[1], fade[1]].forEach(el => el.classList.toggle('hide'));
      if (pet) this.petDetails = pet;
    }
  }

  // Search Pets
  public searchPets(key: string): void {
    const results: Pet[] = [];
    if (this.dashboardPets) {
      for (const pet of this.dashboardPets) {
        if (pet.animalName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pet.species.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pet.breed.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pet.responsibleEmail.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pet.responsibleName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pet.responsiblePhone.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(pet)
        }
      }

      this.dashboardPets = results;
      if (results.length === 0 || !key) {
        this.getAllPets();
      }
    }
  }

  // Load employee name
  public async getUsername(): Promise<void> {
    const userData = await this.userService.getUser().toPromise();
    const firstname = userData?.firstname;

    const username = document.querySelector('#username');
    if (username) username.innerHTML = `${firstname}!`;
  }

  // Change status of TD
  public changeStatus(): void {
    const td = document.querySelectorAll('.petStatus');
    td.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        el.innerHTML = `<span class="material-icons-sharp">check</span>`;
      })
      el.addEventListener('mouseleave', () => {
        el.innerHTML = 'PENDING';
      })
    })
  }


  // Logout
  public logout(): void {
    this.router.navigate([''])
  }
}
