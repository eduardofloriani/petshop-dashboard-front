export class User {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    async getUser() {
        try {
            const serverApi = await fetch('http://localhost:8080/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            });
            if (!serverApi.ok) return;
            const data = await serverApi.json();
            return data;
        } catch(e) { console.log(e) }
    };
};