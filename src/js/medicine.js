// src/js/medicine.js
import { v4 as uuidv4 } from "uuid";
import Item from "./item.js";

class Medicine extends Item {
  constructor(name, manufacturer, expirationDate, quantity) {
    super(name, manufacturer);
    this.id = uuidv4();
    this.expirationDate = expirationDate;
    this.quantity = parseInt(quantity, 10);
  }
}

export default Medicine;
