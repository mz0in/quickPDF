import type { PageSize } from '@renderer/components/Editor'

function createAndDownloadBlobFile(body) {
  const blob = new Blob([body])
  const fileName = `$test.pdf`
  const link = document.createElement('a')
  // Browsers that support HTML5 download attribute
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    // link.setAttribute('download', fileName);
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export async function saveAsPDF(allCss: string, allHtml: string, pageHead: string, size: PageSize) {
  let html = `<!DOCTYPE html>
    <html lang="Hi">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <title>Document</title>
        ${pageHead}
        <style>${allCss}</style>
    </head>
    ${allHtml}
    </html>`

  console.log(html)

  let html2pdfConfig = `let opt = {
      margin: 0,
      image: {type: 'jpeg', quality: 1},
      html2canvas: {scale: 2},
      enableLinks: true,
      jsPDF: {unit: "in", format: [15, 21], orientation: 'portrait'}
  }
  var worker = html2pdf().from(document.body).set(opt).save();
  `
  let generatedPDFBuffer = await window.api.generatePDF(size, html)
  console.log(generatedPDFBuffer)
  createAndDownloadBlobFile(generatedPDFBuffer)
}
