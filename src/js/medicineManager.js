import Medicine from "./medicine.js";
import Ui from "./ui.js";

class MedicineManager {
  static medicinesCollection =
    JSON.parse(localStorage.getItem("medicines-collection")) || [];

  // Add new medicine
  static addMedicine(name, manufacturer, expirationDate, quantity) {
    const latestMedicineCollection =
      JSON.parse(localStorage.getItem("medicines-collection")) || [];

    let medicine;

    const existingMedicine = latestMedicineCollection.find(
      (medicine) =>
        medicine.name === name &&
        medicine.manufacturer === manufacturer &&
        medicine.expirationDate === expirationDate
    );
    if (existingMedicine) {
      existingMedicine.quantity += parseInt(quantity, 10);
    } else {
      medicine = new Medicine(name, manufacturer, expirationDate, quantity);
      latestMedicineCollection.push(medicine);
    }
    this.storeMedicines(latestMedicineCollection);
    MedicineManager.medicinesCollection = latestMedicineCollection;
  }

  // save medicine to localstorage
  static storeMedicines(medicinesCollection) {
    localStorage.setItem(
      "medicines-collection",
      JSON.stringify(medicinesCollection)
    );
  }

  // delete medicines
  static deleteMedicine(id) {
    const latestCollection = JSON.parse(
      localStorage.getItem("medicines-collection")
    );
    MedicineManager.medicinesCollection = latestCollection.filter(
      (medicine) => {
        return medicine.id !== id;
      }
    );
    MedicineManager.storeMedicines(MedicineManager.medicinesCollection);
    Ui.renderMedicines();
  }

  // render medicine
  static updateMedicine(id, name, manufacturer, expirationDate, quantity) {
    const latestCollection = JSON.parse(
      localStorage.getItem("medicines-collection")
    );
    const medicineIndex = latestCollection.findIndex(
      (medicine) => medicine.id === id
    );
    if (medicineIndex !== -1) {
      latestCollection[medicineIndex] = {
        id,
        name,
        manufacturer,
        expirationDate,
        quantity,
      };
    }
    MedicineManager.storeMedicines(latestCollection);
    MedicineManager.medicinesCollection = latestCollection;
  }
}

export default MedicineManager;
