// src/data/laundryData.js

export const LAUNDRY_DATA = {
  CVR: {
    machineType: "Assisted",
    description:
      "Laundry attendant available to operate washing machines.",
    price: "₹10 per bucket",
    timings: "6:00 AM – 9:00 AM & 5:00 PM – 8:00 PM",
  },

  DEFAULT: {
    machineType: "Self Service",
    description:
      "Students can use washing machines on their own at any time.",
    price: "Free",
    timings: "Anytime",
  },

  PRIVATE_SHED: {
    name: "Private Laundry Service",
    services: ["Dry Wash", "Normal Wash"],
    note:
      "Charges decided by vendor. Optional service for all hostels.",
    contact: "+91 9XXXXXXXXX",
  },
};