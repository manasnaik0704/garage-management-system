const db = require("../config/db");
const PDFDocument = require("pdfkit");

exports.createQuotation = (req, res) => {
  const { customer_id, vehicle_id, notes, items } = req.body;

  // Total Calculate
  let totalAmount = 0;

  items.forEach((item) => {
    totalAmount += item.qty * item.rate;
  });

  // Generate Quotation Number
  const year = new Date().getFullYear();

  db.query(
    "SELECT COUNT(*) AS total FROM quotations",
    (err, countResult) => {
      if (err) return res.status(500).json(err);

      const nextNo = countResult[0].total + 1;

      const quotationNo =
        `QT-${year}-` +
        String(nextNo).padStart(6, "0");

      // Insert Quotation

      const quotationSql = `
        INSERT INTO quotations
        (
          customer_id,
          vehicle_id,
          quotation_no,
          total_amount,
          notes
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        quotationSql,
        [
          customer_id,
          vehicle_id,
          quotationNo,
          totalAmount,
          notes
        ],
        (err, quotationResult) => {
          if (err) return res.status(500).json(err);

          const quotationId =
            quotationResult.insertId;

          // Save Items

          const itemValues = items.map((item) => [
            quotationId,
            item.item_name,
            item.qty,
            item.rate,
            item.qty * item.rate,
            item.item_type
          ]);

          const itemSql = `
            INSERT INTO quotation_items
            (
              quotation_id,
              item_name,
              qty,
              rate,
              total,
              item_type
            )
            VALUES ?
          `;

          db.query(
            itemSql,
            [itemValues],
            (err) => {
              if (err)
                return res.status(500).json(err);

              res.json({
                success: true,
                quotation_id: quotationId,
                quotationNo: quotationNo,
                total_amount: totalAmount,
                message:
                  "Quotation Created Successfully"
              });
            }
          );
        }
      );
    }
  );
};
exports.convertToJobCard = (req, res) => {
  const quotationId = req.params.id;

  db.query(
    "SELECT * FROM quotations WHERE id = ?",
    [quotationId],
    (err, quotationRows) => {
      if (err) return res.status(500).json(err);

      if (quotationRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      const quotation = quotationRows[0];

      if (
        quotation.status !== "Approved" &&
        quotation.status !== "Sent"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only Approved/Sent quotations can be converted",
        });
      }

      const year = new Date().getFullYear();

      db.query(
        "SELECT COUNT(*) AS total FROM job_cards",
        (err, countRows) => {
          if (err) return res.status(500).json(err);

          const nextNo =
            countRows[0].total + 1;

          const jobCardNo =
            `JC-${year}-` +
            String(nextNo).padStart(6, "0");

          const insertSql = `
            INSERT INTO job_cards
            (
              quotation_id,
              customer_id,
              vehicle_id,
              job_card_no,
              estimated_cost
            )
            VALUES (?, ?, ?, ?, ?)
          `;

          db.query(
            insertSql,
            [
              quotation.id,
              quotation.customer_id,
              quotation.vehicle_id,
              jobCardNo,
              quotation.total_amount
            ],
            (err, result) => {
              if (err)
                return res.status(500).json(err);

              db.query(
                `
                UPDATE quotations
                SET status='Converted'
                WHERE id=?
                `,
                [quotationId],
                (err) => {
                  if (err)
                    return res.status(500).json(err);

                  res.json({
                    success: true,
                    job_card_no: jobCardNo,
                    message:
                      "Job Card Created Successfully"
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};
exports.downloadQuotationPDF = (req, res) => {
  const quotationId = req.params.id;

  const sql = `
    SELECT
      q.*,
      c.name AS customer_name,
      c.mobile,
      c.address,
      v.vehicle_number,
      v.vehicle_model,
      v.vehicle_make
    FROM quotations q
    LEFT JOIN customers c
      ON q.customer_id = c.id
    LEFT JOIN vehicles v
      ON q.vehicle_id = v.id
    WHERE q.id = ?
  `;

  db.query(sql, [quotationId], (err, quotationRows) => {
    if (err) return res.status(500).json(err);

    if (quotationRows.length === 0) {
      return res.status(404).json({
        message: "Quotation Not Found",
      });
    }

    const quotation = quotationRows[0];

    db.query(
      `
      SELECT *
      FROM quotation_items
      WHERE quotation_id = ?
      `,
      [quotationId],
      (err, items) => {

        if (err)
          return res.status(500).json(err);

        const doc = new PDFDocument({
          size: "A4",
          margin: 40,
        });

        res.setHeader(
          "Content-Type",
          "application/pdf"
        );

        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${quotation.quotation_no}.pdf`
        );

        doc.pipe(res);

        // =========================
        // LOGO
        // =========================

        doc.image(
          "src/uploads/logo.png",
          40,
          20,
          {
            width: 80
          }
        );

        // =========================
        // HEADER
        // =========================

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
          .font("Helvetica")
          .fillColor("black")
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

        doc.moveTo(40, 130)
          .lineTo(550, 130)
          .stroke();

        // =========================
        // TITLE
        // =========================

        doc
          .fontSize(18)
          .font("Helvetica-Bold")
          .fillColor("#003366")
          .text(
            "QUOTATION",
            {
              align: "center"
            }
          );

        doc.moveDown();

        // =========================
        // CUSTOMER BOX
        // =========================

        doc.rect(40, 180, 250, 90).stroke();

        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(
            "Customer Details",
            50,
            190
          );

        doc
          .font("Helvetica")
          .fontSize(11)
          .text(
            `Name : ${quotation.customer_name}`,
            50,
            215
          );

        doc.text(
          `Mobile : ${quotation.mobile || "-"}`,
          50,
          235
        );

        doc.text(
          `Address : ${quotation.address || "-"}`,
          50,
          255,
          {
            width: 220
          }
        );

        // =========================
        // VEHICLE BOX
        // =========================

        doc.rect(310, 180, 240, 90).stroke();

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
            `Vehicle No : ${quotation.vehicle_number}`,
            320,
            215
          );

        doc.text(
          `Model : ${quotation.vehicle_model || "-"}`,
          320,
          235
        );

        doc.text(
          `Make : ${quotation.vehicle_make || "-"}`,
          320,
          255
        );

        // =========================
        // QUOTATION INFO
        // =========================

        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .text(
            `Quotation No : ${quotation.quotation_no}`,
            40,
            290
          );

        doc.text(
          `Date : ${new Date(
            quotation.created_at
          ).toLocaleDateString()}`,
          380,
          290
        );
                // =========================
        // ITEM TABLE HEADER
        // =========================

        let tableTop = 330;

        doc
          .rect(40, tableTop, 510, 25)
          .fillAndStroke("#003366", "#003366");

        doc
          .fillColor("white")
          .fontSize(11)
          .font("Helvetica-Bold");

        doc.text("Item Name", 50, tableTop + 7);
        doc.text("Qty", 280, tableTop + 7);
        doc.text("Rate", 350, tableTop + 7);
        doc.text("Total", 450, tableTop + 7);

        // =========================
        // ITEM ROWS
        // =========================

        let y = tableTop + 25;

        doc.fillColor("black");
        doc.font("Helvetica");

        items.forEach((item) => {

          // Row Border
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

        // =========================
        // GRAND TOTAL BOX
        // =========================

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
            "Rs. " + quotation.total_amount,
            360,
            y + 25
          );

        // Reset color
        doc.fillColor("black");

        y += 80;
                // =========================
        // NOTES BOX
        // =========================

        doc
          .rect(40, y, 510, 60)
          .stroke();

        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(
            "Notes",
            50,
            y + 10
          );

        doc
          .font("Helvetica")
          .fontSize(11)
          .text(
            quotation.notes || "-",
            50,
            y + 30,
            {
              width: 480
            }
          );

        y += 80;

        // =========================
        // TERMS & CONDITIONS BOX
        // =========================

        doc
          .rect(40, y, 510, 80)
          .stroke();

        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(
            "Terms & Conditions",
            50,
            y + 10
          );

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(
            "• Quotation Validity : 7 Days",
            60,
            y + 30
          );

        doc.text(
          "• Prices are subject to inspection confirmation.",
          60,
          y + 45
        );

        doc.text(
          "• Material once sold will not be returned.",
          60,
          y + 60
        );

        y += 120;

        // =========================
        // SIGNATURE SECTION
        // =========================

        doc
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(
            "Customer Signature",
            50,
            y
          );

        doc.text(
          "Authorized Signature",
          380,
          y
        );

        doc
          .font("Helvetica")
          .fontSize(10)
          .text(
            "Purvi Automotive Services",
            380,
            y + 25
          );

        // =========================
        // WATERMARK
        // =========================

        doc
          .rotate(-45, {
            origin: [300, 400]
          })
          .opacity(0.08)
          .fontSize(40)
          .fillColor("gray")
          .text(
            "PURVI AUTOMOTIVE SERVICES",
            80,
            400,
            {
              align: "center"
            }
          );

        doc.opacity(1);

        // =========================
        // FOOTER
        // =========================

        doc
          .fillColor("black")
          .fontSize(9)
          .text(
            "Thank You For Choosing Purvi Automotive Services",
            0,
            780,
            {
              align: "center"
            }
          );

        doc.end();

      }
    );
  });
};
exports.getQuotations = (req, res) => {

  const sql = `
    SELECT
      q.*,
      c.name AS customer_name,
      
      v.vehicle_number
    FROM quotations q
    LEFT JOIN customers c
      ON q.customer_id = c.id
    LEFT JOIN vehicles v
      ON q.vehicle_id = v.id
    ORDER BY q.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err)
      return res.status(500).json(err);

    res.json(result);

  });

};