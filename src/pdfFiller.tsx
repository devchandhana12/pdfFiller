/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { PDFDocument, PDFForm } from "pdf-lib";
import pdf from "./assets/filler.pdf";
import { employeeData, fieldMappings } from "./formData";

const App: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const fillPdfFields = async () => {
    try {
      const response = await fetch(pdf);
      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();

      // Get all field names from the PDF
      const fields = form.getFields();
      const fieldNames = fields.map((field) => field.getName());

      // Loop through employee data and check for matching field names
      for (const [key, value] of Object.entries(employeeData)) {
        if (fieldNames.includes(key)) {
          if (typeof value === "boolean") {
            // Handle checkbox fields
            const checkboxField = form.getCheckBox(key);
            if (checkboxField) {
              !value ? checkboxField.check() : checkboxField.uncheck();
              checkboxField.enableReadOnly();
            }
          } else {
            const field = form.getTextField(key);
            if (field) {
              field.setText(value.toString());
              field.enableReadOnly();
            }
          }
        } else {
          handleDynamicFields(key, value, form);
        }
      }

      // // Embed the barcode image
      // const barcodeBytes = await fetch(barcodeImage).then((res) =>
      //   res.arrayBuffer()
      // );
      // const barcodeImageEmbed = await pdfDoc.embedPng(barcodeBytes);
      // const page = pdfDoc.getPage(0);
      // const { width, height } = page.getSize();

      // // Draw the barcode image at the specified location
      // page.drawImage(barcodeImageEmbed, {
      //   x: width - 175,
      //   y: height - 83,
      //   width: 150,
      //   height: 40,
      // });

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Set the PDF URL for preview and open it in a new tab
      setPdfUrl(url);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };
  const handleDynamicFields = (
    key: string,
    value: string | number | boolean,
    form: PDFForm
  ) => {
    for (const [baseKey, mappedFields] of Object.entries(fieldMappings)) {
      if (key.startsWith(baseKey)) {
        const valueStr = value.toString();
        const valueParts = valueStr.split(""); // Reverse the order of the values
        const diff = mappedFields.length - valueParts.length;
        if (diff > 0) {
          valueParts.unshift(...Array(diff).fill(""));
        }
        for (
          let i = 0;
          i < Math.min(valueParts.length, mappedFields.length);
          i++
        ) {
          const dynamicFieldName = mappedFields[i];
          const dynamicField = form.getTextField(dynamicFieldName);
          dynamicField.setText(valueParts[i]);
          dynamicField.enableReadOnly();
        }
      }
    }
  };

  useEffect(() => {
    fillPdfFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>PDF Filler with Barcode Preview</h1>
      {pdfUrl ? <p>PDF opened in a new tab.</p> : <p>Loading PDF...</p>}
    </div>
  );
};

export default App;
