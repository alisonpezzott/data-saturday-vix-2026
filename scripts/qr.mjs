/**
 * Regenerate the QR codes in public/. Run with `npm run qr`.
 * 640px with a 2-module quiet zone; the slide adds a white plate around it.
 */
import QRCode from 'qrcode'

const targets = [
  ['public/01-qr-youtube.png', 'https://www.youtube.com/@alisonpezzott'],
  ['public/10-qr-github.png', 'https://github.com/alisonpezzott'],
]

for (const [file, url] of targets) {
  await QRCode.toFile(file, url, {
    width: 640,
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#ffffff' },
  })
  console.log(`${file}  <-  ${url}`)
}
