export class UserDetails {
    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        private role: string,
        public status: string,
        private token?: string,
        private password?: string,
    ) { }
}
