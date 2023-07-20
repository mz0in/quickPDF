interface PaperInfo {
  companyName: string
  date: string
}

function createAndDownloadBlobFile(body: BlobPart, info: PaperInfo): void {
  const blob = new Blob([body])
  const fileName = `${info.companyName}-${info.date}.pdf`
  const link = document.createElement('a')
  // Browsers that support HTML5 download attribute
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export async function saveAsPDF(
  allCss: string,
  allHtml: string,
  info: PaperInfo,
  codeOfPaper: any
): Promise<void> {
  const html = `<!DOCTYPE html>
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
    </html>`

  console.log(info, codeOfPaper)

  // @ts-ignore api is defined at preload.ts of electronjs
  const generatedPDFBuffer: BlobPart = await window.api.save(info, html, codeOfPaper)
  console.log(generatedPDFBuffer)
  createAndDownloadBlobFile(generatedPDFBuffer, info)
}
