// Entry point landing page 1cdx (memakai JSCroot: https://github.com/jscroot/lib).
// Mengambil rilis terbaru dari GitHub Releases dan mengisi tombol unduh.
import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/api.js";
import { container, setInnerText, runAfterDOM } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.js";

const REPO = "1cdx/1cdx";
const API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;

function formatSize(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function renderRelease({ status, data }) {
    // Jika gagal (belum ada rilis / rate limit), link statis /releases/latest/download/1cdx.apk tetap dipakai.
    if (status !== 200 || !data || !data.tag_name) return;

    const assets = data.assets || [];
    const apk = assets.find((a) => a.name === "1cdx.apk") || assets.find((a) => a.name.endsWith(".apk"));
    const sums = assets.find((a) => a.name === "SHA256SUMS.txt");

    setInnerText("release-version", data.tag_name);
    container("release-notes").href = data.html_url;

    if (apk) {
        container("download-btn").href = apk.browser_download_url;
        container("download-link").href = apk.browser_download_url;
        setInnerText(
            "release-meta",
            `${data.tag_name} · ${formatSize(apk.size)} · dirilis ${formatDate(data.published_at)} · Android 8.0+`
        );
    }
    if (sums) {
        container("checksum-link").href = sums.browser_download_url;
    }
}

runAfterDOM(() => getJSON(API_LATEST, renderRelease));
