# 1cdx.github.io

Landing page **1cdx** (https://1cdx.github.io), situs statis GitHub Pages memakai [croot.js / JSCroot](https://github.com/jscroot/lib).

- `index.html`: halaman utama
- `croot.js`: entry module; memanggil GitHub API `repos/1cdx/1cdx/releases/latest` untuk mengisi versi, ukuran, tanggal, dan link unduh APK
- `style.css`, `icon.svg`: tampilan

Tombol unduh punya fallback statis `https://github.com/1cdx/1cdx/releases/latest/download/1cdx.apk`, yang selalu mengarah ke APK rilis terbaru hasil workflow otomatis di repo [`1cdx/1cdx`](https://github.com/1cdx/1cdx).

Preview lokal:

```bash
python3 -m http.server 8000
```
