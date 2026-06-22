const db = require("../config/db");
const PDFDocument = require("pdfkit");

// Get All Invoices

exports.getInvoices = (req, res) => {

  const sql = `
    SELECT
      i.*,
      c.name AS customer_name,
      v.vehicle_number
    FROM invoices i
    LEFT JOIN customers c
      ON i.customer_id = c.id
    LEFT JOIN vehicles v
      ON i.vehicle_id = v.id
    ORDER BY i.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err)
      return res.status(500).json(err);

    res.json(result);

  });

};

// Create Invoice

exports.createInvoice = (req, res) => {

  const {
    customer_id,
    vehicle_id,
    job_card_id,
    notes,
    items
  } = req.body;

  let totalAmount = 0;

  items.forEach((item) => {
    totalAmount += item.qty * item.rate;
  });

  const year = new Date().getFullYear();

  db.query(
    "SELECT COUNT(*) AS total FROM invoices",
    (err, countRows) => {

      if (err)
        return res.status(500).json(err);

      const nextNo =
        countRows[0].total + 1;

      const invoiceNo =
        `INV-${year}-` +
        String(nextNo).padStart(6, "0");

      const sql = `
        INSERT INTO invoices
        (
          invoice_no,
          customer_id,
          vehicle_id,
          job_card_id,
          total_amount,
          balance_amount,
          notes
        )
        VALUES (?,?,?,?,?,?,?)
      `;

      db.query(
        sql,
        [
          invoiceNo,
          customer_id,
          vehicle_id,
          job_card_id,
          totalAmount,
          totalAmount,
          notes
        ],
        (err, result) => {

          if (err)
            return res.status(500).json(err);

          const invoiceId =
            result.insertId;

          const itemValues =
            items.map((item) => [

              invoiceId,
              item.item_name,
              item.qty,
              item.rate,
              item.qty * item.rate,
              item.item_type

            ]);

          db.query(
            `
            INSERT INTO invoice_items
            (
              invoice_id,
              item_name,
              qty,
              rate,
              total,
              item_type
            )
            VALUES ?
            `,
            [itemValues],
            (err) => {

              if (err)
                return res.status(500).json(err);

              res.json({
                success: true,
                invoice_id: invoiceId,
                invoice_no: invoiceNo
              });

            }
          );

        }
      );

    }
  );

};
exports.downloadInvoicePDF = (req, res) => {

  const invoiceId = req.params.id;

  const sql = `
    SELECT
      i.*,
      c.name AS customer_name,
      c.mobile,
      c.address,
      v.vehicle_number,
      v.vehicle_model,
      v.vehicle_make
    FROM invoices i
    LEFT JOIN customers c
      ON i.customer_id = c.id
    LEFT JOIN vehicles v
      ON i.vehicle_id = v.id
    WHERE i.id = ?
  `;

  db.query(
    sql,
    [invoiceId],
    (err, invoiceRows) => {

      if (err)
        return res.status(500).json(err);

      if (invoiceRows.length === 0) {

        return res.status(404).json({
          message: "Invoice Not Found"
        });

      }

      const invoice =
        invoiceRows[0];

      db.query(
        `
        SELECT *
        FROM invoice_items
        WHERE invoice_id = ?
        `,
        [invoiceId],
        (err, items) => {

          if (err)
            return res.status(500).json(err);

          const doc =
            new PDFDocument({
              size: "A4",
              margin: 40
            });

          res.setHeader(
            "Content-Type",
            "application/pdf"
          );

          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${invoice.invoice_no}.pdf`
          );

          doc.pipe(res);

          // LOGO

          doc.image(
            "src/uploads/logo.png",
            40,
            20,
            {
              width: 80
            }
          );

          // HEADER

          doc
            .fontSize(22)
            .font("Helvetica-Bold")
            .fillColor("#003366")
            .text(
              "PURVI AUTOMOTIVE SERVICES",
              130,
              30
            );

          doc
            .fontSize(11)
            .fillColor("black")
            .font("Helvetica")
            .text(
              "Bhatpada, Chandansar Road, Near RTO Office",
              130,
              60
            );

          doc.text(
            "Behind Pratik Beer Shop, Virar East - 401303",
            130,
            78
          );

          doc.text(
            "Mobile : 7507773555",
            130,
            96
          );

          doc.moveTo(
            40,
            130
          )
          .lineTo(
            550,
            130
          )
          .stroke();

          // TITLE

          doc
            .fontSize(18)
            .font("Helvetica-Bold")
            .fillColor("#003366")
            .text(
              "INVOICE",
              {
                align: "center"
              }
            );

          doc.moveDown();

          // Customer Box

          doc.rect(
            40,
            180,
            250,
            90
          ).stroke();

          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .text(
              "Customer Details",
              50,
              190
            );

          doc
            .fontSize(11)
            .font("Helvetica")
            .text(
              `Name : ${invoice.customer_name}`,
              50,
              215
            );

          doc.text(
            `Mobile : ${invoice.mobile || "-"}`,
            50,
            235
          );

          doc.text(
            `Address : ${invoice.address || "-"}`,
            50,
            255,
            {
              width: 220
            }
          );

          // Vehicle Box

          doc.rect(
            310,
            180,
            240,
            90
          ).stroke();

          doc
            .fontSize(12)
            .font("Helvetica-Bold")
            .text(
              "Vehicle Details",
              320,
              190
            );

          doc
            .fontSize(11)
            .font("Helvetica")
            .text(
              `Vehicle No : ${invoice.vehicle_number}`,
              320,
              215
            );

          doc.text(
            `Model : ${invoice.vehicle_model || "-"}`,
            320,
            235
          );

          doc.text(
            `Make : ${invoice.vehicle_make || "-"}`,
            320,
            255
          );
                    // Invoice Info

          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .text(
              `Invoice No : ${invoice.invoice_no}`,
              40,
              290
            );

          doc.text(
            `Date : ${new Date(
              invoice.created_at
            ).toLocaleDateString()}`,
            380,
            290
          );

          // TABLE HEADER

          let tableTop = 330;

          doc
            .rect(40, tableTop, 510, 25)
            .fillAndStroke("#003366", "#003366");

          doc
            .fillColor("white")
            .font("Helvetica-Bold")
            .fontSize(11);

          doc.text("Item Name", 50, tableTop + 7);
          doc.text("Qty", 280, tableTop + 7);
          doc.text("Rate", 350, tableTop + 7);
          doc.text("Total", 450, tableTop + 7);

          // TABLE ROWS

          let y = tableTop + 25;

          doc.fillColor("black");
          doc.font("Helvetica");

          items.forEach((item) => {

            doc.rect(40, y, 510, 25).stroke();

            doc.text(
              item.item_name,
              50,
              y + 7,
              {
                width: 200
              }
            );

            doc.text(
              String(item.qty),
              280,
              y + 7
            );

            doc.text(
              "Rs. " + item.rate,
              350,
              y + 7
            );

            doc.text(
              "Rs. " + item.total,
              450,
              y + 7
            );

            y += 25;

          });

          y += 20;

          // GRAND TOTAL

          doc
            .rect(340, y, 210, 50)
            .fillAndStroke("#dff5e1", "#008000");

          doc
            .fillColor("#006400")
            .font("Helvetica-Bold")
            .fontSize(14)
            .text(
              "Grand Total",
              360,
              y + 8
            );

          doc
            .fontSize(20)
            .text(
              "Rs. " + invoice.total_amount,
              360,
              y + 25
            );
