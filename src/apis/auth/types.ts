export interface CreateUserDto {
  /** @default [] */
  roles: number[];
  policies?: PolicyDto[];
  personalInformation: Person;
  contacts: Contact;
  address: Address;
  /** @default "" */
  image?: string;
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  password: string;
  companyId: string;
  brandManufacturer?: BrandManufacturerDto[];
}

export interface Token {
  /** @default "" */
  token?: string;
}

export interface Session {
  /** @default "" */
  token: string;

  username: string;

  role?: string;

  attempts: number;

  status: string;

  active: boolean;
}

export interface Login {
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  password: string;

  role: string;
}

export interface ChangePassword {
  /**
   * @maxLength 20
   * @default ""
   */
  userName: string;
  /**
   * @maxLength 16
   * @default ""
   */
  oldPassword: string;
  /**
   * @maxLength 16
   * @default ""
   */
  newPassword: string;
}

export interface PolicyDto {
  /** @maxLength 20 */
  name: string;
  permissions: string[];
}

export interface Person {
  name: Name;
  /** @default 0 */
  gender: string;
  /**
   * @format date-time
   * @default "2024-08-11T14:44:56.206Z"
   */
  dateOfBirth: string;
}

export interface Contact {
  /** @default "" */
  email: string;
  mobile: Mobile;
  emergencyMobile: Mobile;
}

export interface Address {
  /** @default 0 */
  country: string;
  /** @default 0 */
  city: string;
  /** @default "" */
  street: string;
  /** @default "" */
  postalCode: string;
}

export interface BrandManufacturerDto {
  /** @default "" */
  brand: string;
  /** @default "" */
  manufacturer: string;
}

export interface Name {
  /** @default "" */
  first: string;
  /** @default "" */
  second: string;
  /** @default "" */
  third: string;
  /** @default "" */
  last: string;
}

export interface Mobile {
  /** @default 0 */
  provider?: number;
  /** @default "" */
  countryCode?: string;
  mobile: string;
}
