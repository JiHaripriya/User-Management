export class UserDetails {
    constructor(
        public user_id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public role: string,
        public status: string,
        private token?: string,
        private password?: string,
    ) { }
}
