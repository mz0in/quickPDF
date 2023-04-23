function addScript(window: Window, src: string) {
  return new Promise((resolve, reject) => {
    const s = window.document.createElement('script')

    s.setAttribute('src', src)
    s.addEventListener('load', resolve)
    s.addEventListener('error', reject)

    window.document.body.appendChild(s)
  })
}

export function saveAsPDF(allCss: string, allHtml: string) {
  console.log(allCss, allHtml)
  let pdfWindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150')

  pdfWindow?.document.write(`<!DOCTYPE html>
    <html lang="Hi">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <title>Document</title>
        <style>${allCss}</style>
    </head>
    ${allHtml}
    </html>`)

  let html2pdf = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
  let html2pdfConfig = `let opt = {
      margin: 0,
      image: {type: 'jpeg', quality: 1},
      html2canvas: {scale: 2},
      enableLinks: true,
      jsPDF: {unit: "in", format: [15, 21], orientation: 'portrait'}
  }
  var worker = html2pdf().from(document.body).set(opt).save();
  `

  addScript(pdfWindow as Window, html2pdf).then(() => {
    const url = URL.createObjectURL(new Blob([html2pdfConfig]))
    addScript(pdfWindow as Window, url).then(() => URL.revokeObjectURL(url))
  })
}