y += 70;

// PAYMENT SUMMARY BOX

doc
  .rect(320, y, 230, 100)
  .fillAndStroke("#f5f5f5", "#cccccc");

doc
  .fillColor("black")
  .font("Helvetica-Bold")
  .fontSize(13)
  .text(
    `Paid Amount : Rs. ${invoice.paid_amount}`,
    340,
    y + 15
  );

doc.text(
  `Balance Amount : Rs. ${invoice.balance_amount}`,
  340,
  y + 40
);

doc
  .fillColor(
    invoice.status === "Paid"
      ? "green"
      : invoice.status === "Partial"
      ? "orange"
      : "red"
  )
  .text(
    `Status : ${invoice.status}`,
    340,
    y + 65
  );

doc.fillColor("black");

y += 130;

// ======================
// NOTES
// ======================

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .text(
    "Notes :",
    40,
    y
  );

doc
  .font("Helvetica")
  .fontSize(11)
  .text(
    invoice.notes || "-",
    40,
    y + 20,
    {
      width: 250
    }
  );

// ======================
// TERMS & CONDITIONS
// ======================

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .text(
    "Terms & Conditions",
    40,
    y + 80
  );

doc
  .font("Helvetica")
  .fontSize(10)
  .text(
    "1. Goods once sold will not be taken back.",
    40,
    y + 105
  );

doc.text(
  "2. Payment due on receipt.",
  40,
  y + 120
);

doc.text(
  "3. Thank you for choosing Purvi Automotive Services.",
  40,
  y + 135
);

// ======================
// SIGNATURE
// ======================

doc
  .font("Helvetica-Bold")
  .fontSize(12)
  .text(
    "Authorized Signature",
    360,
    y + 100
  );

doc
  .font("Helvetica")
  .fontSize(11)
  .text(
    "Purvi Automotive Services",
    360,
    y + 125
  );
doc.end();

        }
      );
    }
  );
};

// ======================================
// UPDATE PAYMENT
// ======================================

exports.updatePayment = (req, res) => {

  const invoiceId = req.params.id;
  const { paid_amount } = req.body;

  db.query(
    "SELECT total_amount FROM invoices WHERE id = ?",
    [invoiceId],
    (err, rows) => {

      if (err)
        return res.status(500).json(err);

      if (rows.length === 0) {

        return res.status(404).json({
          message: "Invoice Not Found"
        });

      }

      const total =
        Number(rows[0].total_amount);

      const paid =
        Number(paid_amount);

      const balance =
        total - paid;

      let status = "Unpaid";

      if (balance <= 0) {

        status = "Paid";

      }
      else if (paid > 0) {

        status = "Partial";

      }

      db.query(
        `
        UPDATE invoices
        SET
          paid_amount = ?,
          balance_amount = ?,
          status = ?
        WHERE id = ?
        `,
        [
          paid,
          balance,
          status,
          invoiceId
        ],
        (err) => {

          if (err)
            return res.status(500).json(err);

          res.json({
            success: true,
            status,
            balance_amount: balance
          });

        }
      );

    }
  );

};
exports.deleteInvoice = (req, res) => {

  const invoiceId = req.params.id;

  db.query(
    "DELETE FROM invoice_items WHERE invoice_id = ?",
    [invoiceId],
    (err) => {

      if (err)
        return res.status(500).json(err);

      db.query(
        "DELETE FROM invoices WHERE id = ?",
        [invoiceId],
        (err) => {

          if (err)
            return res.status(500).json(err);

          res.json({
            success: true
          });

        }
      );

    }
  );

};