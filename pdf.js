
let cpf = document.getElementById("cpf");
cpf.addEventListener("blur", () => {
    if (cpf.value.length < 11) {
        alert("CPF inválido!");
        cpf.style.border ="1.3px solid red";
    } else{
        cpf.style.border ="";
    }
});

document.querySelector(".pdf").addEventListener("click", async () => {
    if (cpf.value.length < 11) {
        return
        
    }
    const formData = new FormData(document.getElementById("myForm"));

    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const fields = ['Data', 'Horário', 'Nome', 'Data-nascimento', 'Cpf', 'Profissão'];
    fields.forEach((field, index) => {
        page.drawText(`${field.replace('-', ' ')}: ${formData.get(field)}`, { x: 50, y: 350 - (index * 20), size: 12 });
    });

    const pdfBytes = await pdfDoc.save();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = `${formData.get('Nome')}.pdf`;
    link.click();
});
