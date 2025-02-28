import { v4 as uuidv4 } from "uuid";

class medicine {
  constructor(
    name,
    manufacturer,
    expirationDate,
    medicineType,
    dosage,
    volume = null
  ) {
    this.id = uuidv4();
    this.name = name;
    this.manufacturer = manufacturer;
    this.expirationDate = expirationDate;
    this.medicineType = medicineType;
    this.dosage = dosage;
    this.volume = volume;
  }
}
export default medicine;
