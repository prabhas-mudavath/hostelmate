import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportWeeklyMenu(MENU) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Hostel Mess Weekly Menu", 14, 15);

  const rows = [];

  Object.entries(MENU).forEach(([day, meals]) => {
    Object.entries(meals).forEach(([meal, data]) => {
      rows.push([
        day,
        meal,
        data.items.join(", "),
        data.time,
      ]);
    });
  });

  autoTable(doc, {
    startY: 25,
    head: [["Day", "Meal", "Menu", "Time"]],
    body: rows,
    styles: { fontSize: 8 },
  });

  doc.save("Mess_Menu_Weekly.pdf");
}
