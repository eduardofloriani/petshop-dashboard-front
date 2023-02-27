export class FormPet {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.token = localStorage.getItem('token');
    };

    async addNewPet() {
        await fetch('http://localhost:8080/animals/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(this.getData())
        });
    };

    async updatePet() {
        await fetch('http://localhost:8080/animals/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(this.getData())
        });
    };

    async deletePet() {
        await fetch(`http://localhost:8080/animals/delete/${this.getData().id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
    };

    getData() {
        const data = {};
        for (let i = 0; i < this.form.elements.length; i++) {
            const element = this.form.elements[i];
            if (element.type !== 'submit' && element.type !== 'reset') {
                if (!element.value == '') {
                    data[element.name] = element.value;
                }
            }
        }
        return data;
    };
}

export class Pet {
    constructor() {
        this.token = localStorage.getItem('token');
    };

    async getAllPets() {
        const serverApi = await fetch('http://localhost:8080/animals', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        const data = await serverApi.json();
        return data;
    };

    async getPetById(id) {
        const serverApi = await fetch(`http://localhost:8080/animals/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
        const data = await serverApi.json();
        return data;
    };
}