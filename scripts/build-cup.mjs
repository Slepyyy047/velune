import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { writeFileSync } from "node:fs";
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((value) => {
      this.result = value;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((value) => {
      this.result =
        "data:application/octet-stream;base64," +
        Buffer.from(value).toString("base64");
      this.onloadend?.();
    });
  }
};
const root = new THREE.Group();
root.name = "VELUNE_Sage_Edition_Authored_Study";
const paper = new THREE.MeshStandardMaterial({
  color: "#b8cbb3",
  roughness: 0.91,
  metalness: 0,
});
const inner = new THREE.MeshStandardMaterial({
  color: "#e9e2d0",
  roughness: 0.98,
});
const lid = new THREE.MeshStandardMaterial({
  color: "#303134",
  roughness: 0.76,
});
const dark = new THREE.MeshStandardMaterial({
  color: "#111213",
  roughness: 0.98,
});
const lathe = (name, points, material) => {
  const g = new THREE.LatheGeometry(
    points.map(([x, y]) => new THREE.Vector2(x, y)),
    128,
  );
  const m = new THREE.Mesh(g, material);
  m.name = name;
  root.add(m);
  return m;
};
lathe(
  "Paper_body",
  [
    [0.626, -1.14],
    [0.637, -1.125],
    [0.64, -1.1],
    [0.65, -1.04],
    [0.842, 1.06],
    [0.851, 1.095],
  ],
  paper,
);
lathe(
  "Inner_paper_wall",
  [
    [0.83, 1.095],
    [0.82, 1.05],
    [0.635, -0.99],
    [0.61, -1.02],
    [0, -1.02],
  ],
  inner,
);
lathe(
  "Folded_bottom_foot",
  [
    [0.626, -1.14],
    [0.62, -1.16],
    [0.603, -1.165],
    [0.584, -1.15],
    [0.584, -1.05],
    [0.607, -1.035],
    [0.63, -1.05],
  ],
  paper,
);
lathe(
  "Recessed_bottom_disc",
  [
    [0, -1.08],
    [0.58, -1.08],
    [0.595, -1.065],
  ],
  inner,
);
lathe(
  "Rolled_paper_rim",
  [
    [0.828, 1.065],
    [0.823, 1.085],
    [0.827, 1.111],
    [0.844, 1.13],
    [0.869, 1.13],
    [0.886, 1.115],
    [0.888, 1.09],
    [0.876, 1.068],
    [0.852, 1.06],
    [0.828, 1.065],
  ],
  paper,
);
lathe(
  "Lid_snap_collar",
  [
    [0.854, 1.06],
    [0.889, 1.06],
    [0.913, 1.075],
    [0.928, 1.09],
    [0.93, 1.115],
    [0.916, 1.127],
    [0.902, 1.132],
    [0.895, 1.153],
    [0.898, 1.175],
    [0.902, 1.185],
    [0.899, 1.201],
    [0.878, 1.21],
    [0.855, 1.203],
    [0.848, 1.185],
    [0.85, 1.14],
    [0.854, 1.06],
  ],
  lid,
);
lathe(
  "Lid_raised_drinking_wall",
  [
    [0.876, 1.19],
    [0.858, 1.206],
    [0.842, 1.23],
    [0.82, 1.36],
    [0.809, 1.386],
    [0.79, 1.397],
    [0.768, 1.397],
    [0.755, 1.38],
    [0.75, 1.35],
    [0.733, 1.255],
  ],
  lid,
);
// An actual recessed top with a drinking aperture, rather than a flat cylinder cap.
const top = new THREE.Shape();
top.absarc(0, 0, 0.77, 0, Math.PI * 2, false);
const slot = new THREE.Path();
const sx = 0,
  sy = 0.61,
  sw = 0.21,
  sh = 0.06;
slot.moveTo(sx - sw, sy - sh);
slot.lineTo(sx + sw, sy - sh);
slot.quadraticCurveTo(sx + sw + 0.05, sy - sh, sx + sw + 0.05, sy);
slot.quadraticCurveTo(sx + sw + 0.05, sy + sh, sx + sw, sy + sh);
slot.lineTo(sx - sw, sy + sh);
slot.quadraticCurveTo(sx - sw - 0.05, sy + sh, sx - sw - 0.05, sy);
slot.quadraticCurveTo(sx - sw - 0.05, sy - sh, sx - sw, sy - sh);
top.holes.push(slot);
const vent = new THREE.Path();
vent.absarc(0, -0.54, 0.014, 0, Math.PI * 2, true);
top.holes.push(vent);
const topGeo = new THREE.ExtrudeGeometry(top, {
  depth: 0.018,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 1,
  bevelSize: 0.007,
  bevelThickness: 0.005,
  curveSegments: 64,
});
topGeo.rotateX(-Math.PI / 2);
topGeo.translate(0, 1.344, 0);
const topMesh = new THREE.Mesh(topGeo, lid);
topMesh.name = "Lid_recess_with_sip_aperture_and_vent";
root.add(topMesh);
const cavity = new THREE.Mesh(new THREE.CircleGeometry(0.75, 96), dark);
cavity.rotation.x = -Math.PI / 2;
cavity.position.y = 1.225;
cavity.name = "Dark_interior_below_aperture";
root.add(cavity);
// Low embossed inner rings and a subtle injection mould seam.
for (const [r, y, t] of [
  [0.59, 1.365, 0.006],
  [0.605, 1.365, 0.003],
  [0.875, 1.207, 0.004],
]) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 6, 128), lid);
  m.rotation.x = Math.PI / 2;
  m.position.y = y;
  m.name = "Moulded_lid_detail";
  root.add(m);
}
const seam = lathe(
  "Paper_overlap_seam",
  [
    [0.644, -1.08],
    [0.843, 1.055],
  ],
  paper,
);
seam.geometry.dispose();
seam.geometry = new THREE.LatheGeometry(
  [new THREE.Vector2(0.644, -1.08), new THREE.Vector2(0.843, 1.055)],
  2,
  Math.PI / 2,
  0.012,
);
const body = root.getObjectByName("Paper_body");
const uv = body.geometry.attributes.uv;
const pos = body.geometry.attributes.position;
for (let i = 0; i < uv.count; i++) uv.setY(i, (pos.getY(i) + 1.14) / 2.235);
uv.needsUpdate = true;
const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(root, { binary: true });
writeFileSync("public/models/velune-sage-study.glb", Buffer.from(glb));
let triangles = 0;
root.traverse((o) => {
  if (o.isMesh)
    triangles +=
      (o.geometry.index?.count || o.geometry.attributes.position.count) / 3;
});
console.log(
  JSON.stringify({
    asset: "velune-sage-study.glb",
    bytes: glb.byteLength,
    triangles,
    meshCount: root.children.length,
  }),
);
