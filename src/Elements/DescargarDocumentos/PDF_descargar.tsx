import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importa autoTable correctamente

// Función para convertir imagen a Base64
const toBase64 = (url: string) =>
  fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));

export const download_pdf = ({ nurseries, columns, title }: any): any => {
  const button_style = {
    color: 'white',
    backgroundColor: 'red',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  };

  const handleClick = async (): Promise<void> => {
    const doc = new jsPDF();

    // Convertir imagen a Base64
    const header_img_data = await toBase64('../image/naruto.jpg');
    const img_width = 200;
    const img_height = 80;
    const page_width = doc.internal.pageSize.getWidth();
    const img_x = (page_width - img_width) / 2;
    const img_y = 0;

    doc.addImage(header_img_data, 'JPEG', img_x, img_y, img_width, img_height);

    const text_x = page_width / 2;
    const text_y = img_y + img_height / 2 - 5;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(title, text_x, text_y, { align: 'center' });

    const fecha_text = 'Fecha: ' + new Date().toLocaleDateString();
    doc.text(fecha_text, text_x, text_y + 10, { align: 'center' });

    const start_y = img_y + img_height + 10;

    const headers = columns.map((col: any) => col.headerName || col.header);
    const data = nurseries.map((row: any) =>
      columns.map((col: any) => row[col.field as keyof typeof row])
    );

    // Usar autoTable correctamente
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: start_y,
    });

    const file_id = Math.random();
    doc.save(`neilarmstrong${file_id}.pdf`);
  };

  return (
    <button style={button_style} onClick={handleClick}>
      <img style={{ width: 45 }} src="../image/botones/PDF.png" alt="PDF Button" />
    </button>
  );
};
