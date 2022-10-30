import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function ticketsPDF(qrId) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const reportTitle = []

  const details = [
    {
      text: 'ANIMEGEEK',
      fontSize: 40,
      bold: true,
      alignment: 'center',
      margin: [0, 20, 0, 20]
    },

    {
      text: 'Sábado - 17 de Dezembro',
      fontSize: 30,
      bold: true,
      alignment: 'center',
      margin: [0, 20, 0, 0]
    },

    {
      text: 'Domingo - 18 de Dezembro',
      fontSize: 30,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },

    {
      text: 'Local: UNINASSAU',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [20, 20, 0, 0]
    },

    {
      text: 'Hora: 11:00h às 21:00h',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      text: 'Meia- Entrada Social',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [30, 0, 0, 0]
    },
    {
      text: '(Promoção Todos Pagam Meia)',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      alignment: 'center',
      qr: qrId,
      fit: 250,
      margin: [0, 30, 0, 40]
    },

    {
      text: qrId,
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 50, 0, 0]
    }
  ]

  const footer = []

  const docDefinitions = {
    pageSize: {
      width: 450,
      height: 800
    },
    pageMargins: [0, 0, 0, 0],

    header: [reportTitle],
    content: [details],
    footer: [footer]
  }

  pdfMake.createPdf(docDefinitions).open({}, window)
}

export function ticketsPDFSab(qrId) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const reportTitle = []

  const details = [
    {
      text: 'ANIMEGEEK',
      fontSize: 40,
      bold: true,
      alignment: 'center',
      margin: [0, 20, 0, 20]
    },

    {
      text: 'Sábado - 17 de Dezembro',
      fontSize: 30,
      bold: true,
      alignment: 'center',
      margin: [0, 20, 0, 0]
    },

    {
      text: 'Local: UNINASSAU',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [20, 20, 0, 0]
    },

    {
      text: 'Hora: 11:00h às 21:00h',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      text: 'Meia- Entrada Social',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [30, 0, 0, 0]
    },
    {
      text: '(Promoção Todos Pagam Meia)',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      alignment: 'center',
      qr: qrId,
      fit: 250,
      margin: [0, 30, 0, 40]
    },

    {
      text: qrId,
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 50, 0, 0]
    }
  ]

  const footer = []

  const docDefinitions = {
    pageSize: {
      width: 450,
      height: 800
    },
    pageMargins: [0, 0, 0, 0],

    header: [reportTitle],
    content: [details],
    footer: [footer]
  }

  pdfMake.createPdf(docDefinitions).open({}, window)
}

export function ticketsPDFDom(qrId) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const reportTitle = []

  const details = [
    {
      text: 'ANIMEGEEK',
      fontSize: 40,
      bold: true,
      alignment: 'center',
      margin: [0, 20, 0, 20]
    },

    {
      text: 'Domingo - 18 de Dezembro',
      fontSize: 30,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 20]
    },

    {
      text: 'Local: UNINASSAU',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [20, 20, 0, 0]
    },

    {
      text: 'Hora: 11:00h às 21:00h',
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      text: 'Meia- Entrada Social',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [30, 0, 0, 0]
    },
    {
      text: '(Promoção Todos Pagam Meia)',
      fontSize: 22,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 30]
    },

    {
      alignment: 'center',
      qr: qrId,
      fit: 250,
      margin: [0, 30, 0, 40]
    },

    {
      text: qrId,
      fontSize: 22,
      italics: true,
      alignment: 'center',
      margin: [0, 50, 0, 0]
    }
  ]

  const footer = []

  const docDefinitions = {
    pageSize: {
      width: 450,
      height: 800
    },
    pageMargins: [0, 0, 0, 0],

    header: [reportTitle],
    content: [details],
    footer: [footer]
  }

  pdfMake.createPdf(docDefinitions).open({}, window)
}
