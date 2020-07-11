
export class Socialusers {
    provider: string;
    id: string;
    email: string;
    name: string;
    image: string;
    token?: string;
    idToken?: string;
}

export class Login {
    emailId: string;
    password: string;
    provider: string;
}

export class Register {
    emailId: string;
    password: string;
    confirmPassword: string;
}

// export enum Provider {
//     Google,
//     Facebook,
//     Twitter,
//     Github,
//     None
// }
