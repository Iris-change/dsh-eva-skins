import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const name = "dsh-eva-skins";
export const inject = ["webServer"];

const CLIENT = resolve(fileURLToPath(new URL("../client/", import.meta.url)));

/* one static mount per skin bundle */
const MOUNTS = [
  { prefix: "/unit02-intro", root: resolve(join(CLIENT, "intro")) },
  { prefix: "/rei-intro", root: resolve(join(CLIENT, "intro-rei")) },
  { prefix: "/shinji-intro", root: resolve(join(CLIENT, "intro-shinji")) },
  { prefix: "/mari-intro", root: resolve(join(CLIENT, "intro-mari")) },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".wav": "audio/wav",
  ".txt": "text/plain; charset=utf-8",
};

const NO_STORE = { "cache-control": "no-store" };

function text(status, message) {
  return new Response(message, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", ...NO_STORE },
  });
}

async function serve(request, mount) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname);
  } catch {
    return text(400, "Bad request");
  }
  if (pathname !== mount.prefix && !pathname.startsWith(mount.prefix + "/")) {
    return text(404, "Not found");
  }
  let relative = pathname.slice(mount.prefix.length).replace(/^\/+/, "");
  if (relative === "" || relative.endsWith("/")) relative += "intro.html";
  const target = resolve(normalize(join(mount.root, relative)));
  if (target !== mount.root && !target.startsWith(mount.root + sep)) {
    return text(403, "Forbidden");
  }
  try {
    const info = await stat(target);
    if (!info.isFile()) return text(404, "Not found");
    const body = await readFile(target);
    return new Response(new Uint8Array(body), {
      status: 200,
      headers: {
        "content-type": MIME[extname(target).toLowerCase()] ?? "application/octet-stream",
        "content-length": String(body.byteLength),
        ...NO_STORE,
      },
    });
  } catch {
    return text(404, "Not found");
  }
}

export function apply(ctx) {
  for (const mount of MOUNTS) {
    ctx.effect(() =>
      ctx.webServer.register({
        kind: "prefix",
        path: mount.prefix,
        resource: (request) => serve(request, mount),
      }),
    );
  }
}

export default { name, inject, apply };
