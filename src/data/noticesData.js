// src/data/noticesData.js

export const NOTICES_DATA = {
  /* ---------- BOYS HOSTELS ---------- */

  SSB: [
    notice(1, "Mess Timing Change", "Dinner will be served from 8:30 PM today.", "High", "16 Dec 2025"),
    notice(2, "Water Supply Interruption", "No water from 6 AM to 9 AM tomorrow.", "High", "15 Dec 2025"),
    notice(3, "Room Inspection", "Room inspection scheduled on Friday.", "Medium", "14 Dec 2025"),
    notice(4, "Internet Maintenance", "Wi-Fi downtime from 2–3 PM.", "Medium", "13 Dec 2025"),
    notice(5, "Cleanliness Drive", "Participate in hostel cleanliness drive.", "Low", "12 Dec 2025"),
  ],

  GDB: [
    notice(1, "Lift Maintenance", "Lift will be under maintenance today.", "High", "16 Dec 2025"),
    notice(2, "Water Cooler Repair", "Cooler repair work in progress.", "Medium", "15 Dec 2025"),
    notice(3, "Common Hall Cleaning", "Common hall cleaning at 4 PM.", "Low", "14 Dec 2025"),
    notice(4, "Electrical Check", "Routine electrical safety check.", "Medium", "13 Dec 2025"),
    notice(5, "Quiet Hours", "Maintain silence after 10 PM.", "Low", "12 Dec 2025"),
  ],

  MV: [
    notice(1, "Power Shutdown", "Power shutdown from 1–2 PM.", "High", "16 Dec 2025"),
    notice(2, "Plumbing Work", "Plumbing repairs in Block B.", "Medium", "15 Dec 2025"),
    notice(3, "Wi-Fi Upgrade", "Internet upgrade in progress.", "Medium", "14 Dec 2025"),
    notice(4, "Mess Feedback", "Submit mess feedback by tonight.", "Low", "13 Dec 2025"),
    notice(5, "Fire Drill", "Fire drill scheduled tomorrow.", "Low", "12 Dec 2025"),
  ],

  DBA: [
    notice(1, "Generator Testing", "Generator testing at 3 PM.", "High", "16 Dec 2025"),
    notice(2, "Water Tank Cleaning", "Tank cleaning tomorrow morning.", "Medium", "15 Dec 2025"),
    notice(3, "Lift Inspection", "Lift inspection by authorities.", "Medium", "14 Dec 2025"),
    notice(4, "Room Allotment", "New room allotments released.", "Low", "13 Dec 2025"),
    notice(5, "Security Update", "New entry rules implemented.", "Low", "12 Dec 2025"),
  ],

  MSS: [
    notice(1, "Power Backup Test", "Backup system test at 2 PM.", "High", "16 Dec 2025"),
    notice(2, "Maintenance Check", "Routine maintenance check.", "Medium", "15 Dec 2025"),
    notice(3, "Water Usage Advisory", "Use water judiciously.", "Low", "14 Dec 2025"),
    notice(4, "Furniture Audit", "Furniture audit scheduled.", "Low", "13 Dec 2025"),
    notice(5, "Mess Committee Meet", "Meeting at 7 PM.", "Low", "12 Dec 2025"),
  ],

  SD: [
    notice(1, "Exhaust Fan Repair", "Repair work today.", "Medium", "16 Dec 2025"),
    notice(2, "Bathroom Cleaning", "Deep cleaning scheduled.", "Medium", "15 Dec 2025"),
    notice(3, "Electricity Check", "Routine checks ongoing.", "Low", "14 Dec 2025"),
    notice(4, "Room Painting", "Painting work in progress.", "Low", "13 Dec 2025"),
    notice(5, "Hostel Meeting", "Meeting at 8 PM.", "Low", "12 Dec 2025"),
  ],

  VS: [
    notice(1, "Lift Noise Issue", "Lift inspection today.", "High", "16 Dec 2025"),
    notice(2, "Switch Repair", "Switch replacement in rooms.", "Medium", "15 Dec 2025"),
    notice(3, "Water Drain Cleaning", "Drain cleaning work.", "Medium", "14 Dec 2025"),
    notice(4, "Fire Safety Notice", "Check fire exits.", "Low", "13 Dec 2025"),
    notice(5, "Maintenance Window", "Minor maintenance ongoing.", "Low", "12 Dec 2025"),
  ],

  VK: [
    notice(1, "AC Maintenance", "AC servicing today.", "High", "16 Dec 2025"),
    notice(2, "Water Cooler Cleaning", "Cooler cleaning scheduled.", "Medium", "15 Dec 2025"),
    notice(3, "Common Area Rules", "Updated common area rules.", "Low", "14 Dec 2025"),
    notice(4, "Security Drill", "Security drill at 6 PM.", "Low", "13 Dec 2025"),
    notice(5, "Hostel Inspection", "Inspection tomorrow.", "Low", "12 Dec 2025"),
  ],

  /* ---------- GIRLS HOSTELS ---------- */

  CVR: [
    notice(1, "Mess Menu Update", "Special dinner tonight.", "High", "16 Dec 2025"),
    notice(2, "Water Issue", "Low water pressure in morning.", "Medium", "15 Dec 2025"),
    notice(3, "Room Cleaning", "Room cleaning schedule updated.", "Low", "14 Dec 2025"),
    notice(4, "Safety Guidelines", "Follow safety instructions.", "Low", "13 Dec 2025"),
    notice(5, "Cultural Event", "Cultural event tomorrow.", "Low", "12 Dec 2025"),
  ],

  HB: [
    notice(1, "Power Maintenance", "Power outage from 10–11 AM.", "High", "16 Dec 2025"),
    notice(2, "Water Supply", "Water supply delay expected.", "Medium", "15 Dec 2025"),
    notice(3, "Mess Feedback", "Provide mess feedback.", "Low", "14 Dec 2025"),
    notice(4, "Room Check", "Room check today.", "Low", "13 Dec 2025"),
    notice(5, "Hostel Cleanliness", "Maintain cleanliness.", "Low", "12 Dec 2025"),
  ],

  KMS: [
    notice(1, "AC Servicing", "AC servicing ongoing.", "High", "16 Dec 2025"),
    notice(2, "Plumbing Repair", "Repair work in Block C.", "Medium", "15 Dec 2025"),
    notice(3, "Wi-Fi Reset", "Wi-Fi reset at night.", "Medium", "14 Dec 2025"),
    notice(4, "Mess Timings", "Mess timing updated.", "Low", "13 Dec 2025"),
    notice(5, "Safety Drill", "Safety drill tomorrow.", "Low", "12 Dec 2025"),
  ],
};

/* ---------- HELPER ---------- */
function notice(id, title, description, priority, date) {
  return { id, title, description, priority, date };
}