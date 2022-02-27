import axios from "axios";

const baseUrl = "http://localhost:8080/accounts";

export interface Account {
  id: number;
  name: string;
  dateOfBirth: string;
  username: string;
  email: string;
}

async function getAll(): Promise<Account[]> {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getById(id: string): Promise<Account> {
  try {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function create(account: Account) {
  try {
    const { data } = await axios.post(baseUrl, account);
    return data;
  } catch (e) {
    console.log(e);
  }
}

const accountService = {
  getAll,
  getById,
  create,
};

export default accountService;
