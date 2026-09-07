export type Standard = {
  id: string;
  code: string;
  name: string;
  nameMn: string;
  description: string;
  color: string;
  icon: string;
  clauses: number;
};

export const STANDARDS: Standard[] = [
  {
    id: "iso9001",
    code: "ISO 9001:2015",
    name: "Quality Management",
    nameMn: "Чанарын Удирдлага",
    description: "Байгууллагын чанарын тогтолцоо, хэрэглэгчийн сэтгэл ханамж, тасралтгүй сайжруулалт",
    color: "bg-blue-600",
    icon: "◆",
    clauses: 10,
  },
  {
    id: "iso14001",
    code: "ISO 14001:2015",
    name: "Environmental Management",
    nameMn: "Байгаль Орчны Удирдлага",
    description: "Байгаль орчны нөлөөлөл, хууль эрх зүйн нийцэл, тогтвортой хөгжил",
    color: "bg-emerald-600",
    icon: "◈",
    clauses: 10,
  },
  {
    id: "iso45001",
    code: "ISO 45001:2018",
    name: "Occupational Health & Safety",
    nameMn: "Хөдөлмөрийн Аюулгүй Байдал",
    description: "Ажилтны эрүүл мэнд, аюулгүй байдал, эрсдэлийн удирдлага",
    color: "bg-orange-600",
    icon: "⬢",
    clauses: 10,
  },
  {
    id: "iso27001",
    code: "ISO 27001:2022",
    name: "Information Security",
    nameMn: "Мэдээллийн Аюулгүй Байдал",
    description: "Мэдээллийн аюулгүй байдал, эрсдэл, нууцлал, ISMS",
    color: "bg-slate-800",
    icon: "⬣",
    clauses: 10,
  },
  {
    id: "iso31000",
    code: "ISO 31000:2018",
    name: "Risk Management",
    nameMn: "Эрсдэлийн Удирдлага",
    description: "Эрсдэлийн үнэлгээ, удирдах зарчим, шийдвэр гаргалт",
    color: "bg-amber-600",
    icon: "⬔",
    clauses: 6,
  },
  {
    id: "iso19011",
    code: "ISO 19011:2018",
    name: "Auditing Guidelines",
    nameMn: "Аудитын Удирдамж",
    description: "Дотоод аудит, аудитын хөтөлбөр, аудиторын ур чадвар",
    color: "bg-violet-600",
    icon: "⟡",
    clauses: 7,
  },
];

export const IMS_BENEFITS = [
  { title: "Нэгдсэн бодлого", desc: "Бүх стандартын шаардлагыг нэг системд нэгтгэх" },
  { title: "Эрсдэлд суурилсан сэтгэлгээ", desc: "Урьдчилан сэргийлэх, боломжийг ашиглах" },
  { title: "Баримтжуулалт", desc: "Баримт бичиг, бүртгэлийн цахим удирдлага" },
  { title: "Тасралтгүй сайжруулалт", desc: "PDCA цикл, KPI, дотоод аудит" },
];
