export class Authentication {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    async login() {
        try {
            const serverApi = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });
            if (!serverApi.ok) return;
            const data = await serverApi.json();
            return data;
        } catch (e) {console.log(e)}
    };
}