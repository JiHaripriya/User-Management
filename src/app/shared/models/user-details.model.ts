export class UserDetails {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        public role: string,
        public status: string,
        public token: string,
        public id: number
    ) { }
}
