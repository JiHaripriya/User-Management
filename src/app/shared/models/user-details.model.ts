export class UserDetails {
    constructor(
        private first_name: string,
        private last_name: string,
        private email: string,
        private role: string,
        private status: string,
        private token?: string,
        private password?: string,
    ) {}
}
