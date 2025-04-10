import * as XLSX from "xlsx";
import { Requirement } from "@/lib/types";

export function generateReport(requirements: Requirement[]) {
  const exportToExcel = () => {
    // Prepare the data for export
    const exportData = requirements.map((requirement, index) => {
      return {
        "No.": index + 1,
        Entity: requirement.entity,
        "Law / Rule / Clause / D.O / M.C": requirement.complianceType,
        "Compliance List": requirement.complianceList,
        "Frequency of Compliance": requirement.frequencyOfCompliance,
        "Date Submitted": requirement.dateSubmitted,
        Expiration: requirement.expiration,
        Department: requirement.department,
        Renewal: requirement.renewal,
        "Person in Charge": requirement.personInCharge,
        Status: requirement.status,
        "Type of Compliance": requirement.typeOfCompliance,
        "Document Reference": requirement.documentReference,
      };
    });

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requirements");

    // Generate and download the file
    XLSX.writeFile(wb, "requirements_report.xlsx");
  };

  exportToExcel();
}

export default generateReport;
