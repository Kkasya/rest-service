import { v4 as uuidv4 } from 'uuid';
import {UserProp} from "../../common/interfaces";

class User {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: UserProp) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export {User};
