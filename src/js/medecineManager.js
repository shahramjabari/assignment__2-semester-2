import medicine from "./medicine.js";

class MedicineManager {
  static medicinesCollection =
    JSON.parse(localStorage.getItem("medicines-collection")) || [];

  // Add new medicine
  static addMedicine(
    name,
    manufacturer,
    expirationDate,
    medicineType,
    dosage,
    volume
  ) {
    const latestMedicineCollection =
      JSON.parse(localStorage.getItem("medicines-collection")) || [];
    let medicine;
    if (medicineType === "tablet") {
      medicine = new Medicine(
        name,
        manufacturer,
        new Date(expirationDate),
        medicineType,
        dosage
      );
    } else if (medicineType === "liquid") {
      medicine = new Medicine(
        name,
        manufacturer,
        new Date(expirationDate),
        medicineType,
        dosage,
        volume
      );
    }
    latestMedicineCollection.push(medicine);
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
      (medicine) => medicine.id !== id
    );
    MedicineManager.storeMedicines(MedicineManager.medicinesCollection);
    Ui.renderMedicines();
  }

  // render medicine
  static updateMedicine(
    id,
    name,
    manufacturer,
    expirationDate,
    medicineType,
    dosage,
    volume
  ) {
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
        expirationDate: new Date(expirationDate),
        medicineType,
        dosage,
        volume,
      };
    }
    MedicineManager.storeMedicines(latestCollection);
    MedicineManager.medicinesCollection = latestCollection;
  }
}

export default MedicineManager;
