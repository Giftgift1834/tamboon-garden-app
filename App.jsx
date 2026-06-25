import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  LayoutDashboard,
  FolderKanban,
  Building2,
  TrendingUp,
  TrendingDown,
  Receipt,
  Briefcase,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  User,
  MapPin,
  Phone,
  Heart,
  Hash,
  FileText,
  Search,
  Plus,
  History,
  ChevronDown,
  Calendar,
  Copy,
  DollarSign,
  ClipboardList,
  HardHat,
  Users,
  Check,
  CheckCircle2,
  Camera,
  Upload,
  Trash2,
  Bell,
  Printer,
  X,
  UserPlus,
  CreditCard,
  Eye,
  AlertTriangle,
  Clock,
} from 'lucide-react';

/* ============================================================
   THEME — "Tamboon Garden" : night-moss canvas, sage growth,
   temple-gold for finance, restrained terracotta for alerts.
   Sarabun (the Thai official-document typeface) ties the
   identity directly to invoices / tax IDs at the heart of
   this system. JetBrains Mono carries figures & document IDs.
   ============================================================ */
const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

    /* ============================================================
       PALETTE — Lavender & Slate, light + minimal
       --sage  = primary accent (lavender)   — active / growth
       --gold  = financial accent (soft amber) — money / pending
       --rust  = alert accent (soft rose)    — overdue / urgent
       --mist  = info accent (slate blue)    — secondary / done
       --bone  = primary text (deep plum-slate)
       --moss  = muted text (lavender-grey)
       ============================================================ */
    :root {
      --ink: #EFF1E8;
      --panel: #FFFFFF;
      --line: rgba(90,100,70,0.12);
      --line-strong: rgba(90,100,70,0.22);
      --bone: #4A4F40;
      --moss: #9A9E8D;
      --sage: #D98E5C;
      --sage-soft: rgba(217,142,92,0.14);
      --gold: #C9A227;
      --gold-soft: rgba(201,162,39,0.15);
      --rust: #C0604A;
      --rust-soft: rgba(192,96,74,0.14);
      --mist: #8A9B6E;
      --mist-soft: rgba(138,155,110,0.16);
    }

    .tg-app {
      font-family: 'Sarabun', 'Noto Sans Thai', sans-serif;
      background-color: var(--ink);
      color: var(--bone);
      background-image:
        radial-gradient(ellipse 1000px 800px at 88% -8%, rgba(154,158,141,0.35), transparent 60%),
        radial-gradient(ellipse 900px 700px at -10% 105%, rgba(217,142,92,0.12), transparent 60%),
        linear-gradient(160deg, #F4F5EE 0%, #EFF1E8 45%, #E7E9DC 100%);
      background-attachment: fixed;
    }
    .tg-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .tg-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
    .tg-scroll::-webkit-scrollbar-track { background: transparent; }
    .tg-scroll::-webkit-scrollbar-thumb { background: var(--line-strong); border-radius: 9999px; }
    .tg-scroll::-webkit-scrollbar-thumb:hover { background: var(--moss); }

    .tg-panel {
      background-color: var(--panel);
      border: 1px solid var(--line);
      border-radius: 1rem;
      box-shadow: 0 1px 2px rgba(120,80,40,0.04), 0 10px 28px -16px rgba(120,80,40,0.14);
    }

    .tg-focus:focus-visible {
      outline: 2px solid var(--sage);
      outline-offset: 2px;
      border-radius: 0.5rem;
    }

    .tg-nav-idle { border: 1px solid transparent; color: var(--moss); }
    .tg-nav-idle:hover { background: rgba(217,142,92,0.07); color: var(--bone); }
    .tg-nav-active { background: var(--sage-soft); border: 1px solid rgba(217,142,92,0.25); }

    .tg-input {
      background: #FBFAFE;
      border: 1px solid var(--line);
      border-radius: 0.625rem;
      color: var(--bone);
      transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
    }
    .tg-input:focus { border-color: rgba(217,142,92,0.45); background: #FFFFFF; outline: none; box-shadow: 0 0 0 3px rgba(217,142,92,0.12); }
    .tg-input::placeholder { color: var(--moss); opacity: 0.8; }
    .tg-select { appearance: none; -webkit-appearance: none; cursor: pointer; }

    /* Reliable side-by-side layout (independent of Tailwind's grid utilities) */
    .tg-split { display: flex; flex-direction: column; gap: 1.25rem; align-items: stretch; }
    .tg-split > * { width: 100%; min-width: 0; }
    @media (min-width: 860px) {
      .tg-split { flex-direction: row; }
      .tg-split.tg-58-42 > *:nth-child(1) { width: 58%; flex-shrink: 0; }
      .tg-split.tg-58-42 > *:nth-child(2) { width: calc(42% - 1.25rem); flex-shrink: 0; }
      .tg-split.tg-25-75 > *:nth-child(1) { width: 26%; flex-shrink: 0; }
      .tg-split.tg-25-75 > *:nth-child(2) { width: calc(74% - 1.25rem); flex-shrink: 0; }
      .tg-split.tg-50-50 > *:nth-child(1) { width: 50%; flex-shrink: 0; }
      .tg-split.tg-50-50 > *:nth-child(2) { width: calc(50% - 1.25rem); flex-shrink: 0; }
      .tg-split.tg-60-40 > *:nth-child(1) { width: 63%; flex-shrink: 0; }
      .tg-split.tg-60-40 > *:nth-child(2) { width: calc(37% - 1.25rem); flex-shrink: 0; }
    }
    @media (min-width: 900px) {
      .tg-split.tg-85-15 { flex-direction: row; }
      .tg-split.tg-85-15 > *:nth-child(1) { width: 70%; flex-shrink: 0; }
      .tg-split.tg-85-15 > *:nth-child(2) { width: calc(30% - 1.25rem); flex-shrink: 0; }
      .tg-split.tg-15-85 { flex-direction: row; }
      .tg-split.tg-15-85 > *:nth-child(1) { width: calc(30% - 1.25rem); flex-shrink: 0; }
      .tg-split.tg-15-85 > *:nth-child(2) { width: 70%; flex-shrink: 0; }
    }

    /* Document preview: customer-info block aligned to line-items table columns */
    .tg-doc-info { display: flex; gap: 0 1.5rem; margin-bottom: 1.25rem; font-size: 0.875rem; }
    .tg-doc-left { width: 66%; }
    .tg-doc-right { width: calc(34% - 1.5rem); }
    .tg-doc-row { display: grid; grid-template-columns: 68px 1fr; gap: 0.5rem; padding: 0.1rem 0; align-items: baseline; }
    .tg-doc-right .tg-doc-row { grid-template-columns: 72px 1fr; }
    .tg-select option { background: var(--panel); color: var(--bone); }

    .tg-badge {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.25rem 0.625rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 500; border: 1px solid transparent; white-space: nowrap;
    }
    .tg-badge-sage { background: var(--sage-soft); color: var(--sage); border-color: rgba(217,142,92,0.25); }
    .tg-badge-gold { background: var(--gold-soft); color: var(--gold); border-color: rgba(201,162,39,0.3); }
    .tg-badge-rust { background: var(--rust-soft); color: var(--rust); border-color: rgba(192,96,74,0.3); }
    .tg-badge-mist { background: var(--mist-soft); color: var(--mist); border-color: rgba(138,155,110,0.3); }

    .tg-row { transition: background-color 0.15s ease; }
    .tg-row:hover { background: rgba(217,142,92,0.05); }

    @keyframes tg-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .tg-emblem-spin { animation: tg-spin 220s linear infinite; transform-origin: 50% 50%; }
    @media (prefers-reduced-motion: reduce) { .tg-emblem-spin { animation: none; } }

    .tg-navbtn { transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease; }

    /* dropdown menu used by ProjectSearchSelect */
    .tg-menu {
      position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 30;
      background: var(--panel); border: 1px solid var(--line-strong); border-radius: 0.75rem;
      box-shadow: 0 12px 32px -12px rgba(120,80,40,0.25);
      max-height: 260px; overflow-y: auto;
    }
    .tg-menu-item { padding: 0.55rem 0.85rem; font-size: 0.8125rem; cursor: pointer; color: var(--bone); }
    .tg-menu-item:hover, .tg-menu-item-active { background: var(--sage-soft); color: var(--sage); }

    /* print preview modal */
    .tg-modal-backdrop {
      position: fixed; inset: 0; z-index: 50; padding: 1.5rem;
      background: rgba(110,80,55,0.45); backdrop-filter: blur(2px);
      display: flex; align-items: flex-start; justify-content: center; overflow-y: auto;
    }
    @media print {
      * { visibility: hidden !important; }
      .tg-print-area, .tg-print-area * { visibility: visible !important; }
      .tg-modal-backdrop { position: static !important; background: transparent !important; backdrop-filter: none !important; padding: 0 !important; }
      .tg-print-area { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; max-width: 100% !important; height: auto !important; max-height: none !important; overflow: visible !important; box-shadow: none !important; border: none !important; padding: 24px !important; margin: 0 !important; background: #fff !important; }
      .tg-noprint { display: none !important; visibility: hidden !important; }
      .tg-doc-copy { page-break-before: always; border-top: none !important; margin-top: 0 !important; padding-top: 0 !important; }
    }
  `}</style>
);

/* JS color tokens (for recharts SVG props, independent of Tailwind) */
const C = {
  sage: '#D98E5C',
  gold: '#C9A227',
  moss: '#9A9E8D',
  line: 'rgba(90,100,70,0.14)',
};

/* ============================================================
   BRAND MARK — from the "แต้มบุญ การ์เด้น" logo: a root/branch
   system radiating from a center, ringed by a circle, framed by
   an upward triangle. Used small (sidebar/card) and large
   (watermark). Drawn in currentColor for theme-aware tinting.
   ============================================================ */
const BRANCHMARK_LOGO = "data:image/png;base64,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";

const BranchMark = ({ className = '', spin = false, style = {}, ...rest }) => (
  <img
    src={BRANCHMARK_LOGO}
    alt=""
    className={`${className} ${spin ? 'tg-emblem-spin' : ''}`}
    style={{ objectFit: 'contain', ...style }}
    {...rest}
  />
);


/* ============================================================
   MOCK DATA
   ============================================================ */
const ENTITIES = {
  entity1: {
    label: 'Entity 1',
    name: 'บริษัท แต้มบุญ การ์เด้น จำกัด',
    nameEn: 'TAMBOON GARDEN COMPANY LIMITED',
    branch: 'สำนักงานใหญ่',
    address: '59/54 หมู่ที่ 4 ต.ลำโพ อ.บางบัวทอง จ.นนทบุรี 11110',
    addressEn: '59/54 Moo 4 Lampho Bangbuathong Nonthaburi 11110',
    taxId: '0125567005147',
    signatory: 'นางสาวพัชราภรณ์ ยอดสิน',
    phone: '086-824-1872',
  },
  entity2: {
    label: 'Entity 2',
    name: '— ยังไม่ระบุชื่อนิติบุคคล —',
    nameEn: '',
    branch: 'บริษัทอื่น / ซับคอนแทรค',
    address: '— ยังไม่ระบุที่อยู่ —',
    addressEn: '',
    taxId: '— ยังไม่ระบุ —',
    signatory: '— ยังไม่ระบุ —',
    phone: '—',
  },
};

const revenueData = [
  { month: 'ม.ค.', actual: 2.85 },
  { month: 'ก.พ.', actual: 3.12 },
  { month: 'มี.ค.', actual: 3.68 },
  { month: 'เม.ย.', actual: 3.41 },
  { month: 'พ.ค.', actual: 4.05 },
  { month: 'มิ.ย.', actual: 4.42, forecast: 4.42 },
  { month: 'ก.ค.', forecast: 4.20 },
  { month: 'ส.ค.', forecast: 4.55 },
  { month: 'ก.ย.', forecast: 4.80 },
  { month: 'ต.ค.', forecast: 5.10 },
  { month: 'พ.ย.', forecast: 4.95 },
  { month: 'ธ.ค.', forecast: 5.65 },
];

const projectsData = [
  /* ── นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์ (3 โครงการ) ── */
  {
    id: 'PRJ-001',
    name: 'จัดสวนคอนโดมิเนียม The Palm Residence (เฟส 1)',
    customer: 'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์',
    contact: 'คุณวิภาวี ตันติวงศ์ (ผู้จัดการนิติบุคคล)',
    address: '99/12 ซอยสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
    taxId: '0105558112233',
    entity: 'entity1', status: 'active', value: 1250000, start: '01/03/2026',
  },
  {
    id: 'PRJ-001B',
    name: 'บำรุงรักษาสวนรายเดือน The Palm Residence',
    customer: 'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์',
    contact: 'คุณวิภาวี ตันติวงศ์ (ผู้จัดการนิติบุคคล)',
    address: '99/12 ซอยสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
    taxId: '0105558112233',
    entity: 'entity1', status: 'active', value: 360000, start: '01/04/2026',
  },
  {
    id: 'PRJ-001C',
    name: 'ปรับปรุงสวนหย่อมชั้น 3 The Palm Residence',
    customer: 'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์',
    contact: 'คุณวิภาวี ตันติวงศ์ (ผู้จัดการนิติบุคคล)',
    address: '99/12 ซอยสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110',
    taxId: '0105558112233',
    entity: 'entity1', status: 'pending', value: 180000, start: '01/08/2026',
  },

  /* ── บริษัท กรีนพาวเวอร์ จำกัด (มหาชน) (3 โครงการ) ── */
  {
    id: 'PRJ-002',
    name: 'ดูแลภูมิทัศน์สำนักงานใหญ่ กรีนพาวเวอร์',
    customer: 'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)',
    contact: 'คุณธนกร ศรีสุข (ฝ่ายจัดซื้อ)',
    address: '1 อาคารกรีนพาวเวอร์ ถ.วิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
    taxId: '0107558445566',
    entity: 'entity1', status: 'active', value: 480000, start: '15/01/2026',
  },
  {
    id: 'PRJ-002B',
    name: 'จัดสวนแผนกต้อนรับ กรีนพาวเวอร์ (โรงงานบางปู)',
    customer: 'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)',
    contact: 'คุณธนกร ศรีสุข (ฝ่ายจัดซื้อ)',
    address: '88/8 ถ.สุขุมวิท ต.บางปูใหม่ อ.เมือง จ.สมุทรปราการ 10280',
    taxId: '0107558445566',
    entity: 'entity1', status: 'completed', value: 220000, start: '01/10/2025',
  },
  {
    id: 'PRJ-002C',
    name: 'ติดตั้งระบบรดน้ำอัตโนมัติ กรีนพาวเวอร์ สำนักงานใหญ่',
    customer: 'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)',
    contact: 'คุณธนกร ศรีสุข (ฝ่ายจัดซื้อ)',
    address: '1 อาคารกรีนพาวเวอร์ ถ.วิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
    taxId: '0107558445566',
    entity: 'entity1', status: 'active', value: 145000, start: '01/05/2026',
  },

  /* ── บริษัท ริเวอร์ไซด์ โฮเทล จำกัด (2 โครงการ) ── */
  {
    id: 'PRJ-003',
    name: 'จัดสวนแนวตั้ง โรงแรมริเวอร์ไซด์',
    customer: 'บริษัท ริเวอร์ไซด์ โฮเทล จำกัด',
    contact: 'คุณมานพ เจริญสุข (วิศวกรอาคาร)',
    address: '88 ถ.เจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร 10600',
    taxId: '0105561223344',
    entity: 'entity2', status: 'completed', value: 890000, start: '10/11/2025',
  },
  {
    id: 'PRJ-003B',
    name: 'ดูแลสวนรายเดือน โรงแรมริเวอร์ไซด์',
    customer: 'บริษัท ริเวอร์ไซด์ โฮเทล จำกัด',
    contact: 'คุณมานพ เจริญสุข (วิศวกรอาคาร)',
    address: '88 ถ.เจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร 10600',
    taxId: '0105561223344',
    entity: 'entity2', status: 'active', value: 96000, start: '01/03/2026',
  },

  /* ── นิติบุคคลหมู่บ้านจัดสรร เดอะแกรนด์ วิลเลจ (2 โครงการ) ── */
  {
    id: 'PRJ-004',
    name: 'ปรับภูมิทัศน์สวนส่วนกลาง เดอะแกรนด์ วิลเลจ',
    customer: 'นิติบุคคลหมู่บ้านจัดสรร เดอะแกรนด์ วิลเลจ',
    contact: 'คุณสุนทรี พรหมมา (ประธานนิติบุคคล)',
    address: '55/8 หมู่ 4 ถ.บางนา-ตราด กม.12 ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540',
    taxId: '0135562778899',
    entity: 'entity1', status: 'pending', value: 650000, start: '01/07/2026',
  },
  {
    id: 'PRJ-004B',
    name: 'ปลูกต้นไม้แนวรั้ว เดอะแกรนด์ วิลเลจ',
    customer: 'นิติบุคคลหมู่บ้านจัดสรร เดอะแกรนด์ วิลเลจ',
    contact: 'คุณสุนทรี พรหมมา (ประธานนิติบุคคล)',
    address: '55/8 หมู่ 4 ถ.บางนา-ตราด กม.12 ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540',
    taxId: '0135562778899',
    entity: 'entity1', status: 'active', value: 285000, start: '15/05/2026',
  },

  /* ── คุณอนันต์ วงศ์ไพศาล (2 โครงการ) ── */
  {
    id: 'PRJ-005',
    name: 'จัดสวน Pool Villa เขาใหญ่',
    customer: 'คุณอนันต์ วงศ์ไพศาล',
    contact: 'คุณอนันต์ วงศ์ไพศาล (เจ้าของบ้าน)',
    address: '120 หมู่ 7 ต.โป่งตาลอง อ.ปากช่อง จ.นครราชสีมา 30130',
    taxId: '3100501234567',
    entity: 'entity2', status: 'active', value: 320000, start: '20/04/2026',
  },
  {
    id: 'PRJ-005B',
    name: 'บำรุงรักษาสวน Pool Villa เขาใหญ่ (รายปี)',
    customer: 'คุณอนันต์ วงศ์ไพศาล',
    contact: 'คุณอนันต์ วงศ์ไพศาล (เจ้าของบ้าน)',
    address: '120 หมู่ 7 ต.โป่งตาลอง อ.ปากช่อง จ.นครราชสีมา 30130',
    taxId: '3100501234567',
    entity: 'entity2', status: 'active', value: 84000, start: '01/06/2026',
  },

  /* ── บริษัท ซี.ดับเบิ้ลยู. ทาวเวอร์ จำกัด (2 โครงการ) ── */
  {
    id: 'PRJ-006',
    name: 'บำรุงรักษาสวนรายเดือน CW Tower',
    customer: 'บริษัท ซี.ดับเบิ้ลยู. ทาวเวอร์ จำกัด',
    contact: 'คุณกัลยา ทองดี (ฝ่ายอาคารสถานที่)',
    address: '90 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
    taxId: '0105563998877',
    entity: 'entity1', status: 'active', value: 180000, start: '01/01/2026',
  },
  {
    id: 'PRJ-006B',
    name: 'จัดสวนลอฟต์บาร์ ชั้น 25 CW Tower',
    customer: 'บริษัท ซี.ดับเบิ้ลยู. ทาวเวอร์ จำกัด',
    contact: 'คุณกัลยา ทองดี (ฝ่ายอาคารสถานที่)',
    address: '90 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
    taxId: '0105563998877',
    entity: 'entity1', status: 'completed', value: 430000, start: '15/02/2026',
  },
];

const outstandingByProject = [
  {
    projectId: 'PRJ-001',
    projectName: 'จัดสวนคอนโดมิเนียม The Palm Residence',
    items: [
      { doc: 'BL2026-0128', issued: '25/04/2026', due: '25/05/2026', amount: 185000, status: 'overdue' },
      { doc: 'BL2026-0158', issued: '01/06/2026', due: '01/07/2026', amount: 220000, status: 'pending' },
    ],
  },
  {
    projectId: 'PRJ-002',
    projectName: 'ดูแลภูมิทัศน์สำนักงานใหญ่ กรีนพาวเวอร์',
    items: [
      { doc: 'BL2026-0149', issued: '20/05/2026', due: '14/06/2026', amount: 95000, status: 'due_soon' },
    ],
  },
  {
    projectId: 'PRJ-005',
    projectName: 'จัดสวน Pool Villa เขาใหญ่',
    items: [
      { doc: 'BL2026-0151', issued: '22/05/2026', due: '21/06/2026', amount: 160000, status: 'pending' },
    ],
  },
  {
    projectId: 'PRJ-006',
    projectName: 'บำรุงรักษาสวนรายเดือน CW Tower',
    items: [
      { doc: 'BL2026-0102', issued: '01/05/2026', due: '31/05/2026', amount: 30000, status: 'overdue' },
      { doc: 'BL2026-0160', issued: '01/06/2026', due: '30/06/2026', amount: 30000, status: 'pending' },
    ],
  },
];

const revisionHistoryData = {
  'PRJ-001': [
    { date: '10 มิ.ย. 2026', time: '14:32', user: 'อรทัย พ.', action: 'ออกใบวางบิลเลขที่ BL2026-0158', type: 'create' },
    { date: '02 มิ.ย. 2026', time: '09:15', user: 'สมชาย ใ.', action: 'แก้ไขที่อยู่จัดส่งเอกสาร', type: 'edit' },
    { date: '28 พ.ค. 2026', time: '16:40', user: 'อรทัย พ.', action: 'อัปเดตชื่อผู้ติดต่อหลัก', type: 'edit' },
    { date: '15 พ.ค. 2026', time: '11:02', user: 'ระบบ', action: 'ออกใบวางบิลเลขที่ BL2026-0128', type: 'create' },
    { date: '03 มี.ค. 2026', time: '10:00', user: 'สมชาย ใ.', action: 'สร้างโครงการใหม่ในระบบ', type: 'create' },
  ],
  'PRJ-002': [
    { date: '20 พ.ค. 2026', time: '13:20', user: 'ระบบ', action: 'ออกใบวางบิลเลขที่ BL2026-0149', type: 'create' },
    { date: '15 ม.ค. 2026', time: '09:30', user: 'ธนกร ศ.', action: 'สร้างโครงการใหม่ในระบบ', type: 'create' },
  ],
  'PRJ-003': [
    { date: '28 ก.พ. 2026', time: '17:00', user: 'มานพ จ.', action: 'ปิดโครงการ — งานเสร็จสมบูรณ์', type: 'edit' },
    { date: '12 พ.ย. 2025', time: '10:45', user: 'สมชาย ใ.', action: 'เปลี่ยนนิติบุคคลผู้ออกเอกสารเป็น Entity 2', type: 'edit' },
    { date: '10 พ.ย. 2025', time: '09:00', user: 'สมชาย ใ.', action: 'สร้างโครงการใหม่ในระบบ', type: 'create' },
  ],
  'PRJ-004': [
    { date: '05 มิ.ย. 2026', time: '11:20', user: 'สุนทรี พ.', action: 'สร้างโครงการใหม่ในระบบ', type: 'create' },
  ],
  'PRJ-005': [
    { date: '23 พ.ค. 2026', time: '15:10', user: 'ระบบ', action: 'ออกใบวางบิลเลขที่ BL2026-0151', type: 'create' },
    { date: '20 เม.ย. 2026', time: '08:30', user: 'อรทัย พ.', action: 'สร้างโครงการใหม่ในระบบ', type: 'create' },
  ],
  'PRJ-006': [
    { date: '01 มิ.ย. 2026', time: '08:00', user: 'ระบบ', action: 'ออกใบวางบิลรายเดือนเลขที่ BL2026-0160', type: 'create' },
    { date: '01 ม.ค. 2026', time: '08:00', user: 'กัลยา ท.', action: 'สร้างสัญญาบำรุงรักษารายเดือน', type: 'create' },
  ],
};

/* ============================================================
   DOCUMENT FLOW DATA — ใบเสนอราคา > ใบวางบิล > ใบกำกับภาษี > ใบเสร็จรับเงิน
   ============================================================ */
const DOC_STAGES = [
  { key: 'quotation', label: 'ใบเสนอราคา' },
  { key: 'billing', label: 'ใบวางบิล/ใบแจ้งหนี้' },
  { key: 'tax_invoice', label: 'ใบกำกับภาษี' },
  { key: 'receipt', label: 'ใบเสร็จรับเงิน' },
];

/* document title / total-row label as printed on each form (per docx) */
const DOC_TITLES = {
  quotation: 'ใบเสนอราคา',
  billing: 'ใบวางบิล/ใบแจ้งหนี้',
  tax_invoice: 'ใบกำกับภาษี',
  receipt: 'ใบเสร็จรับเงิน',
};
const DOC_TITLES_EN = {
  quotation: 'QUOTATION',
  billing: 'BILLING NOTE / INVOICE',
  tax_invoice: 'TAX INVOICE',
  receipt: 'RECEIPT',
};
const DOC_SIGNATORY_ROLE = {
  quotation: 'ผู้เสนอราคา',
  billing: 'ผู้วางบิล',
  tax_invoice: 'ผู้ออกใบกำกับภาษี',
  receipt: 'ผู้รับเงิน',
};
const DOC_TOTAL_LABEL = {
  quotation: 'ยอดสุทธิ',
  billing: 'ยอดรวมทั้งสิ้น',
  tax_invoice: 'ยอดรวมทั้งสิ้น',
  receipt: 'ยอดรับสุทธิ',
};

const parseThDate = (str) => {
  if (!str) return new Date(0);
  const [d, m, y] = str.split('/').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
};

/* รวมเงิน -> ค่าดำเนินการ 10% -> ยอดก่อนภาษี -> VAT 7% -> หัก ณ ที่จ่าย 3% -> ยอดสุทธิ */
const DEFAULT_CHARGES = { opFee: true, wht: true, vat: true };
const calcDocAmounts = (base, charges = DEFAULT_CHARGES) => {
  const useOpFee = charges.opFee !== false;
  const useWht = charges.wht !== false;
  const useVat = charges.vat !== false;
  const opFee = useOpFee ? base * 0.10 : 0;
  const afterFee = base + opFee;
  const vat = useVat ? afterFee * 0.07 : 0;
  const wht = useWht ? afterFee * 0.03 : 0;
  const net = afterFee + vat - wht;
  return {
    base: Math.round(base),
    opFee: Math.round(opFee),
    afterFee: Math.round(afterFee),
    vat: Math.round(vat),
    wht: Math.round(wht),
    net: Math.round(net),
  };
};

const documentsData = [
  {
    id: 'DOC-001',
    projectId: 'PRJ-001',
    projectName: 'จัดสวนคอนโดมิเนียม The Palm Residence',
    customer: 'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์',
    entity: 'entity1',
    currentStage: 'receipt',
    base: 200000,
    docNos: { quotation: 'QT2026-0089', billing: 'BL2026-0158', tax_invoice: 'INV2026-0142', receipt: 'RC2026-0098' },
    docDates: { quotation: '20/05/2026', billing: '01/06/2026', tax_invoice: '05/06/2026', receipt: '11/06/2026' },
    validity: '30 วัน', rev: '0', dueDate: '01/07/2026', payMethod: 'โอนเงินผ่านธนาคาร',
    lineItems: [
      { id: 1, description: 'ปลูกต้นไม้ใหญ่พร้อมตกแต่งภูมิทัศน์ส่วนกลาง', qty: 1, unit: 'งาน', price: 120000 },
      { id: 2, description: 'ติดตั้งระบบสปริงเกอร์อัตโนมัติ', qty: 1, unit: 'ระบบ', price: 50000 },
      { id: 3, description: 'ดินปลูกผสมปุ๋ยหมักและวัสดุตกแต่ง', qty: 1, unit: 'ชุด', price: 30000 },
    ],
  },
  {
    id: 'DOC-002',
    projectId: 'PRJ-002',
    projectName: 'ดูแลภูมิทัศน์สำนักงานใหญ่ กรีนพาวเวอร์',
    customer: 'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)',
    entity: 'entity1',
    currentStage: 'tax_invoice',
    base: 95000,
    docNos: { quotation: 'QT2026-0091', billing: 'BL2026-0149', tax_invoice: 'INV2026-0138', receipt: null },
    docDates: { quotation: '10/05/2026', billing: '20/05/2026', tax_invoice: '08/06/2026', receipt: null },
    validity: '15 วัน', rev: '0', dueDate: '14/06/2026', payMethod: 'โอนเงินผ่านธนาคาร',
    lineItems: [
      { id: 1, description: 'ดูแลภูมิทัศน์รายเดือน — พฤษภาคม 2026', qty: 1, unit: 'เดือน', price: 95000 },
    ],
  },
  {
    id: 'DOC-003',
    projectId: 'PRJ-005',
    projectName: 'จัดสวน Pool Villa เขาใหญ่',
    customer: 'คุณอนันต์ วงศ์ไพศาล',
    entity: 'entity2',
    currentStage: 'billing',
    base: 160000,
    docNos: { quotation: 'QT2026-0095', billing: 'BL2026-0151', tax_invoice: null, receipt: null },
    docDates: { quotation: '15/05/2026', billing: '22/05/2026', tax_invoice: null, receipt: null },
    validity: '20 วัน', rev: '1', dueDate: '21/06/2026', payMethod: 'เงินสด',
    lineItems: [
      { id: 1, description: 'จัดสวน Pool Villa พร้อมไม้ประดับนำเข้า', qty: 1, unit: 'งาน', price: 130000 },
      { id: 2, description: 'ติดตั้งระบบไฟส่องสว่างในสวน', qty: 1, unit: 'ระบบ', price: 30000 },
    ],
  },
  {
    id: 'DOC-004',
    projectId: 'PRJ-004',
    projectName: 'ปรับภูมิทัศน์สวนส่วนกลาง เดอะแกรนด์ วิลเลจ',
    customer: 'นิติบุคคลหมู่บ้านจัดสรร เดอะแกรนด์ วิลเลจ',
    entity: 'entity1',
    currentStage: 'quotation',
    base: 650000,
    docNos: { quotation: 'QT2026-0102', billing: null, tax_invoice: null, receipt: null },
    docDates: { quotation: '08/06/2026', billing: null, tax_invoice: null, receipt: null },
    validity: '30 วัน', rev: '0', dueDate: '', payMethod: '',
    lineItems: [
      { id: 1, description: 'ปรับภูมิทัศน์สวนส่วนกลางทั้งหมด (พื้นที่ 2,400 ตร.ม.)', qty: 1, unit: 'งาน', price: 580000 },
      { id: 2, description: 'ติดตั้งระบบรดน้ำอัตโนมัติทั่วโครงการ', qty: 1, unit: 'ระบบ', price: 70000 },
    ],
  },
  {
    id: 'DOC-005',
    projectId: 'PRJ-006',
    projectName: 'บำรุงรักษาสวนรายเดือน CW Tower',
    customer: 'บริษัท ซี.ดับเบิ้ลยู. ทาวเวอร์ จำกัด',
    entity: 'entity1',
    currentStage: 'receipt',
    base: 30000,
    docNos: { quotation: 'QT2026-0080', billing: 'BL2026-0160', tax_invoice: 'INV2026-0150', receipt: 'RC2026-0099' },
    docDates: { quotation: '25/05/2026', billing: '01/06/2026', tax_invoice: '03/06/2026', receipt: '10/06/2026' },
    validity: '15 วัน', rev: '0', dueDate: '30/06/2026', payMethod: 'โอนเงินผ่านธนาคาร',
    lineItems: [
      { id: 1, description: 'บำรุงรักษาสวนรายเดือน — มิถุนายน 2026', qty: 1, unit: 'เดือน', price: 30000 },
    ],
  },
];

/* แปลงจำนวนเงินเป็นตัวอักษรภาษาไทย (สำหรับช่อง Thai_Baht_Text) */
const TH_DIGIT = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
const TH_POS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน'];
const thaiIntText = (num) => {
  if (num === 0) return 'ศูนย์';
  if (num >= 1000000) {
    const million = Math.floor(num / 1000000);
    const rest = num % 1000000;
    return thaiIntText(million) + 'ล้าน' + (rest > 0 ? thaiIntText(rest) : '');
  }
  let out = '';
  const s = String(num);
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const digit = parseInt(s[i], 10);
    const pos = len - i - 1;
    if (digit === 0) continue;
    if (pos === 0 && digit === 1 && len > 1) out += 'เอ็ด';
    else if (pos === 1 && digit === 1) out += 'สิบ';
    else if (pos === 1 && digit === 2) out += 'ยี่สิบ';
    else out += TH_DIGIT[digit] + TH_POS[pos];
  }
  return out;
};
const bahtText = (amount) => {
  const rounded = Math.round(amount * 100) / 100;
  const baht = Math.floor(rounded);
  const satang = Math.round((rounded - baht) * 100);
  let text = (baht === 0 ? 'ศูนย์' : thaiIntText(baht)) + 'บาท';
  text += satang === 0 ? 'ถ้วน' : thaiIntText(satang) + 'สตางค์';
  return text;
};

/* ============================================================
   HR — TEMPORARY EMPLOYEES
   ============================================================ */
const employeeStatusMap = {
  active: { label: 'กำลังปฏิบัติงาน', cls: 'tg-badge-sage' },
  leave: { label: 'ลาพัก', cls: 'tg-badge-gold' },
  ended: { label: 'สิ้นสุดสัญญา', cls: 'tg-badge-mist' },
};

const employeesData = [
  {
    id: 'EMP-2026-014',
    name: 'นายอนุชา แก้วมณี',
    nickname: 'ตูน',
    position: 'ช่างจัดสวนอาวุโส',
    site: 'The Palm Residence', projectId: 'PRJ-001',
    phone: '081-234-5678',
    start: '15/02/2026',
    contractEnd: '14/02/2027',
    status: 'active',
    blood: 'O',
    emergencyContact: 'นางสมศรี แก้วมณี (มารดา) · 089-111-2233',
  },
  {
    id: 'EMP-2026-015',
    name: 'นางสาวพิมพ์ชนก หอมจันทร์',
    nickname: 'ฝ้าย',
    position: 'ผู้ช่วยช่างจัดสวน',
    site: 'กรีนพาวเวอร์', projectId: 'PRJ-002',
    phone: '089-876-5432',
    start: '01/03/2026',
    contractEnd: '28/02/2027',
    status: 'active',
    blood: 'A',
    emergencyContact: 'นายสมหวัง หอมจันทร์ (บิดา) · 081-222-3344',
  },
  {
    id: 'EMP-2026-016',
    name: 'นายสมพงษ์ เรืองศรี',
    nickname: 'หมู',
    position: 'หัวหน้าทีมภูมิทัศน์',
    site: 'CW Tower', projectId: 'PRJ-006',
    phone: '062-345-6789',
    start: '01/01/2026',
    contractEnd: '31/12/2026',
    status: 'active',
    blood: 'B',
    emergencyContact: 'นางวันดี เรืองศรี (ภรรยา) · 062-999-8877',
  },
  {
    id: 'EMP-2026-017',
    name: 'นายวิชัย ทองสุข',
    nickname: 'ชัย',
    position: 'พนักงานขับรถ',
    site: 'ทุกไซต์งาน', projectId: null,
    phone: '095-123-4567',
    start: '10/04/2026',
    contractEnd: '09/04/2027',
    status: 'leave',
    blood: 'AB',
    emergencyContact: 'นางสาวอำไพ ทองสุข (น้องสาว) · 095-555-6677',
  },
  {
    id: 'EMP-2026-018',
    name: 'นางสาวรุ่งนภา ศิริวัฒน์',
    nickname: 'แนน',
    position: 'ผู้ช่วยช่างจัดสวน',
    site: 'Pool Villa เขาใหญ่', projectId: 'PRJ-005',
    phone: '086-555-1234',
    start: '20/04/2026',
    contractEnd: '19/10/2026',
    status: 'active',
    blood: 'O',
    emergencyContact: 'นายมานะ ศิริวัฒน์ (บิดา) · 086-444-5566',
  },
  {
    id: 'EMP-2025-009',
    name: 'นายประเสริฐ บุญมา',
    nickname: 'เสริฐ',
    position: 'ช่างซ่อมบำรุง',
    site: 'เดอะแกรนด์ วิลเลจ', projectId: 'PRJ-004',
    phone: '080-222-3344',
    start: '01/09/2025',
    contractEnd: '31/08/2026',
    status: 'ended',
    blood: 'A',
    emergencyContact: 'นางสายฝน บุญมา (ภรรยา) · 080-777-8899',
  },
];

/* derived KPI numbers */
const ytdRevenue = revenueData.filter((d) => d.actual !== undefined).reduce((s, d) => s + d.actual, 0);
const totalOutstanding = outstandingByProject.reduce((sum, g) => sum + g.items.reduce((s, i) => s + i.amount, 0), 0);
const totalOutstandingDocs = outstandingByProject.reduce((sum, g) => sum + g.items.length, 0);
const overdueDocs = outstandingByProject.reduce((sum, g) => sum + g.items.filter((i) => i.status === 'overdue').length, 0);
const activeProjects = projectsData.filter((p) => p.status === 'active');
const activeProjectsValue = activeProjects.reduce((s, p) => s + p.value, 0);
const totalPipelineValue = projectsData.reduce((s, p) => s + p.value, 0);

const fmtTHB = (n) => Math.round(n).toLocaleString('en-US');

/* การแจ้งเตือนเอกสาร/บิลใกล้ครบกำหนด (อ้างอิงวันที่ปัจจุบัน 11 มิ.ย. 2026) */
const TODAY = new Date(2026, 5, 11);
const billNotifications = outstandingByProject
  .flatMap((g) => g.items.map((item) => ({
    projectName: g.projectName,
    doc: item.doc,
    due: item.due,
    amount: item.amount,
    diffDays: Math.round((parseThDate(item.due) - TODAY) / 86400000),
  })))
  .sort((a, b) => a.diffDays - b.diffDays);

/* ============================================================
   SHARED UI PIECES
   ============================================================ */
const projectStatusMap = {
  active: { label: 'กำลังดำเนินการ', cls: 'tg-badge-sage' },
  completed: { label: 'เสร็จสิ้น', cls: 'tg-badge-mist' },
  pending: { label: 'รอเริ่มดำเนินการ', cls: 'tg-badge-gold' },
};

const docStatusMap = {
  overdue: { label: 'เลยกำหนดชำระ', cls: 'tg-badge-rust' },
  pending: { label: 'รอครบกำหนด', cls: 'tg-badge-gold' },
  due_soon: { label: 'ใกล้ครบกำหนด', cls: 'tg-badge-mist' },
};

const ProjectStatusBadge = ({ status }) => {
  const s = projectStatusMap[status];
  return (
    <span className={`tg-badge ${s.cls}`}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'currentColor', display: 'inline-block' }} />
      {s.label}
    </span>
  );
};

const DocStatusBadge = ({ status }) => {
  const s = docStatusMap[status];
  return <span className={`tg-badge ${s.cls}`}>{s.label}</span>;
};

const KPICard = ({ icon: Icon, label, value, sub, trend, accent, compact }) => (
  <div className={`tg-panel ${compact ? 'p-3.5' : 'p-5'}`}>
    <div className={`flex items-start justify-between ${compact ? 'mb-2.5' : 'mb-5'}`}>
      <div
        className={`rounded-xl flex items-center justify-center ${compact ? 'w-8 h-8' : 'w-10 h-10'}`}
        style={{ background: `var(--${accent}-soft)`, color: `var(--${accent})` }}
      >
        <Icon size={compact ? 15 : 18} strokeWidth={1.75} />
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: trend >= 0 ? 'var(--sage)' : 'var(--rust)' }}>
          {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className={`font-semibold tracking-tight truncate ${compact ? 'text-lg' : 'text-2xl'}`} style={{ color: 'var(--bone)' }}>{value}</div>
    <div className={`mt-1 truncate ${compact ? 'text-xs' : 'text-sm'}`} style={{ color: 'var(--moss)' }}>{label}</div>
    {sub && (
      <div className={`mt-${compact ? '2' : '3'} pt-${compact ? '2' : '3'} truncate ${compact ? 'text-xs' : 'text-xs'}`} style={{ color: 'var(--moss)', borderTop: '1px solid var(--line)' }}>
        {sub}
      </div>
    )}
  </div>
);

const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="tg-panel px-3.5 py-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.97)' }}>
      <p className="text-xs mb-1.5" style={{ color: 'var(--moss)' }}>{label} 2026</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-medium tg-mono" style={{ color: p.dataKey === 'actual' ? C.sage : C.gold }}>
          {p.dataKey === 'actual' ? 'รายได้จริง' : 'ประมาณการ'} {Number(p.value).toFixed(2)} ล้านบาท
        </p>
      ))}
    </div>
  );
};

/* ============================================================
   TOGGLE — small switch, used to include/exclude a charge
   ============================================================ */
const Toggle = ({ checked, onChange, label }) => (
  <label className="tg-focus flex items-center justify-between gap-3 cursor-pointer py-1.5">
    <span className="text-sm" style={{ color: 'var(--bone)' }}>{label}</span>
    <span
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        position: 'relative', width: 38, height: 22, borderRadius: 9999, flexShrink: 0,
        background: checked ? 'var(--sage)' : 'var(--line-strong)',
        transition: 'background-color 0.15s ease',
      }}
    >
      <span
        style={{
          position: 'absolute', top: 2, left: checked ? 18 : 2, width: 18, height: 18, borderRadius: '50%',
          background: '#fff', transition: 'left 0.15s ease', boxShadow: '0 1px 2px rgba(120,80,40,0.25)',
        }}
      />
    </span>
  </label>
);

// Helpers: convert between dd/mm/yyyy (our system) and yyyy-mm-dd (HTML date input)
const toIso = (dmy) => {
  if (!dmy) return '';
  // Already ISO format yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(dmy)) return dmy;
  // Convert dd/mm/yyyy → yyyy-mm-dd
  const [d, m, y] = dmy.split('/');
  if (!d || !m || !y) return '';
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
};
const toDmy = (iso) => {
  if (!iso) return '';
  // Already dd/mm/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(iso)) return iso;
  // Convert yyyy-mm-dd → dd/mm/yyyy
  const [y, m, d] = iso.split('-');
  if (!d || !m || !y) return iso;
  return `${d}/${m}/${y}`;
};

// Always display a date as dd/mm/yyyy regardless of how it's stored
const fmtDate = (val) => toDmy(toIso(val) || val);

const FormField = ({ label, value, onChange, icon: Icon, mono, area, full, placeholder, type }) => {
  const isDate = type === 'date';
  const controlled = typeof onChange === 'function';
  const displayValue = isDate ? toIso(value) : (value ?? '');
  const handleChange = isDate
    ? (e) => onChange && onChange({ ...e, target: { ...e.target, value: toDmy(e.target.value) } })
    : onChange;
  const common = {
    className: `tg-input tg-focus w-full px-3 py-2 text-sm ${mono ? 'tg-mono' : ''}`,
    placeholder,
    ...(controlled ? { value: displayValue, onChange: handleChange } : { defaultValue: displayValue }),
    ...(type === 'number' ? { onFocus: (e) => e.target.select() } : {}),
  };
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
        {Icon && <Icon size={12} strokeWidth={1.75} />}
        {label}
      </label>
      {area ? (
        <textarea {...common} rows={2} className={`${common.className} resize-none`} />
      ) : (
        <input {...common} type={type || 'text'} />
      )}
    </div>
  );
};

/* ============================================================
   DOCUMENT STEPPER — ใบเสนอราคา > ใบวางบิล > ใบกำกับภาษี > ใบเสร็จรับเงิน
   ============================================================ */
const DocumentStepper = ({ stage, docNos, docDates, compact }) => {
  const currentIdx = DOC_STAGES.findIndex((s) => s.key === stage);
  return (
    <div className="flex items-start">
      {DOC_STAGES.map((s, i) => {
        const state = i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'upcoming';
        const circleBg = state === 'current' ? 'var(--sage)' : state === 'done' ? 'var(--sage-soft)' : 'rgba(217,142,92,0.05)';
        const circleColor = state === 'current' ? 'var(--ink)' : state === 'done' ? 'var(--sage)' : 'var(--moss)';
        return (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center text-center" style={{ width: compact ? 'auto' : 92, flexShrink: 0 }}>
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: compact ? 18 : 32,
                  height: compact ? 18 : 32,
                  background: circleBg,
                  color: circleColor,
                  border: state === 'upcoming' ? '1px solid var(--line-strong)' : 'none',
                }}
              >
                {state === 'done' ? <Check size={compact ? 10 : 14} strokeWidth={2.5} /> : <span className="text-xs font-semibold">{i + 1}</span>}
              </div>
              {!compact && (
                <>
                  <p className="text-xs mt-2" style={{ color: state === 'upcoming' ? 'var(--moss)' : 'var(--bone)', fontWeight: state === 'current' ? 600 : 400 }}>
                    {s.label}
                  </p>
                  {docNos && docNos[s.key] && (
                    <p className="text-xs tg-mono mt-0.5" style={{ color: 'var(--moss)' }}>{docNos[s.key]}</p>
                  )}
                  {docDates && docDates[s.key] && (
                    <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{docDates[s.key]}</p>
                  )}
                </>
              )}
            </div>
            {i < DOC_STAGES.length - 1 && (
              <div
                className="flex-1"
                style={{
                  height: 2,
                  background: i < currentIdx ? 'var(--sage)' : 'var(--line-strong)',
                  marginTop: compact ? 9 : 16,
                  minWidth: 12,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ============================================================
   PRICE-BREAKDOWN ROW — for the auto-calculation waterfall
   ============================================================ */
/* Signature image (from uploaded ลายเซ็น.svg), used in place of signatory name on printed documents */
const SignatureMark = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 530 103" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0,103) scale(0.1,-0.1)" fill="#1a3a8f" stroke="none">
      <path d="M2640 865 c-58 -30 -191 -160 -209 -203 -14 -35 -10 -70 29 -234 20 -83 13 -98 -54 -120 -73 -24 -86 -19 -86 29 -1 104 -54 183 -122 183 -18 0 -58 7 -88 15 -30 8 -56 15 -56 15 -1 0 -4 -9 -7 -20 -4 -17 -14 -20 -69 -22 -34 0 -70 0 -78 1 -69 12 -95 12 -117 0 -34 -19 -46 -44 -32 -70 10 -20 16 -21 85 -15 41 4 74 3 74 -1 0 -4 -7 -26 -15 -48 -21 -60 -19 -131 5 -155 27 -27 46 -25 66 5 16 24 15 94 -1 202 -7 39 -5 43 18 48 14 4 35 2 46 -5 18 -9 21 -20 21 -85 0 -128 41 -190 98 -148 58 43 55 77 -7 88 -23 4 -41 12 -42 18 -5 59 -5 138 0 141 3 2 35 1 70 -3 80 -8 99 -29 105 -116 6 -79 12 -92 47 -104 24 -8 41 -6 85 10 61 23 71 19 76 -26 2 -20 9 -31 22 -34 38 -7 63 63 32 88 -8 7 -17 35 -21 64 -4 29 -15 85 -26 124 -24 91 -24 130 0 168 26 44 162 189 181 193 23 6 35 21 25 31 -6 6 -27 0 -55 -14z m-698 -607 c-28 -28 -43 33 -20 75 11 21 12 19 21 -22 5 -27 5 -47 -1 -53z m198 22 c0 -11 -6 -20 -14 -20 -18 0 -29 16 -21 30 11 18 35 11 35 -10z" />
      <path d="M499 823 c-53 -33 -109 -185 -88 -240 7 -20 5 -23 -16 -23 -60 0 -125 -76 -125 -145 0 -51 73 -56 130 -8 26 21 31 22 36 9 3 -9 1 -45 -6 -81 -14 -75 -8 -118 18 -113 13 2 19 18 24 63 10 80 25 122 51 140 19 14 23 13 48 -11 23 -22 28 -37 34 -102 7 -80 22 -125 39 -119 23 8 25 61 5 135 -16 55 -19 83 -12 106 l9 31 19 -22 c23 -27 52 -29 83 -7 13 9 26 14 28 11 3 -3 7 -47 8 -98 2 -52 7 -102 11 -111 14 -34 34 -18 54 44 23 69 24 156 2 182 -18 22 -9 38 34 60 34 18 38 19 63 4 14 -9 37 -37 50 -63 l25 -46 -23 -24 c-18 -20 -20 -26 -10 -45 7 -12 10 -33 7 -46 -5 -27 15 -49 37 -41 37 14 44 152 10 204 -25 39 -18 53 25 53 22 0 52 -5 66 -10 22 -9 26 -14 20 -33 -4 -12 -10 -40 -12 -63 -9 -81 53 -56 64 26 5 32 12 44 31 53 21 10 27 8 43 -12 16 -20 19 -40 19 -131 0 -127 7 -170 27 -170 11 0 13 6 8 23 -4 12 -7 84 -6 159 l1 137 -28 26 c-22 21 -33 25 -62 20 -19 -3 -42 -6 -50 -6 -24 -1 -113 32 -134 50 -27 24 -102 19 -159 -9 -26 -13 -47 -27 -47 -30 0 -4 -11 -12 -24 -18 l-25 -11 2 92 2 92 -44 -2 c-28 -1 -57 -11 -80 -28 -21 -14 -40 -25 -44 -25 -4 0 -7 17 -7 38 0 48 -38 128 -68 141 -28 13 -31 13 -63 -6z m78 -73 c7 -19 12 -58 12 -86 1 -45 -2 -53 -30 -73 -16 -12 -45 -25 -64 -28 -28 -4 -36 -1 -50 21 -16 24 -16 29 0 80 9 30 31 70 47 91 39 46 68 45 85 -5z m216 -81 c6 -9 7 -36 3 -62 -7 -43 -10 -47 -34 -47 -15 0 -51 -16 -80 -36 l-53 -35 3 58 3 58 64 43 c66 44 78 47 94 21z m-197 -130 c-3 -17 -6 -41 -6 -52 0 -17 -5 -19 -37 -14 -26 5 -42 2 -54 -9 -15 -14 -18 -12 -33 17 -21 42 -20 49 7 50 12 0 42 8 67 19 61 25 63 24 56 -11z m-186 -39 c33 -33 25 -53 -29 -78 -27 -12 -54 -22 -60 -22 -35 0 26 118 62 120 4 0 16 -9 27 -20z m420 -129 c10 -21 4 -51 -11 -51 -5 0 -9 16 -9 35 0 40 5 43 20 16z" />
      <path d="M4101 789 c-58 -38 -101 -87 -101 -117 0 -7 11 -18 25 -24 20 -9 38 -7 87 8 42 12 94 19 153 19 l90 0 3 -41 c3 -36 -2 -46 -37 -83 -22 -22 -42 -41 -46 -41 -3 0 -21 16 -39 35 -36 38 -76 46 -110 20 -28 -21 -35 -109 -11 -135 18 -20 18 -21 -4 -41 -12 -12 -27 -33 -32 -47 -10 -26 -11 -25 -34 32 -23 56 -41 76 -94 104 -29 15 -115 6 -132 -14 -20 -24 -38 -15 -45 21 -3 20 -16 40 -30 50 -28 18 -116 20 -143 3 -14 -9 -27 -8 -60 5 -23 10 -49 17 -57 17 -18 0 -18 -2 5 -159 9 -65 0 -118 -18 -106 -6 3 -10 23 -9 44 0 21 -5 47 -11 59 -16 29 -84 38 -133 18 -21 -9 -51 -16 -68 -16 -30 0 -31 2 -25 30 7 33 44 76 88 103 30 19 35 42 11 51 -17 7 -128 -56 -156 -89 -19 -22 -24 -55 -7 -55 5 0 15 -14 21 -30 14 -43 35 -51 99 -40 132 24 126 24 144 -3 9 -14 16 -41 14 -59 -4 -62 0 -78 20 -78 23 0 61 49 61 79 0 31 27 26 45 -8 20 -40 88 -52 134 -25 17 10 32 16 34 13 57 -80 56 -79 107 -79 47 0 51 2 76 42 46 73 40 147 -16 175 -21 10 -22 13 -7 19 23 9 59 -1 89 -26 29 -22 45 -78 52 -175 5 -69 19 -81 40 -31 17 41 26 44 51 16 11 -12 28 -20 39 -18 19 3 22 12 26 88 l5 85 45 0 44 0 19 -60 c10 -33 22 -67 26 -75 13 -25 45 -18 55 12 14 40 -7 98 -54 146 -22 22 -40 46 -40 54 0 7 14 29 31 48 67 75 79 96 79 137 0 29 -6 46 -24 62 -22 21 -30 22 -114 17 -49 -4 -106 -13 -125 -21 -45 -18 -57 -19 -57 -2 0 30 97 97 140 97 11 0 29 -9 40 -20 22 -22 30 -25 30 -10 0 6 -12 22 -26 35 -41 38 -87 33 -163 -16z m113 -274 c14 -13 26 -28 26 -32 0 -10 -57 -43 -75 -43 -25 0 -35 66 -13 88 18 18 32 15 62 -13z m-687 -17 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z m177 -34 c42 -7 47 -18 34 -78 -8 -37 -17 -52 -41 -67 -62 -38 -120 -7 -133 71 -4 27 -1 42 17 63 19 25 27 28 55 23 19 -3 49 -9 68 -12z m204 -101 c15 -33 16 -53 2 -53 -5 0 -10 -6 -10 -13 0 -8 -11 -24 -24 -36 -30 -28 -63 -21 -77 16 -7 20 -4 32 21 69 37 52 68 58 88 17z m252 -58 c0 -13 -4 -27 -10 -30 -11 -7 -25 39 -15 55 10 16 25 2 25 -25z" />
      <path d="M4808 515 c-10 -31 -23 -107 -30 -169 -12 -113 -13 -114 -43 -129 -16 -8 -45 -18 -62 -21 -29 -7 -33 -5 -40 21 -7 29 -8 101 -1 188 2 28 0 63 -5 79 -9 27 -12 28 -53 22 -94 -12 -215 -121 -160 -142 16 -6 61 15 91 43 40 37 73 54 81 41 4 -7 8 -62 9 -123 2 -160 15 -180 103 -160 29 7 58 17 64 23 7 7 18 1 35 -19 42 -49 96 -32 134 42 26 52 22 81 -13 93 -23 8 -33 6 -58 -12 -16 -12 -32 -22 -36 -22 -14 0 4 207 21 243 9 20 14 41 10 46 -14 24 -31 8 -47 -44z m92 -267 c0 -27 -27 -58 -51 -58 -34 0 -33 23 1 52 41 34 50 35 50 6z" />
      <path d="M1498 541 c-47 -15 -50 -21 -34 -47 20 -29 20 -50 3 -57 -8 -3 -20 -26 -27 -51 -22 -78 20 -190 65 -173 8 4 15 18 15 32 0 14 4 25 9 25 24 0 22 58 -6 192 -4 23 -1 28 21 34 34 8 72 -2 95 -25 21 -21 67 -162 76 -234 6 -45 18 -60 28 -34 9 23 -20 182 -44 242 -17 42 -33 64 -55 77 -37 21 -109 31 -146 19z m6 -234 c-3 -15 -11 -26 -17 -24 -17 5 -21 75 -5 94 11 13 13 12 20 -13 5 -16 5 -42 2 -57z" />
    </g>
  </svg>
);


const BreakdownRow = ({ label, value, op, muted, total, subtotal }) => (
  <div
    className="flex items-center justify-between py-2.5"
    style={{ borderBottom: total ? 'none' : '1px solid var(--line)', opacity: muted ? 0.5 : 1 }}
  >
    <span className="text-sm flex items-center gap-1.5" style={{ color: total ? 'var(--bone)' : subtotal ? 'var(--bone)' : 'var(--moss)', fontWeight: subtotal || total ? 600 : 400, fontStyle: muted ? 'italic' : 'normal' }}>
      {op && (
        <span className="tg-mono" style={{ color: op === '+' ? 'var(--sage)' : 'var(--rust)' }}>{op}</span>
      )}
      {label}
    </span>
    <span className={`tg-mono ${total ? 'text-lg font-semibold' : 'text-sm'}`} style={{ color: total ? 'var(--gold)' : 'var(--bone)', fontWeight: subtotal ? 600 : undefined }}>
      {value.toLocaleString('en-US')}<span className="text-xs font-normal" style={{ color: 'var(--moss)', marginLeft: 4 }}>บาท</span>
    </span>
  </div>
);

/* ============================================================
   DECORATIVE BARCODE — purely visual, seeded from a string
   ============================================================ */
const BarcodePattern = ({ seed = 'TAMBOON' }) => {
  const bars = [];
  for (let i = 0; i < 26; i++) {
    const code = seed.charCodeAt(i % seed.length) || 65;
    bars.push((code % 3) + 1);
  }
  let x = 0;
  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" style={{ width: '100%', height: 26 }}>
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y="0" width={w} height="24" fill="currentColor" opacity={i % 5 === 0 ? 0.9 : 0.45} />;
        x += w + 1.4;
        return rect;
      })}
    </svg>
  );
};

/* ============================================================
   EMPLOYEE CARD — CR80 portrait (54 x 85.6mm), minimal:
   company name (selectable entity) / employee name / position
   ============================================================ */
const EmployeeCard = ({ employee, entityKey, customCompanyName, photoUrl }) => {
  if (!employee) return null;
  const isOther = entityKey === 'entity2';
  const entity = ENTITIES[entityKey] || ENTITIES.entity1;
  const companyName = isOther ? (customCompanyName || 'ระบุชื่อบริษัท') : entity.name;

  return (
    <div>
      <div
        className="mx-auto"
        style={{
          width: '100%', maxWidth: 260, aspectRatio: '54 / 85.6',
          borderRadius: '1.25rem', overflow: 'hidden',
          border: '1px solid var(--line-strong)', background: 'var(--panel)',
          boxShadow: '0 1px 2px rgba(120,80,40,0.04), 0 16px 36px -18px rgba(120,80,40,0.22)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* top accent */}
        <div style={{ height: '6%', background: 'linear-gradient(90deg, var(--sage), var(--mist))' }} />

        {/* logo + company */}
        <div style={{ padding: '16px 16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {!isOther && <BranchMark className="w-12 h-12" style={{ color: '#1a1a1a' }} />}
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--bone)', letterSpacing: '0.08em', marginTop: isOther ? 0 : 10, lineHeight: 1.4 }}>
            {companyName}
          </p>
          <p style={{ fontSize: 8, color: 'var(--moss)', letterSpacing: '0.15em', marginTop: 2 }}>TEMPORARY STAFF CARD</p>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px 14px', gap: 8, borderTop: '1px dashed var(--line-strong)', borderBottom: '1px dashed var(--line-strong)' }}>
          {/* employee photo — square */}
          <div
            style={{
              width: 81, height: 83, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
              background: 'var(--sage-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--line-strong)',
            }}
          >
            {photoUrl ? (
              <img src={photoUrl} alt={employee.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={32} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />
            )}
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--bone)', lineHeight: 1.35 }}>{employee.name}</p>
          <span className="tg-badge tg-badge-sage" style={{ fontSize: 11 }}>{employee.position}</span>
        </div>

        {/* bottom accent */}
        <div style={{ padding: '12px 16px', textAlign: 'center' }}>
          <p style={{ fontSize: 8, color: 'var(--moss)', letterSpacing: '0.1em' }}>{isOther ? 'SUBCONTRACT STAFF' : entity.branch}</p>
        </div>
      </div>
      <p className="text-xs text-center mt-3" style={{ color: 'var(--moss)' }}>ขนาดมาตรฐาน CR80 แนวตั้ง (54 × 85.6 มม.)</p>
    </div>
  );
};

/* ============================================================
   PHOTO UPLOAD ZONE — single image (legacy / generic use)
   ============================================================ */
const PhotoUploadZone = ({ label, image, onChange }) => (
  <div>
    <p className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
      <Camera size={12} strokeWidth={1.75} /> {label}
    </p>
    <label
      className="tg-focus block cursor-pointer rounded-xl overflow-hidden"
      style={{ border: image ? '1px solid var(--line-strong)' : '1px dashed var(--line-strong)', aspectRatio: '4 / 3', background: 'rgba(217,142,92,0.018)' }}
    >
      {image ? (
        <img src={image} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ color: 'var(--moss)' }}>
          <Upload size={22} strokeWidth={1.5} />
          <span className="text-xs">คลิกเพื่ออัปโหลดรูป</span>
        </div>
      )}
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
    </label>
  </div>
);

/* ============================================================
   PHOTO GALLERY UPLOADER — multi-file + drag & drop,
   paginated 8 photos/page (matches the site photo report form)
   ============================================================ */
const PHOTOS_PER_PAGE = 8;

const PhotoGalleryUploader = ({ photos, onChange, photoPos, onPhotoPosChange, photoZoom, onPhotoZoomChange }) => {
  const [page, setPage] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const getPos = (id) => (photoPos || {})[id] || { x: 50, y: 50 };
  const getZoom = (id) => (photoZoom || {})[id] || 1;

  const startPosDrag = (id, startX, startY) => {
    const startPos = getPos(id);
    const zoom = getZoom(id);
    const onMove = (mv) => {
      const dx = mv.clientX - startX;
      const dy = mv.clientY - startY;
      const sens = 0.08 / zoom;
      const nx = Math.max(0, Math.min(100, startPos.x - dx * sens));
      const ny = Math.max(0, Math.min(100, startPos.y - dy * sens));
      onPhotoPosChange && onPhotoPosChange((prev) => ({ ...prev, [id]: { x: nx, y: ny } }));
    };
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;
    Promise.all(files.map((f, i) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ id: `${Date.now()}_${i}_${f.name}`, url: reader.result, caption: '' });
      reader.readAsDataURL(f);
    }))).then((newPhotos) => {
      onChange([...photos, ...newPhotos]);
      const totalPages = Math.max(1, Math.ceil((photos.length + newPhotos.length) / PHOTOS_PER_PAGE));
      setPage(totalPages - 1);
    });
  };

  const updateCaption = (id, caption) => onChange(photos.map((p) => (p.id === id ? { ...p, caption } : p)));
  const removePhoto = (id) => onChange(photos.filter((p) => p.id !== id));

  const totalPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const currentPage = Math.min(page, totalPages - 1);
  const pagePhotos = photos.slice(currentPage * PHOTOS_PER_PAGE, currentPage * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE);
  const slots = [...pagePhotos];
  while (slots.length < PHOTOS_PER_PAGE) slots.push(null);

  return (
    <div>
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        className="tg-focus flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer mb-4 text-center"
        style={{ border: `1px dashed ${dragOver ? 'var(--sage)' : 'var(--line-strong)'}`, background: dragOver ? 'var(--sage-soft)' : 'rgba(217,142,92,0.02)', padding: '2rem 1rem', transition: 'all 0.15s ease' }}
      >
        <Upload size={24} strokeWidth={1.5} style={{ color: dragOver ? 'var(--sage)' : 'var(--moss)' }} />
        <p className="text-sm" style={{ color: 'var(--bone)' }}>ลากไฟล์ภาพมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
        <p className="text-xs" style={{ color: 'var(--moss)' }}>เลือกได้หลายไฟล์พร้อมกัน (JPG, PNG)</p>
        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </label>

      {photos.length === 0 ? (
        <p className="text-sm text-center py-6" style={{ color: 'var(--moss)' }}>ยังไม่มีรูปภาพ</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <p className="text-xs" style={{ color: 'var(--moss)' }}>ทั้งหมด {photos.length} รูป · หน้าละ {PHOTOS_PER_PAGE} รูป · ลากรูปเพื่อจัดตำแหน่ง · slider ซูม</p>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0} className="tg-focus tg-navbtn px-2.5 py-1 rounded-lg text-xs" style={{ border: '1px solid var(--line-strong)', color: currentPage === 0 ? 'var(--line-strong)' : 'var(--bone)' }}>‹</button>
                <span className="text-xs tg-mono" style={{ color: 'var(--bone)' }}>หน้า {currentPage + 1} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1} className="tg-focus tg-navbtn px-2.5 py-1 rounded-lg text-xs" style={{ border: '1px solid var(--line-strong)', color: currentPage === totalPages - 1 ? 'var(--line-strong)' : 'var(--bone)' }}>›</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {slots.map((p, i) =>
              p ? (
                <div key={p.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                  <div
                    style={{ aspectRatio: '4 / 3', position: 'relative', overflow: 'hidden', background: 'rgba(217,142,92,0.03)', cursor: 'grab', userSelect: 'none' }}
                    onMouseDown={(e) => { if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return; e.preventDefault(); startPosDrag(p.id, e.clientX, e.clientY); }}
                  >
                    <img
                      src={p.url}
                      alt={p.caption || 'site photo'}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${getPos(p.id).x}% ${getPos(p.id).y}%`, transform: `scale(${getZoom(p.id)})`, transformOrigin: `${getPos(p.id).x}% ${getPos(p.id).y}%`, pointerEvents: 'none' }}
                    />
                    {/* Number */}
                    <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 10, padding: '0.1rem 0.4rem', borderRadius: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', fontWeight: 600 }}>
                      {currentPage * PHOTOS_PER_PAGE + i + 1}
                    </span>
                    {/* Zoom slider */}
                    <div style={{ position: 'absolute', bottom: 6, left: 6, right: 28, display: 'flex', alignItems: 'center' }}>
                      <input type="range" min="1" max="3" step="0.05" value={getZoom(p.id)}
                        onMouseDown={(e) => e.stopPropagation()}
                        onChange={(e) => { e.stopPropagation(); onPhotoZoomChange && onPhotoZoomChange((prev) => ({ ...prev, [p.id]: Number(e.target.value) })); }}
                        style={{ width: '100%', height: 4, cursor: 'pointer', accentColor: '#fff' }}
                        title={`ซูม ${getZoom(p.id).toFixed(1)}×`}
                      />
                    </div>
                    {/* Delete */}
                    <button onMouseDown={(e) => e.stopPropagation()} onClick={() => removePhoto(p.id)} className="tg-focus"
                      style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 9999, background: 'rgba(110,80,55,0.55)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={12} strokeWidth={2} />
                    </button>
                  </div>
                  <input value={p.caption} onChange={(e) => updateCaption(p.id, e.target.value)} placeholder="คำอธิบายภาพ..."
                    className="tg-focus w-full px-2 py-1.5 text-xs"
                    style={{ border: 'none', borderTop: '1px solid var(--line)', borderRadius: 0, background: 'var(--panel)', color: 'var(--bone)' }}
                  />
                </div>
              ) : (
                <div key={`empty-${currentPage}-${i}`} className="rounded-xl flex items-center justify-center"
                  style={{ aspectRatio: '4 / 3', border: '1px dashed var(--line)', background: 'rgba(217,142,92,0.015)' }}>
                  <span className="text-xs" style={{ color: 'var(--moss)' }}>ช่องที่ {currentPage * PHOTOS_PER_PAGE + i + 1}</span>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};


/* ============================================================
   PROJECT SEARCH SELECT — searchable dropdown, used on every page
   ============================================================ */
const ProjectSearchSelect = ({ value, onChange, items, allowAllLabel, placeholder = 'ค้นหาโครงการ...' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const list = items || projectsData;
  const selected = list.find((p) => p.id === value);
  const q = query.trim().toLowerCase();
  const filtered = q ? list.filter((p) => (p.name + ' ' + (p.customer || '')).toLowerCase().includes(q)) : list;

  return (
    <div
      className="relative"
      style={{ minWidth: 240 }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setQuery(''); } }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="tg-input tg-focus w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left"
      >
        <span className="flex items-center gap-2 truncate">
          <Search size={14} strokeWidth={1.75} style={{ color: 'var(--moss)', flexShrink: 0 }} />
          <span className="truncate" style={{ color: selected ? 'var(--bone)' : 'var(--moss)' }}>
            {value === 'all' ? allowAllLabel : selected ? selected.name : placeholder}
          </span>
        </span>
        <ChevronDown size={14} strokeWidth={1.75} style={{ color: 'var(--moss)', flexShrink: 0 }} />
      </button>
      {open && (
        <div className="tg-menu tg-scroll" onMouseDown={(e) => e.preventDefault()}>
          <div className="p-2" style={{ borderBottom: '1px solid var(--line)' }}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="พิมพ์ชื่อโครงการหรือลูกค้า..."
              className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm"
            />
          </div>
          {allowAllLabel && (
            <div
              className={`tg-menu-item ${value === 'all' ? 'tg-menu-item-active' : ''}`}
              onClick={() => { onChange('all'); setOpen(false); setQuery(''); }}
            >
              <p className="font-medium">{allowAllLabel}</p>
            </div>
          )}
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`tg-menu-item ${p.id === value ? 'tg-menu-item-active' : ''}`}
              onClick={() => { onChange(p.id); setOpen(false); setQuery(''); }}
            >
              <p className="font-medium truncate">{p.name}</p>
              {p.customer && <p className="text-xs truncate" style={{ color: 'var(--moss)' }}>{p.customer}</p>}
            </div>
          ))}
          {filtered.length === 0 && <div className="tg-menu-item" style={{ color: 'var(--moss)' }}>ไม่พบโครงการ</div>}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   ISSUANCE HISTORY — narrow vertical sidebar (Document Flow)
   ============================================================ */
const IssuanceHistory = ({ doc }) => {
  const entries = DOC_STAGES
    .filter((s) => doc.docNos[s.key])
    .map((s) => ({ key: s.key, label: s.label, docNo: doc.docNos[s.key], date: doc.docDates[s.key] }))
    .sort((a, b) => parseThDate(b.date) - parseThDate(a.date));

  return (
    <div className="tg-panel flex flex-col" style={{ height: '720px' }}>
      <div className="p-4" style={{ borderBottom: '1px solid var(--line)' }}>
        <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--bone)' }}>
          <History size={14} strokeWidth={1.75} style={{ color: 'var(--mist)' }} /> ประวัติออกเอกสาร
        </h3>
        <p className="text-xs mt-1 tg-mono" style={{ color: 'var(--moss)' }}>{doc.id}</p>
      </div>
      <div className="flex-1 overflow-y-auto tg-scroll p-4">
        {entries.length === 0 ? (
          <p className="text-sm text-center py-10" style={{ color: 'var(--moss)' }}>ยังไม่มีเอกสารที่ออก</p>
        ) : (
          entries.map((e, i) => (
            <div key={e.key} className="relative pl-5" style={{ paddingBottom: i === entries.length - 1 ? 0 : '1.25rem' }}>
              {i !== entries.length - 1 && (
                <span className="absolute left-1 top-3 bottom-0" style={{ width: 1, background: 'var(--line-strong)' }} />
              )}
              <span
                className="absolute left-0 top-1.5 rounded-full"
                style={{ width: 8, height: 8, background: e.key === doc.currentStage ? 'var(--sage)' : 'var(--mist)' }}
              />
              <p className="text-sm font-medium" style={{ color: 'var(--bone)' }}>ออก{e.label}</p>
              <p className="text-xs tg-mono mt-0.5" style={{ color: 'var(--moss)' }}>{e.docNo}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>{e.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ============================================================
   LINE ITEMS EDITOR — รายการ / จำนวน / หน่วย / ราคาต่อหน่วย / รวม
   ============================================================ */
const LineItemsEditor = ({ items, onChange }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPreview, setAiPreview] = useState(null); // parsed items before confirm

  const update = (id, field, val) => {
    onChange(items.map((it) => (it.id === id ? { ...it, [field]: val } : it)));
  };
  const remove = (id) => onChange(items.filter((it) => it.id !== id));

  // Get display number for an item (e.g. "1", "1.1", "2", "2.3")
  const getNum = (idx) => {
    const it = items[idx];
    if (!it.parentId) {
      // Count main items before this one
      let n = 0;
      for (let i = 0; i <= idx; i++) { if (!items[i].parentId) n++; }
      return String(n);
    } else {
      // Find parent number and sub-index
      const parentIdx = items.findIndex((x) => x.id === it.parentId);
      const parentNum = parentIdx >= 0 ? getNum(parentIdx) : '?';
      let sub = 0;
      for (let i = 0; i <= idx; i++) { if (items[i].parentId === it.parentId) sub++; }
      return `${parentNum}.${sub}`;
    }
  };

  const addMain = () => {
    onChange([...items, { id: Date.now(), description: '', qty: 1, unit: 'งาน', price: 0 }]);
  };

  const addSub = () => {
    if (items.length === 0) { addMain(); return; }
    // Find last main item
    let lastMainId = null;
    for (let i = items.length - 1; i >= 0; i--) {
      if (!items[i].parentId) { lastMainId = items[i].id; break; }
    }
    if (!lastMainId) { addMain(); return; }
    onChange([...items, { id: Date.now(), description: '', qty: 1, unit: 'งาน', price: 0, parentId: lastMainId }]);
  };

  // AI image reader
  const handleAiImage = async (file) => {
    if (!file) return;
    setAiLoading(true);
    setAiPreview(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1000,
            messages: [{
              role: 'user',
              content: [
                { type: 'image', source: { type: 'base64', media_type: file.type, data: base64 } },
                { type: 'text', text: 'จากรูปนี้ ให้แยกรายการสินค้า/บริการออกมาเป็น JSON array โดยมี field: description (ชื่อรายการ), qty (จำนวนตัวเลข), unit (หน่วย เช่น งาน ต้น ชุด เมตร), price (ราคาต่อหน่วย ถ้าไม่มีใส่ 0) ตอบเป็น JSON array เท่านั้น ไม่มีข้อความอื่น' }
              ]
            }]
          })
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || '[]';
        const clean = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(clean);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAiPreview(parsed.map((x, i) => ({ id: Date.now() + i, description: x.description || '', qty: Number(x.qty) || 1, unit: x.unit || 'งาน', price: Number(x.price) || 0 })));
        }
      } catch (e) {
        alert('ไม่สามารถอ่านรูปได้ กรุณาลองใหม่');
      }
      setAiLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const confirmAi = () => {
    onChange([...items, ...aiPreview]);
    setAiPreview(null);
  };

  return (
    <div>
      <div className="overflow-x-auto tg-scroll">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '640px' }}>
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '6%' }}>ลำดับ</th>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '38%' }}>รายการ</th>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '10%' }}>จำนวน</th>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '10%' }}>หน่วย</th>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '16%' }}>ราคาต่อหน่วย (บาท)</th>
              <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '16%' }}>ราคาทั้งหมด (บาท)</th>
              <th className="pb-2.5" style={{ width: '4%' }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const num = getNum(idx);
              const isSub = !!it.parentId;
              return (
                <tr key={it.id} style={{ borderBottom: '1px solid var(--line)', background: isSub ? 'rgba(217,142,92,0.018)' : 'transparent' }}>
                  <td className="py-2 pr-3 tg-mono text-center" style={{ color: isSub ? 'var(--moss)' : 'var(--bone)', fontSize: isSub ? 11 : 13 }}>{num}</td>
                  <td className="py-2 pr-3" style={{ paddingLeft: isSub ? '1.5rem' : undefined }}>
                    <input value={it.description} onChange={(e) => update(it.id, 'description', e.target.value)} className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm" />
                  </td>
                  <td className="py-2 pr-3">
                    <input type="number" value={it.qty} onFocus={(e) => e.target.select()} onChange={(e) => update(it.id, 'qty', e.target.value)} className="tg-input tg-focus tg-mono w-full px-2.5 py-1.5 text-sm text-center" />
                  </td>
                  <td className="py-2 pr-3">
                    <input value={it.unit} onChange={(e) => update(it.id, 'unit', e.target.value)} className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm text-center" />
                  </td>
                  <td className="py-2 pr-3">
                    <input type="number" value={it.price} onFocus={(e) => e.target.select()} onChange={(e) => update(it.id, 'price', e.target.value)} className="tg-input tg-focus tg-mono w-full px-2.5 py-1.5 text-sm" />
                  </td>
                  <td className="py-2 pr-3 text-right tg-mono font-medium" style={{ color: 'var(--bone)' }}>
                    {fmtTHB((Number(it.qty) || 0) * (Number(it.price) || 0))}
                  </td>
                  <td className="py-2 text-right">
                    <button onClick={() => remove(it.id)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--rust)' }} aria-label="ลบรายการ">
                      <Trash2 size={14} strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button onClick={addMain} className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.25)', color: 'var(--sage)' }}>
          <Plus size={14} strokeWidth={2} /> เพิ่มรายการ
        </button>
        <button onClick={addSub} disabled={items.filter((x) => !x.parentId).length === 0} className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(138,155,110,0.12)', border: '1px solid rgba(138,155,110,0.25)', color: 'var(--mist)', opacity: items.filter((x) => !x.parentId).length === 0 ? 0.4 : 1 }}>
          <Plus size={14} strokeWidth={2} /> เพิ่มรายการย่อย
        </button>
        <div className="ml-auto">
          <label className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer" style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)', color: 'var(--gold)' }}>
            {aiLoading ? <span className="animate-spin">⏳</span> : <Camera size={14} strokeWidth={1.75} />}
            {aiLoading ? 'AI กำลังอ่าน...' : 'AI อ่านรูป'}
            <input type="file" accept="image/*" className="hidden" disabled={aiLoading} onChange={(e) => handleAiImage(e.target.files?.[0])} />
          </label>
        </div>
      </div>

      {/* AI preview — confirm before adding */}
      {aiPreview && (
        <div className="mt-4 tg-panel p-4" style={{ background: 'var(--gold-soft)', border: '1px solid rgba(201,162,39,0.35)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--bone)' }}>AI อ่านรูปได้ {aiPreview.length} รายการ — ตรวจสอบแล้วกดยืนยัน</p>
          <div className="space-y-1.5 mb-3">
            {aiPreview.map((x, i) => (
              <div key={x.id} className="flex items-center gap-3 text-sm">
                <span className="tg-mono text-xs" style={{ color: 'var(--moss)', minWidth: 20 }}>{i + 1}.</span>
                <input value={x.description} onChange={(e) => setAiPreview((p) => p.map((it, j) => j === i ? { ...it, description: e.target.value } : it))} className="tg-input tg-focus flex-1 px-2 py-1 text-sm" />
                <input type="number" value={x.qty} onFocus={(e) => e.target.select()} onChange={(e) => setAiPreview((p) => p.map((it, j) => j === i ? { ...it, qty: Number(e.target.value) } : it))} className="tg-input tg-focus tg-mono w-16 px-2 py-1 text-sm text-center" />
                <input value={x.unit} onChange={(e) => setAiPreview((p) => p.map((it, j) => j === i ? { ...it, unit: e.target.value } : it))} className="tg-input tg-focus w-16 px-2 py-1 text-sm text-center" />
                <input type="number" value={x.price} onFocus={(e) => e.target.select()} onChange={(e) => setAiPreview((p) => p.map((it, j) => j === i ? { ...it, price: Number(e.target.value) } : it))} className="tg-input tg-focus tg-mono w-24 px-2 py-1 text-sm" placeholder="ราคา" />
                <button onClick={() => setAiPreview((p) => p.filter((_, j) => j !== i))} className="tg-focus tg-navbtn p-1.5 rounded-lg shrink-0" style={{ color: 'var(--rust)' }} title="ลบรายการนี้">
                  <Trash2 size={14} strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={confirmAi} className="tg-focus tg-navbtn flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: 'var(--sage)', color: '#fff' }}>
              <CheckCircle2 size={14} strokeWidth={1.75} /> ยืนยันเพิ่มรายการ
            </button>
            <button onClick={() => setAiPreview(null)} className="tg-focus tg-navbtn px-4 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--line)', color: 'var(--moss)' }}>
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CompanySearchSelect = ({ value, onChange, items, allowAllLabel, placeholder = 'ค้นหาบริษัท...' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const list = items || projectsData;
  const selected = list.find((p) => p.id === value);
  const q = query.trim().toLowerCase();
  // Group by customer
  const companies = [...new Set(list.map((p) => p.customer || 'ไม่ระบุบริษัท'))];
  const filtered = companies.filter((c) => {
    if (!q) return true;
    return c.toLowerCase().includes(q) || list.filter((p) => (p.customer || 'ไม่ระบุบริษัท') === c).some((p) => p.name.toLowerCase().includes(q));
  });

  return (
    <div className="relative" style={{ minWidth: 240 }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setQuery(''); } }}
    >
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="tg-input tg-focus w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left"
      >
        <span className="flex items-center gap-2 truncate">
          <Search size={14} strokeWidth={1.75} style={{ color: 'var(--moss)', flexShrink: 0 }} />
          <span className="truncate" style={{ color: selected ? 'var(--bone)' : 'var(--moss)' }}>
            {value === 'all' ? allowAllLabel : selected ? (selected.customer || selected.name) : placeholder}
          </span>
        </span>
        <ChevronDown size={14} strokeWidth={1.75} style={{ color: 'var(--moss)', flexShrink: 0 }} />
      </button>
      {open && (
        <div className="tg-menu tg-scroll" onMouseDown={(e) => e.preventDefault()} style={{ maxHeight: 360, overflowY: 'auto' }}>
          <div className="p-2" style={{ borderBottom: '1px solid var(--line)' }}>
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="พิมพ์ชื่อบริษัทหรือโครงการ..."
              className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm"
            />
          </div>
          {allowAllLabel && (
            <div className={`tg-menu-item ${value === 'all' ? 'tg-menu-item-active' : ''}`}
              onClick={() => { onChange('all'); setOpen(false); setQuery(''); }}
            >
              <p className="font-medium">{allowAllLabel}</p>
            </div>
          )}
          {filtered.map((company) => {
            const companyProjects = list.filter((p) => (p.customer || 'ไม่ระบุบริษัท') === company);
            return (
              <div key={company}>
                <div className="px-3 py-1.5" style={{ background: 'rgba(217,142,92,0.06)', borderBottom: '1px solid var(--line)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--sage)' }}>{company}</p>
                </div>
                {companyProjects.map((p) => (
                  <div key={p.id}
                    className={`tg-menu-item ${p.id === value ? 'tg-menu-item-active' : ''}`}
                    onClick={() => { onChange(p.id); setOpen(false); setQuery(''); }}
                    style={{ paddingLeft: '1.5rem' }}
                  >
                    <p className="font-medium truncate" style={{ fontSize: 13 }}>{p.name}</p>
                    <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{p.id}</p>
                  </div>
                ))}
              </div>
            );
          })}
          {filtered.length === 0 && <div className="tg-menu-item" style={{ color: 'var(--moss)' }}>ไม่พบบริษัท/โครงการ</div>}
        </div>
      )}
    </div>
  );
};


const DocumentPreview = ({ doc, project, formData, amounts, stage, copyLabel, onClose }) => {
  const entity = ENTITIES[doc.entity];
  const copies = (stage === 'tax_invoice' || stage === 'receipt') ? ['ต้นฉบับ', 'สำเนา'] : [copyLabel];
  const branchSuffix = formData.branchType === 'branch' && formData.branchName
    ? `(สาขา ${formData.branchName})`
    : '(สำนักงานใหญ่)';
  const showBranchSuffix = stage === 'tax_invoice' || stage === 'receipt';
  const checkDetail = [formData.checkBank, formData.checkNo && `เลขที่ ${formData.checkNo}`, formData.checkDate && fmtDate(formData.checkDate)].filter(Boolean).join(' · ');

  return (
    <div className="tg-modal-backdrop">
      <div className="tg-panel tg-print-area tg-scroll" style={{ maxWidth: 760, width: '100%', margin: '0.5rem 0', maxHeight: '94vh', overflowY: 'auto', padding: '36px 40px', background: '#fff' }}>
        {copies.map((label, idx) => (
        <div key={idx} className={`tg-doc-page${idx > 0 ? ' tg-doc-copy' : ''}`} style={{ display: 'flex', flexDirection: 'column', ...(idx > 0 ? { borderTop: '2px dashed var(--line-strong)', marginTop: 24, paddingTop: 24 } : undefined) }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: '2px solid var(--bone)' }}>
          <div className="flex items-start gap-3">
            <BranchMark className="w-16 h-16 shrink-0" style={{ color: '#1a1a1a' }} />
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--bone)' }}>{entity.name} {entity.branch && `(${entity.branch})`}</p>
              {entity.nameEn && <p className="text-xs font-semibold" style={{ color: 'var(--bone)' }}>{entity.nameEn}</p>}
              {entity.address && <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>{entity.address}</p>}
              {entity.addressEn && <p className="text-xs" style={{ color: 'var(--moss)' }}>{entity.addressEn}</p>}
              {entity.taxId && <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>เลขประจำตัวผู้เสียภาษีอากร {entity.taxId}</p>}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{formData.docNo}</p>
            {label && (
              <span className="tg-badge inline-block mt-1.5" style={{ fontSize: 11, padding: '0.25rem 0.75rem', fontWeight: 600, background: 'var(--gold-soft)', color: 'var(--gold)' }}>{label}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex justify-center my-3">
          <div className="text-center" style={{
            padding: '0.5rem 1.75rem', borderRadius: '0.75rem',
            background: 'var(--sage-soft)', color: 'var(--sage)',
            border: '1px solid rgba(217,142,92,0.25)',
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.5, display: 'block' }}>{DOC_TITLES[stage]}</p>
            <p className="tg-mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.5, display: 'block' }}>{DOC_TITLES_EN[stage]}</p>
          </div>
        </div>

        {/* Customer info — left block aligns with item column, right block aligns with price columns */}
        <div className="tg-doc-info">
          <div className="tg-doc-left">
            {stage === 'quotation' && (
              <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>ชื่อลูกค้า</span><span style={{ color: 'var(--bone)' }}>{project.contact}</span></div>
            )}
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>ชื่อบริษัท</span><span style={{ color: 'var(--bone)' }}>{project.customer}{showBranchSuffix && ` ${branchSuffix}`}</span></div>
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>ที่อยู่</span><span style={{ color: 'var(--bone)' }}>{project.address}</span></div>
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>TaxID</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{project.taxId}</span></div>
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>โครงการ</span><span style={{ color: 'var(--bone)' }}>{doc.projectName}</span></div>
          </div>
          <div className="tg-doc-right">
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>เลขที่</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.docNo}</span></div>
            <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>วันที่</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{fmtDate(formData.docDate)}</span></div>
            {stage === 'quotation' && (
              <>
                <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>ยืนราคา</span><span style={{ color: 'var(--bone)' }}>{formData.validity}</span></div>
                <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>Rev</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.rev}</span></div>
              </>
            )}
            {stage === 'billing' && (
              <>
                <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>อ้างอิง</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.qtRef}</span></div>
                <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>ครบกำหนด</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{fmtDate(formData.dueDate)}</span></div>
              </>
            )}
            {stage === 'tax_invoice' && (
              <>
                <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>อ้างอิง</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.invRef}</span></div>
                {formData.poRef && <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>PO Ref</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.poRef}</span></div>}
                {formData.poDate && <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>วันที่ PO</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{fmtDate(formData.poDate)}</span></div>}
              </>
            )}
            {stage === 'receipt' && (
              <div className="tg-doc-row"><span style={{ color: 'var(--moss)' }}>บิลอ้างอิง</span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{formData.invRef}</span></div>
            )}
          </div>
        </div>

        {/* Line items */}
        <table className="w-full text-sm mb-1" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--sage-soft)' }}>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>ลำดับ</th>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>รายการ</th>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>จำนวน</th>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>หน่วย</th>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>ราคาต่อหน่วย (บาท)</th>
              <th className="py-2 px-2 text-center font-semibold" style={{ color: 'var(--bone)', border: '1px solid var(--line-strong)' }}>ราคาทั้งหมด (บาท)</th>
            </tr>
          </thead>
          <tbody>
            {formData.lineItems.map((it, i) => {
              // compute display number (1, 1.1, 2, 2.1...)
              const getNum = (idx) => {
                const item = formData.lineItems[idx];
                if (!item.parentId) {
                  let n = 0; for (let j = 0; j <= idx; j++) { if (!formData.lineItems[j].parentId) n++; } return String(n);
                } else {
                  const pIdx = formData.lineItems.findIndex((x) => x.id === item.parentId);
                  const pNum = pIdx >= 0 ? getNum(pIdx) : '?';
                  let sub = 0; for (let j = 0; j <= idx; j++) { if (formData.lineItems[j].parentId === item.parentId) sub++; }
                  return `${pNum}.${sub}`;
                }
              };
              const num = getNum(i);
              const isSub = !!it.parentId;
              return (
              <tr key={it.id}>
                <td className="py-1.5 px-2 text-center" style={{ border: '1px solid var(--line)', color: 'var(--bone)', fontSize: isSub ? 11 : 13 }}>{num}</td>
                <td className="py-1.5 px-2" style={{ border: '1px solid var(--line)', color: 'var(--bone)', paddingLeft: isSub ? '1.5rem' : undefined }}>{it.description}</td>
                <td className="py-1.5 px-2 text-center tg-mono" style={{ border: '1px solid var(--line)', color: 'var(--bone)' }}>{it.qty}</td>
                <td className="py-1.5 px-2 text-center" style={{ border: '1px solid var(--line)', color: 'var(--bone)' }}>{it.unit}</td>
                <td className="py-1.5 px-2 text-right tg-mono" style={{ border: '1px solid var(--line)', color: 'var(--bone)' }}>{fmtTHB(Number(it.price) || 0)}</td>
                <td className="py-1.5 px-2 text-right tg-mono" style={{ border: '1px solid var(--line)', color: 'var(--bone)' }}>{fmtTHB((Number(it.qty) || 0) * (Number(it.price) || 0))}</td>
              </tr>
              );
            })}
          </tbody>
        </table>

        {/* Calc summary */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="text-sm" style={{ color: 'var(--moss)' }}>
            <span className="font-semibold" style={{ color: 'var(--bone)' }}>ตัวอักษร: </span>{bahtText(amounts.net)}
          </div>
          <div>
            <BreakdownRow label="รวมเงิน" value={amounts.base} />
            <BreakdownRow label={`ค่าดำเนินการ 10%${formData.charges?.opFee === false ? ' — ไม่คิด' : ''}`} value={amounts.opFee} op={formData.charges?.opFee === false ? undefined : '+'} muted={formData.charges?.opFee === false} />
            <BreakdownRow label={`หัก ณ ที่จ่าย 3%${formData.charges?.wht === false ? ' — ไม่คิด' : ''}`} value={amounts.wht} op={formData.charges?.wht === false ? undefined : '-'} muted={formData.charges?.wht === false} />
            <BreakdownRow label={`ภาษีมูลค่าเพิ่ม 7%${formData.charges?.vat === false ? ' — ไม่คิด' : ''}`} value={amounts.vat} op={formData.charges?.vat === false ? undefined : '+'} muted={formData.charges?.vat === false} />
            <div className="flex items-center justify-between pt-2 mt-1" style={{ borderTop: '1px solid var(--line-strong)' }}>
              <span className="text-sm font-bold" style={{ color: 'var(--bone)' }}>{DOC_TOTAL_LABEL[stage]}</span>
              <span className="tg-mono text-base font-bold" style={{ color: 'var(--gold)' }}>{amounts.net.toLocaleString("en-US")} <span className="text-xs font-normal" style={{ color: 'var(--moss)' }}>บาท</span></span>
            </div>
          </div>
        </div>

        {/* Note (quotation) / Payment method (receipt) — left-aligned block above the signature area */}
        {stage === 'quotation' && formData.note && (
          <div className="mt-5 text-xs text-left" style={{ color: 'var(--bone)' }}>
            <span className="font-semibold">หมายเหตุ: </span>
            <span style={{ color: 'var(--moss)' }}>{formData.note}</span>
          </div>
        )}
        {stage === 'receipt' && (
          <div className="mt-5 text-xs text-left" style={{ color: 'var(--bone)' }}>
            <p className="font-semibold mb-1.5">ชำระโดย</p>
            <div className="space-y-1">
              <p className="flex items-center gap-1.5">
                <span style={{ display: 'inline-block', width: 12, height: 12, border: '1px solid var(--bone)', textAlign: 'center', lineHeight: '11px', fontSize: 9 }}>{formData.payMethod === 'เงินสด' ? '✓' : ''}</span>
                เงินสด
              </p>
              <p className="flex items-center gap-1.5">
                <span style={{ display: 'inline-block', width: 12, height: 12, border: '1px solid var(--bone)', textAlign: 'center', lineHeight: '11px', fontSize: 9 }}>{formData.payMethod === 'โอนเงินผ่านธนาคาร' ? '✓' : ''}</span>
                โอนเงินผ่านธนาคาร
              </p>
              <p className="flex items-center gap-1.5">
                <span style={{ display: 'inline-block', width: 12, height: 12, border: '1px solid var(--bone)', textAlign: 'center', lineHeight: '11px', fontSize: 9 }}>{formData.payMethod === 'เช็ค' ? '✓' : ''}</span>
                เช็ค{formData.payMethod === 'เช็ค' && checkDetail && <span style={{ color: 'var(--moss)' }}> — {checkDetail}</span>}
              </p>
            </div>
          </div>
        )}

        {/* Signatures */}
        {stage === 'receipt' ? (
          <div className="grid grid-cols-3 gap-6 text-center text-xs tg-sig-area" style={{ color: 'var(--moss)', marginTop: 'auto', paddingTop: '10mm', borderTop: '1px solid var(--line)' }}>
            <div>
              <div className="flex justify-center mb-1" style={{ height: 32 }}>
                {stage === 'quotation' && <SignatureMark style={{ height: '100%', width: 'auto' }} />}
              </div>
              <p style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 6 }}>( {entity.signatory} )</p>
              <p className="mt-1">{DOC_SIGNATORY_ROLE[stage]}</p>
            </div>
            <div>
              <div className="mb-1" style={{ height: 32 }} />
              <p style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 6 }}>( ……………………………… )</p>
              <p className="mt-1">ผู้มีอำนาจลงนาม</p>
            </div>
            <div>
              <div className="mb-1" style={{ height: 32 }} />
              <p style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 6 }}>( ……………………………… )</p>
              <p className="mt-1">ผู้รับเอกสาร / วันที่ ………………</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-10 text-center text-xs tg-sig-area" style={{ color: 'var(--moss)', marginTop: 'auto', paddingTop: '10mm', borderTop: '1px solid var(--line)' }}>
            <div>
              <div className="flex justify-center mb-1" style={{ height: 32 }}>
                {stage === 'quotation' && <SignatureMark style={{ height: '100%', width: 'auto' }} />}
              </div>
              <p style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 6 }}>( {entity.signatory} )</p>
              <p className="mt-1">{DOC_SIGNATORY_ROLE[stage]} · โทร {entity.phone}</p>
              <p>{entity.name}</p>
            </div>
            <div>
              <div className="mb-1" style={{ height: 32 }} />
              <p style={{ borderTop: '1px solid var(--line-strong)', paddingTop: 6 }}>( ……………………………… )</p>
              <p className="mt-1">ผู้รับเอกสาร / วันที่ ………………</p>
            </div>
          </div>
        )}
        </div>
        ))}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-8 tg-noprint">
          <button onClick={onClose} className="tg-focus tg-navbtn px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid var(--line-strong)', color: 'var(--moss)' }}>
            ปิด
          </button>
          <button
            onClick={() => {
              const area = document.querySelector('.tg-print-area');
              if (!area) { window.print(); return; }
              const w = window.open('', '_blank', 'width=900,height=700');
              w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>เอกสาร</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');
                @page { size: A4; margin: 15mm 20mm; }
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Sarabun', sans-serif; font-size: 13px; color: #3d2c1e; background: #fff; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #ddd; padding: 6px 8px; }
                th { background: #f5f0eb; font-weight: 600; }
                .tg-mono { font-family: 'Courier New', monospace; }
                .tg-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-weight: 700; }
                .tg-badge-sage { background: #e8f0e8; color: #4a7a5a; }
                .tg-doc-page { display: flex !important; flex-direction: column !important; min-height: 257mm; }
                .tg-doc-copy { break-before: page; page-break-before: always; border-top: none !important; margin-top: 0 !important; padding-top: 0 !important; }
                .tg-sig-area { margin-top: auto !important; padding-top: 8mm; }
                .tg-noprint { display: none !important; }
              </style></head><body>${area.innerHTML}</body></html>`);
              w.document.close();
              setTimeout(() => { w.focus(); w.print(); w.close(); }, 500);
            }}
            className="tg-focus tg-navbtn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{ background: 'var(--sage)', color: '#fff' }}
          >
            <Printer size={16} strokeWidth={1.75} /> พิมพ์ / บันทึก PDF
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   TABS — switch between page sections without scrolling
   ============================================================ */
const Tabs = ({ tabs, active, onChange, accent = 'sage' }) => (
  <div className="flex items-center gap-1 mb-5 overflow-x-auto tg-scroll" style={{ borderBottom: '1px solid var(--line)' }}>
    {tabs.map((t) => {
      const Icon = t.icon;
      const isActive = active === t.key;
      return (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className="tg-focus tg-navbtn flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap"
          style={{
            color: isActive ? `var(--${accent})` : 'var(--moss)',
            borderBottom: isActive ? `2px solid var(--${accent})` : '2px solid transparent',
            marginBottom: -1,
          }}
        >
          {Icon && <Icon size={14} strokeWidth={1.75} />}
          {t.label}
          {t.badge !== undefined && t.badge !== null && (
            <span className="tg-badge" style={{ background: isActive ? `var(--${accent}-soft)` : 'rgba(217,142,92,0.08)', color: isActive ? `var(--${accent})` : 'var(--moss)', padding: '0.05rem 0.4rem', fontSize: '0.7rem' }}>
              {t.badge}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

/* ============================================================
   NAVIGATION
   ============================================================ */
const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Executive Dashboard', sub: 'ภาพรวมการเงิน', mobileLabel: 'Dashboard' },
  { id: 'crm', icon: FolderKanban, label: 'CRM & Project Explorer', sub: 'จัดการลูกค้า & โครงการ', mobileLabel: 'CRM' },
  { id: 'docflow', icon: ClipboardList, label: 'Seamless Document Flow', sub: 'ใบเสนอราคา → ใบเสร็จรับเงิน', mobileLabel: 'เอกสาร' },
  { id: 'hr', icon: Users, label: 'HR & Employee Card', sub: 'พนักงานชั่วคราว', mobileLabel: 'พนักงาน' },
  { id: 'sitelog', icon: HardHat, label: 'Site Log & Direct Costing', sub: 'บันทึกหน้างาน', mobileLabel: 'หน้างาน' },
];

const Sidebar = ({ page, setPage }) => (
  <aside className="hidden md:flex w-72 shrink-0 flex-col h-screen sticky top-0" style={{ borderRight: '1px solid var(--line)' }}>
    <div className="px-6 py-7 flex items-center gap-3" style={{ borderBottom: '1px solid var(--line)' }}>
      <BranchMark className="w-10 h-10 shrink-0" style={{ color: '#1a1a1a' }} />
      <div className="min-w-0">
        <p className="text-sm font-semibold tracking-wide truncate" style={{ color: 'var(--bone)' }}>TAMBOON GARDEN</p>
        <p className="text-xs truncate" style={{ color: 'var(--moss)' }}>Enterprise System</p>
      </div>
    </div>

    <nav className="flex-1 px-4 py-5 space-y-1.5">
      <p className="px-3 mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--moss)' }}>เมนูหลัก</p>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`tg-focus tg-navbtn w-full flex items-center gap-3 px-3.5 py-3 rounded-xl ${active ? 'tg-nav-active' : 'tg-nav-idle'}`}
          >
            <Icon size={18} strokeWidth={1.75} style={{ color: active ? 'var(--sage)' : 'inherit' }} />
            <span className="text-left">
              <span className="block text-sm font-medium" style={{ color: active ? 'var(--sage)' : 'var(--bone)' }}>{item.label}</span>
              <span className="block text-xs" style={{ color: 'var(--moss)' }}>{item.sub}</span>
            </span>
          </button>
        );
      })}
    </nav>

    <div className="px-4 py-5" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="tg-panel p-3.5 space-y-2.5">
        <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--moss)' }}>นิติบุคคลในระบบ</p>
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--sage-soft)', color: 'var(--sage)' }}>
            <Building2 size={13} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--bone)' }}>{ENTITIES.entity1.name}</p>
            <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{ENTITIES.entity1.taxId}</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 pt-2.5" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(217,142,92,0.05)', color: 'var(--moss)' }}>
            <Building2 size={13} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--moss)' }}>Entity 2 — {ENTITIES.entity2.branch}</p>
            <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>รอเพิ่มข้อมูล</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 mt-4 px-1">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0" style={{ background: 'var(--gold-soft)', color: 'var(--gold)' }}>
          ส
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: 'var(--bone)' }}>สมชาย ใจดี</p>
          <p className="text-xs truncate" style={{ color: 'var(--moss)' }}>ผู้บริหาร</p>
        </div>
      </div>
    </div>
  </aside>
);

const MobileNav = ({ page, setPage }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex" style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)' }}>
    {NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      const active = page === item.id;
      return (
        <button
          key={item.id}
          onClick={() => setPage(item.id)}
          className="tg-focus tg-navbtn flex-1 flex flex-col items-center gap-1 py-2.5 text-xs"
          style={{ color: active ? 'var(--sage)' : 'var(--moss)' }}
        >
          <Icon size={17} strokeWidth={1.75} />
          <span className="text-xs leading-none">{item.mobileLabel}</span>
        </button>
      );
    })}
  </div>
);

/* ============================================================
   PAGE 1 — EXECUTIVE DASHBOARD
   ============================================================ */
const ExecutiveDashboard = ({ extraRevenue = 0, directCosts = {} }) => {
  const [companyFilter, setCompanyFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('alerts');
  const adjustedYtd = ytdRevenue + extraRevenue / 1000000;

  // Projects for selected company
  const companyProjects = companyFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => (p.customer || 'ไม่ระบุ') === companyFilter);

  const companyProjectIds = companyProjects.map((p) => p.id);
  const filteredOutstanding = outstandingByProject.filter((g) =>
    companyFilter === 'all' || companyProjectIds.includes(g.projectId)
  );
  const filteredTotal = filteredOutstanding.reduce((sum, g) => sum + g.items.reduce((s, i) => s + i.amount, 0), 0);
  const filteredDocs = filteredOutstanding.reduce((sum, g) => sum + g.items.length, 0);
  const filteredOverdue = filteredOutstanding.reduce((sum, g) => sum + g.items.filter((i) => i.status === 'overdue').length, 0);
  const totalCompanyValue = companyProjects.reduce((s, p) => s + (p.value || 0), 0);
  const totalDirectCost = companyProjects.reduce((s, p) => s + (directCosts[p.id] || 0), 0);

  // All unique company names for dropdown
  const allCompanies = [...new Set(projectsData.map((p) => p.customer || 'ไม่ระบุ'))];

  return (
  <div className="relative p-6 md:p-10 max-w-7xl mx-auto">
    <div className="absolute top-0 right-0 pointer-events-none opacity-5 hidden lg:block" aria-hidden="true">
      <BranchMark className="w-80 h-80 -translate-y-12 translate-x-12" spin style={{ color: '#1a1a1a' }} />
    </div>

    <div className="relative flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--sage)' }}>Executive Dashboard</p>
        <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--bone)' }}>ภาพรวมการเงินและโครงการ</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>บริษัท แต้มบุญ การ์เด้น จำกัด · ทุกนิติบุคคล</p>
      </div>
      <div className="flex flex-wrap gap-3 items-center justify-end ml-auto">
        {/* Company-only dropdown */}
        <div className="relative" style={{ minWidth: 220 }}>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2.5 text-sm"
          >
            <option value="all">ทุกบริษัท / ลูกค้าทั้งหมด</option>
            {allCompanies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
        </div>
        <div className="tg-panel px-4 py-2.5 text-sm shrink-0 whitespace-nowrap flex items-center justify-center gap-2 sm:w-auto" style={{ color: 'var(--moss)' }}>
          <Calendar size={14} strokeWidth={1.75} style={{ color: 'var(--sage)' }} />
          ข้อมูล ณ <span className="tg-mono" style={{ color: 'var(--bone)' }}>11 มิ.ย. 2026</span>
        </div>
      </div>
    </div>

    {extraRevenue > 0 && (
      <div className="relative tg-panel p-4 mb-6 flex items-center gap-3" style={{ borderColor: 'rgba(217,142,92,0.3)' }}>
        <CheckCircle2 size={18} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
        <p className="text-sm" style={{ color: 'var(--bone)' }}>
          ได้รับชำระจากใบเสร็จรับเงินเรียบร้อย <span className="tg-mono font-medium" style={{ color: 'var(--sage)' }}>+{fmtTHB(extraRevenue)} บาท</span> ระบบได้นำยอดดังกล่าวไปรวมในรายได้สะสมด้านล่างแล้ว
        </p>
      </div>
    )}

    {/* Key metrics */}
    <div className="relative grid grid-cols-4 gap-3 mb-6">
      {companyFilter !== 'all' ? (
        <>
          <KPICard compact icon={Wallet} accent="sage" label="มูลค่ารวมทุกโครงการ" value={`${fmtTHB(totalCompanyValue)} บาท`} sub={`${companyProjects.length} โครงการ · ${companyFilter}`} />
          <KPICard compact icon={Receipt} accent="gold" label="ยอดใบวางบิลคงค้าง" value={`${fmtTHB(filteredTotal)} บาท`} sub={`${filteredDocs} รายการ · เลยกำหนด ${filteredOverdue}`} />
          <KPICard compact icon={TrendingUp} accent="sage" label="กำไรขั้นต้น (ประมาณ)" value={`${fmtTHB(Math.max(0, totalCompanyValue - totalDirectCost))} บาท`} sub={totalCompanyValue > 0 ? `อัตรา ${((1 - totalDirectCost / totalCompanyValue) * 100).toFixed(1)}%` : '—'} />
          <KPICard compact icon={TrendingDown} accent="rust" label="รายจ่ายรวม (Direct Cost)" value={`${fmtTHB(totalDirectCost)} บาท`} sub="จากบันทึกหน้างาน" />
        </>
      ) : (
        <>
          <KPICard compact icon={TrendingUp} accent="sage" label="รายได้สะสม (YTD 2026)" value={`${adjustedYtd.toFixed(2)} ล้านบาท`} trend={18.4} sub="เทียบช่วงเดียวกันปีก่อน" />
          <KPICard compact icon={Receipt} accent="gold" label="ยอดใบวางบิลคงค้าง" value={`${fmtTHB(filteredTotal)} บาท`} sub={`${filteredDocs} รายการ · เลยกำหนด ${filteredOverdue}`} />
          <KPICard compact icon={Briefcase} accent="mist" label="โครงการที่กำลังดำเนินการ" value={`${activeProjects.length} โครงการ`} sub={`มูลค่ารวม ${fmtTHB(activeProjectsValue)} บาท`} />
          <KPICard compact icon={Wallet} accent="sage" label="มูลค่าโครงการรวมทั้งหมด" value={`${fmtTHB(totalPipelineValue)} บาท`} sub={`${projectsData.length} โครงการในระบบ`} />
        </>
      )}
    </div>

    {/* When company is selected — show all its projects */}
    {companyFilter !== 'all' && (
      <div className="tg-panel p-5 mb-6">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--bone)' }}>โครงการของ {companyFilter}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-left text-xs uppercase" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
                <th className="pb-2 pr-4 font-medium">โครงการ</th>
                <th className="pb-2 pr-4 font-medium text-right">มูลค่า (บาท)</th>
                <th className="pb-2 pr-4 font-medium text-right">Direct Cost (บาท)</th>
                <th className="pb-2 pr-4 font-medium text-right">กำไร (บาท)</th>
                <th className="pb-2 font-medium">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {companyProjects.map((p) => {
                const dc = directCosts[p.id] || 0;
                const profit = p.value - dc;
                const docs = documentsData.filter((d) => d.projectId === p.id);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="py-2.5 pr-4">
                      <p className="font-medium" style={{ color: 'var(--bone)' }}>{p.name}</p>
                      <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{p.id} · {docs.length} เอกสาร</p>
                    </td>
                    <td className="py-2.5 pr-4 text-right tg-mono" style={{ color: 'var(--bone)' }}>{fmtTHB(p.value)}</td>
                    <td className="py-2.5 pr-4 text-right tg-mono" style={{ color: dc > 0 ? 'var(--rust)' : 'var(--moss)' }}>{fmtTHB(dc)}</td>
                    <td className="py-2.5 pr-4 text-right tg-mono font-semibold" style={{ color: profit >= 0 ? 'var(--sage)' : 'var(--rust)' }}>{fmtTHB(profit)}</td>
                    <td className="py-2.5">
                      <ProjectStatusBadge status={p.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid var(--line-strong)' }}>
                <td className="py-2 pr-4 font-semibold" style={{ color: 'var(--bone)' }}>รวมทั้งหมด</td>
                <td className="py-2 pr-4 text-right tg-mono font-semibold" style={{ color: 'var(--bone)' }}>{fmtTHB(totalCompanyValue)}</td>
                <td className="py-2 pr-4 text-right tg-mono font-semibold" style={{ color: 'var(--rust)' }}>{fmtTHB(totalDirectCost)}</td>
                <td className="py-2 pr-4 text-right tg-mono font-semibold" style={{ color: 'var(--gold)' }}>{fmtTHB(totalCompanyValue - totalDirectCost)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )}

    {/* Sections as tabs — avoid long scrolling */}
    <Tabs
      active={activeTab}
      onChange={setActiveTab}
      tabs={[
        { key: 'alerts', label: 'การแจ้งเตือน', icon: Bell, badge: billNotifications.length },
        { key: 'revenue', label: 'รายได้รายปี', icon: TrendingUp },
        { key: 'outstanding', label: 'ยอดใบวางบิลคงค้าง', icon: Receipt, badge: filteredDocs },
      ]}
    />

    {activeTab === 'alerts' && (
      <div className="tg-panel p-5 md:p-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: 'var(--bone)' }}>
          <Bell size={15} strokeWidth={1.75} style={{ color: 'var(--gold)' }} /> การแจ้งเตือนเอกสาร / บิลใกล้ครบกำหนด
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {billNotifications.map((n) => {
            const overdue = n.diffDays < 0;
            const dueSoon = n.diffDays >= 0 && n.diffDays <= 7;
            const tone = overdue ? 'rust' : dueSoon ? 'gold' : 'mist';
            return (
              <div key={n.doc} className="tg-panel p-3.5" style={{ background: `var(--${tone}-soft)`, borderColor: 'transparent' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="tg-mono text-xs font-medium" style={{ color: 'var(--bone)' }}>{n.doc}</span>
                  {overdue ? <AlertTriangle size={14} style={{ color: 'var(--rust)' }} /> : <Clock size={14} style={{ color: `var(--${tone})` }} />}
                </div>
                <p className="text-xs truncate mb-1" style={{ color: 'var(--moss)' }}>{n.projectName}</p>
                <div className="flex items-center justify-between">
                  <span className="tg-mono text-sm font-semibold" style={{ color: 'var(--bone)' }}>{fmtTHB(n.amount)} บาท</span>
                  <span className="text-xs font-medium" style={{ color: `var(--${tone})` }}>
                    {overdue ? `เลยกำหนด ${Math.abs(n.diffDays)} วัน` : `ครบกำหนดใน ${n.diffDays} วัน`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {activeTab === 'revenue' && (
    <div className="tg-panel p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-1">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--bone)' }}>รายได้รายปี 2026</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>หน่วย: ล้านบาท</p>
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--moss)' }}>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--sage)' }} /> รายได้จริง
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)' }} /> ประมาณการ
          </span>
        </div>
      </div>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.sage} stopOpacity={0.35} />
                <stop offset="95%" stopColor={C.sage} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.gold} stopOpacity={0.18} />
                <stop offset="95%" stopColor={C.gold} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
            <XAxis dataKey="month" stroke={C.line} tick={{ fill: C.moss, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke={C.line} tick={{ fill: C.moss, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => v.toFixed(1)} />
            <Tooltip content={<RevenueTooltip />} />
            <Area type="monotone" dataKey="actual" stroke={C.sage} strokeWidth={2} fill="url(#actualFill)" />
            <Area type="monotone" dataKey="forecast" stroke={C.gold} strokeWidth={2} strokeDasharray="5 5" fill="url(#forecastFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    )}

    {activeTab === 'outstanding' && (
    <div className="tg-panel p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold" style={{ color: 'var(--bone)' }}>ยอดใบวางบิลคงค้าง แยกตามโครงการ</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>{filteredOutstanding.length} โครงการ · {filteredDocs} เอกสาร</p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: 'var(--moss)' }}>ยอดรวม{companyFilter === 'all' ? 'ทั้งหมด' : 'ของบริษัทนี้'}</p>
          <p className="text-lg font-semibold tg-mono" style={{ color: 'var(--gold)' }}>{fmtTHB(filteredTotal)} <span className="text-xs font-normal" style={{ color: 'var(--moss)' }}>บาท</span></p>
        </div>
      </div>

      {filteredOutstanding.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--moss)' }}>ไม่มียอดคงค้างสำหรับโครงการนี้</p>
      ) : (
      <div className="overflow-x-auto tg-scroll">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '640px' }}>
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
              <th className="pb-3 pr-4 font-medium">เลขที่ใบวางบิล</th>
              <th className="pb-3 pr-4 font-medium">วันที่ออก</th>
              <th className="pb-3 pr-4 font-medium">ครบกำหนด</th>
              <th className="pb-3 pr-4 font-medium text-right">จำนวนเงิน (บาท)</th>
              <th className="pb-3 font-medium text-right">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutstanding.map((group) => {
              const subtotal = group.items.reduce((s, i) => s + i.amount, 0);
              return (
                <React.Fragment key={group.projectId}>
                  <tr>
                    <td colSpan={5} className="pt-5 pb-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--bone)' }}>
                          <FolderKanban size={14} style={{ color: 'var(--sage)' }} />
                          {group.projectName}
                          <span className="tg-mono text-xs" style={{ color: 'var(--moss)' }}>({group.projectId})</span>
                        </span>
                        <span className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>
                          ยอดรวม <span style={{ color: 'var(--gold)' }}>{fmtTHB(subtotal)}</span>
                        </span>
                      </div>
                    </td>
                  </tr>
                  {group.items.map((item) => (
                    <tr key={item.doc} className="tg-row" style={{ borderBottom: '1px solid var(--line)' }}>
                      <td className="py-3 pr-4 tg-mono" style={{ color: 'var(--bone)' }}>{item.doc}</td>
                      <td className="py-3 pr-4" style={{ color: 'var(--moss)' }}>{item.issued}</td>
                      <td className="py-3 pr-4" style={{ color: 'var(--moss)' }}>{item.due}</td>
                      <td className="py-3 pr-4 text-right tg-mono font-medium" style={{ color: 'var(--bone)' }}>{fmtTHB(item.amount)}</td>
                      <td className="py-3 text-right"><DocStatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
    </div>
    )}
  </div>
  );
};

/* ============================================================
   PAGE 2 — CRM & PROJECT EXPLORER
   ============================================================ */
const CRMProjectExplorer = () => {
  const [projects, setProjects] = useState(() => {
    // Auto-create a blank new project on first open
    const newId = 'PRJ-NEW-001';
    const blank = { id: newId, name: '', customer: '', contact: '', taxId: '', value: 0, address: '', status: 'active', start: '11/06/2026', entity: 'entity1' };
    return [blank, ...projectsData];
  });
  const [selectedId, setSelectedId] = useState('PRJ-NEW-001');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [entity, setEntity] = useState('entity1');
  const [activeDetailTab, setActiveDetailTab] = useState('customer');
  const [savedNotice, setSavedNotice] = useState(false);

  const project = projects.find((p) => p.id === selectedId);
  const revisions = revisionHistoryData[selectedId] || [];
  const allCompanies = [...new Set(projects.filter((p) => p.customer).map((p) => p.customer))];
  const filteredProjects = companyFilter === 'all' ? projects : projects.filter((p) => (p.customer || '') === companyFilter);

  const handleSelect = (id) => {
    setSelectedId(id);
    const p = projects.find((pr) => pr.id === id);
    if (p) setEntity(p.entity || 'entity1');
  };

  const updateProject = (field, value) => {
    setProjects((prev) => prev.map((p) => (p.id === selectedId ? { ...p, [field]: value } : p)));
  };

  const handleSaveProject = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleNewProject = () => {
    const n = projects.length + 1;
    const newId = `PRJ-NEW-${String(n).padStart(3, '0')}`;
    // If a company is selected, auto-fill its details from the first matching project
    const existingProject = companyFilter !== 'all'
      ? projects.find((p) => (p.customer || '') === companyFilter)
      : null;
    const newProject = {
      id: newId,
      name: '',
      customer: existingProject?.customer || '',
      contact: existingProject?.contact || '',
      taxId: existingProject?.taxId || '',
      address: existingProject?.address || '',
      value: 0,
      status: 'active',
      start: '11/06/2026',
      entity: existingProject?.entity || 'entity1',
    };
    setProjects((prev) => [newProject, ...prev]);
    setSelectedId(newId);
    setEntity(newProject.entity);
    setActiveDetailTab('customer');
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--sage)' }}>CRM &amp; Project Explorer</p>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--bone)' }}>จัดการลูกค้าและโครงการ</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>ทั้งหมด {projects.length} โครงการ</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-end ml-auto">
          <div className="relative" style={{ minWidth: 220 }}>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2.5 text-sm"
            >
              <option value="all">ลูกค้าทั้งหมด</option>
              {allCompanies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
          </div>
          <button
            onClick={handleSaveProject}
            className="tg-focus tg-navbtn flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium shrink-0"
            style={{ background: 'var(--sage)', color: '#fff', borderRadius: '0.75rem' }}
          >
            <Check size={16} strokeWidth={1.75} /> บันทึกลูกค้า
          </button>
          <button onClick={handleNewProject} className="tg-focus tg-panel tg-navbtn flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium shrink-0" style={{ color: 'var(--sage)' }}>
            <Plus size={16} strokeWidth={1.75} /> โครงการใหม่
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="flex items-center gap-2.5 tg-panel p-3.5 mb-4" style={{ borderColor: 'rgba(217,142,92,0.3)', background: 'var(--sage-soft)' }}>
          <CheckCircle2 size={16} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
          <p className="text-sm" style={{ color: 'var(--bone)' }}>บันทึกข้อมูลลูกค้า/โครงการ <strong>{project?.name}</strong> เรียบร้อยแล้ว</p>
        </div>
      )}

      <div className="tg-split tg-85-15">
        {/* Customer info — primary card */}
        <div className="tg-panel">
          <div className="p-6">
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs tg-mono mb-2" style={{ color: 'var(--moss)' }}>
                <span>{project.id}</span><span>•</span><span>เริ่มโครงการ {project.start}</span>
              </div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--bone)' }}>{project.name}</h2>
            </div>

            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: 'var(--bone)' }}>
              <User size={14} strokeWidth={1.75} style={{ color: 'var(--mist)' }} /> ข้อมูลลูกค้า
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* ชื่อโครงการ — เว้นว่างให้ผู้ใช้กรอก */}
              <FormField label="ชื่อโครงการ" value={project.name} onChange={(e) => updateProject('name', e.target.value)} icon={FolderKanban} full placeholder="พิมพ์ชื่อโครงการ..." />

              {/* ข้อมูลบริษัท — เติมอัตโนมัติในช่องกรอกข้อมูล */}
              <FormField label="ชื่อลูกค้า / นิติบุคคล" value={project.customer} onChange={(e) => updateProject('customer', e.target.value)} icon={Building2} full />
              <FormField label="ผู้ติดต่อ" value={project.contact} onChange={(e) => updateProject('contact', e.target.value)} icon={User} full />
              <FormField label="เลขประจำตัวผู้เสียภาษี" value={project.taxId} onChange={(e) => updateProject('taxId', e.target.value)} icon={Hash} mono />
              <FormField label="มูลค่าโครงการ (บาท)" value={project.value} onChange={(e) => updateProject('value', Number(e.target.value) || 0)} icon={DollarSign} mono type="number" />
              <FormField label="ที่อยู่สำหรับออกเอกสาร" value={project.address} onChange={(e) => updateProject('address', e.target.value)} icon={MapPin} area full />
            </div>

            <Tabs
              accent="mist"
              active={activeDetailTab}
              onChange={setActiveDetailTab}
              tabs={[
                { key: 'entity', label: 'Entity & เอกสาร', icon: Building2 },
                { key: 'project', label: 'รายละเอียดโครงการ', icon: FileText },
              ]}
            />

            {activeDetailTab === 'entity' && (
              <div className="tg-panel p-4" style={{ background: 'rgba(217,142,92,0.03)' }}>
                <label className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--moss)' }}>
                  <Building2 size={12} strokeWidth={1.75} /> ออกเอกสารในนาม (Entity)
                </label>
                <div className="relative">
                  <select
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                    className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2.5 text-sm"
                  >
                    <option value="entity1">Entity 1 — {ENTITIES.entity1.name}</option>
                    <option value="entity2">Entity 2 — {ENTITIES.entity2.branch} (บริษัทอื่น)</option>
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                </div>
                {entity === 'entity2' && (
                  <div className="mt-3 space-y-3">
                    <FormField label="ชื่อบริษัทอื่น / ซับคอนแทรค" value={project?.customEntityName || ''} onChange={(e) => updateProject('customEntityName', e.target.value)} icon={Building2} />
                    <FormField label="ที่อยู่" value={project?.customEntityAddress || ''} onChange={(e) => updateProject('customEntityAddress', e.target.value)} icon={MapPin} area />
                    <FormField label="เลขผู้เสียภาษี" value={project?.customEntityTaxId || ''} onChange={(e) => updateProject('customEntityTaxId', e.target.value)} icon={Hash} mono />
                  </div>
                )}
                {entity !== 'entity2' && (
                  <>
                    <div className="flex items-center justify-between mt-3 pt-3 text-xs" style={{ borderTop: '1px solid var(--line)', color: 'var(--moss)' }}>
                      <span>เลขผู้เสียภาษีของนิติบุคคล</span>
                      <span className="tg-mono" style={{ color: 'var(--bone)' }}>{ENTITIES[entity].taxId}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 text-xs" style={{ borderTop: '1px solid var(--line)', color: 'var(--moss)' }}>
                      <span>ชื่อนิติบุคคล (TH)</span>
                      <span style={{ color: 'var(--bone)' }}>{ENTITIES[entity].name}</span>
                    </div>
                    {ENTITIES[entity].nameEn && (
                      <div className="flex items-center justify-between mt-2 pt-2 text-xs" style={{ borderTop: '1px solid var(--line)', color: 'var(--moss)' }}>
                        <span>ชื่อนิติบุคคล (EN)</span>
                        <span className="tg-mono" style={{ color: 'var(--bone)' }}>{ENTITIES[entity].nameEn}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeDetailTab === 'project' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                    <Calendar size={12} strokeWidth={1.75} /> วันที่เริ่มโครงการ
                  </label>
                  <div className="tg-input w-full px-3 py-2 text-sm tg-mono" style={{ color: 'var(--bone)' }}>{project.start}</div>
                </div>
                <div>
                  <label className="text-xs mb-1.5 block" style={{ color: 'var(--moss)' }}>สถานะโครงการ</label>
                  <div className="tg-input w-full px-3 py-2 flex items-center"><ProjectStatusBadge status={project.status} /></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column — all projects + revision history */}
        <div className="flex flex-col gap-5">
          <div className="tg-panel">
            <div className="p-4" style={{ borderBottom: '1px solid var(--line)' }}>
              <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--bone)' }}>
                <FolderKanban size={14} strokeWidth={1.75} style={{ color: 'var(--sage)' }} /> โครงการทั้งหมด
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>{filteredProjects.length} โครงการ{companyFilter !== 'all' ? ` ของ ${companyFilter}` : ''}</p>
            </div>
            <div className="p-3 space-y-1.5 tg-scroll" style={{ maxHeight: 320, overflowY: 'auto' }}>
              {filteredProjects.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className="tg-focus tg-navbtn w-full text-left p-2.5 rounded-lg flex items-center justify-between gap-2"
                    style={{
                      background: active ? 'var(--sage-soft)' : 'transparent',
                      border: `1px solid ${active ? 'rgba(217,142,92,0.3)' : 'transparent'}`,
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: active ? 'var(--sage)' : 'var(--bone)' }}>{p.name}</p>
                      <p className="text-xs tg-mono mt-0.5" style={{ color: 'var(--moss)' }}>{p.id}</p>
                    </div>
                    <ProjectStatusBadge status={p.status} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="tg-panel">
            <div className="p-4" style={{ borderBottom: '1px solid var(--line)' }}>
              <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--bone)' }}>
                <History size={14} strokeWidth={1.75} style={{ color: 'var(--gold)' }} /> Revision History
              </h3>
              <p className="text-xs mt-1 truncate" style={{ color: 'var(--moss)' }}>{project.name}</p>
            </div>
            <div className="p-4">
              {revisions.length === 0 ? (
                <p className="text-sm text-center py-10" style={{ color: 'var(--moss)' }}>ยังไม่มีประวัติการแก้ไข</p>
              ) : (
                revisions.map((rev, i) => (
                  <div key={i} className="relative pl-5" style={{ paddingBottom: i === revisions.length - 1 ? 0 : '1.25rem' }}>
                    {i !== revisions.length - 1 && (
                      <span className="absolute left-1 top-3 bottom-0" style={{ width: 1, background: 'var(--line-strong)' }} />
                    )}
                    <span
                      className="absolute left-0 top-1.5 rounded-full"
                      style={{ width: 8, height: 8, background: rev.type === 'create' ? 'var(--sage)' : 'var(--mist)' }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--bone)' }}>{rev.action}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>{rev.user} · {rev.date} {rev.time}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   PAGE 3 — SEAMLESS DOCUMENT FLOW
   ============================================================ */
const DocumentFlow = ({ paidDocIds, togglePaid }) => {
  const [documents, setDocuments] = useState(documentsData);
  const [selectedProjectId, setSelectedProjectId] = useState(documentsData[0].projectId);
  const [selectedDocId, setSelectedDocId] = useState(documentsData[0].id);
  const [viewStage, setViewStage] = useState(documentsData[0].currentStage);
  const [docPhotoPos, setDocPhotoPos] = useState({});
  const [docPhotoZoom, setDocPhotoZoom] = useState({});
  const [docPhotos, setDocPhotos] = useState({}); // keyed by docId
  const [showDocPhotoReport, setShowDocPhotoReport] = useState(false);
  const [formStates, setFormStates] = useState(() => {
    const acc = {};
    documentsData.forEach((d) => {
      DOC_STAGES.forEach((s) => {
        if (d.docNos[s.key]) {
          acc[`${d.id}__${s.key}`] = {
            lineItems: d.lineItems.map((it) => ({ ...it })),
            docNo: d.docNos[s.key] || '',
            docDate: d.docDates[s.key] || '',
            validity: d.validity || '',
            rev: d.rev || '',
            dueDate: d.dueDate || '',
            qtRef: d.docNos.quotation || '',
            invRef: s.key === 'receipt' ? (d.docNos.tax_invoice || '') : (d.docNos.billing || ''),
            payMethod: d.payMethod || '',
            charges: { opFee: true, wht: true, vat: true },
            note: d.note || '',
            poRef: d.poRef || '',
            poDate: d.poDate || '',
            branchType: d.branchType || 'hq',
            branchName: d.branchName || '',
            checkBank: d.checkBank || '',
            checkNo: d.checkNo || '',
            checkDate: d.checkDate || '',
          };
        }
      });
    });
    return acc;
  });
  const [showPreview, setShowPreview] = useState(false);
  const [rightTabByKey, setRightTabByKey] = useState({});
  const [justSavedKey, setJustSavedKey] = useState(null);

  const projectDocs = documents.filter((d) => d.projectId === selectedProjectId);
  const doc = projectDocs.find((d) => d.id === selectedDocId) || projectDocs[0];
  const project = projectsData.find((p) => p.id === selectedProjectId);
  const formKey = doc ? `${doc.id}__${viewStage}` : null;
  const form = (formKey && formStates[formKey]) || { lineItems: [], docNo: '', docDate: '', validity: '', rev: '', dueDate: '', qtRef: '', invRef: '', payMethod: '', charges: { ...DEFAULT_CHARGES }, note: '', poRef: '', poDate: '', branchType: 'hq', branchName: '', checkBank: '', checkNo: '', checkDate: '' };
  const isPaid = doc ? paidDocIds.includes(doc.id) : false;
  const stageLabel = DOC_STAGES.find((s) => s.key === viewStage).label;
  const isCurrentStage = doc ? viewStage === doc.currentStage : false;
  const rightTab = rightTabByKey[formKey] || 'details';
  const setRightTab = (key) => setRightTabByKey((prev) => ({ ...prev, [formKey]: key }));

  const subTotal = form.lineItems.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);
  const amounts = calcDocAmounts(subTotal, form.charges);

  const updateForm = (field) => (e) => {
    const val = e.target.value;
    setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], [field]: val } }));
  };
  const updateLineItems = (items) => {
    setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], lineItems: items } }));
  };
  const updateCharge = (key) => (checked) => {
    setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], charges: { ...prev[formKey].charges, [key]: checked } } }));
  };
  const handleSave = () => {
    if (form.docNo.includes('XXXX')) {
      const finalNo = form.docNo.replace('XXXX', String(1000 + Math.floor(Math.random() * 9000)));
      setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], docNo: finalNo } }));
    }
    setJustSavedKey(formKey);
    setTimeout(() => setJustSavedKey((k) => (k === formKey ? null : k)), 2500);
  };

  const STAGE_PREFIX = { quotation: 'QT', billing: 'BL', tax_invoice: 'INV', receipt: 'RC' };

  const ensureStage = (stageKey) => {
    if (!doc) return;
    setViewStage(stageKey);
    const key = `${doc.id}__${stageKey}`;
    if (!formStates[key]) {
      const order = DOC_STAGES.map((s) => s.key);
      const idx = order.indexOf(stageKey);
      let source = null;
      for (let i = idx - 1; i >= 0; i--) {
        const k = `${doc.id}__${order[i]}`;
        if (formStates[k]) { source = formStates[k]; break; }
      }
      setFormStates((prev) => ({
        ...prev,
        [key]: {
          lineItems: source ? source.lineItems.map((it) => ({ ...it })) : [{ id: 'L1', desc: '', qty: 1, unit: 'งาน', price: 0 }],
          docNo: `${STAGE_PREFIX[stageKey]}2026-XXXX`,
          docDate: '11/06/2026',
          validity: stageKey === 'quotation' ? '30 วัน' : (source?.validity || ''),
          rev: '0',
          dueDate: stageKey === 'billing' ? '07/07/2026' : (source?.dueDate || ''),
          qtRef: stageKey === 'billing' ? (source?.docNo || '') : (source?.qtRef || ''),
          invRef: stageKey === 'receipt' ? (source?.docNo || '') : (source?.invRef || ''),
          payMethod: source?.payMethod || '',
          charges: source?.charges ? { ...source.charges } : { ...DEFAULT_CHARGES },
          note: '',
          poRef: stageKey === 'tax_invoice' ? (source?.poRef || '') : (source?.poRef || ''),
          poDate: stageKey === 'tax_invoice' ? (source?.poDate || '') : (source?.poDate || ''),
          branchType: source?.branchType || 'hq',
          branchName: source?.branchName || '',
          checkBank: source?.checkBank || '',
          checkNo: source?.checkNo || '',
          checkDate: source?.checkDate || '',
        },
      }));
    }
  };

  // For a project that has no document at all yet — create the very first one
  const startFirstDocument = (stageKey) => {
    const newId = `DOC-${selectedProjectId}`;
    const newDoc = {
      id: newId,
      projectId: selectedProjectId,
      projectName: project.name,
      customer: project.customer,
      entity: project.entity,
      currentStage: stageKey,
      docNos: { [stageKey]: `${STAGE_PREFIX[stageKey]}2026-XXXX` },
      docDates: { [stageKey]: '11/06/2026' },
      lineItems: [{ id: 'L1', desc: project.name, qty: 1, unit: 'งาน', price: project.value || 0 }],
      validity: '30 วัน',
      rev: '0',
      dueDate: stageKey === 'billing' ? '11/07/2026' : '',
      payMethod: '',
    };
    setDocuments((prev) => [...prev, newDoc]);
    setSelectedDocId(newId);
    setFormStates((prev) => ({
      ...prev,
      [`${newId}__${stageKey}`]: {
        lineItems: newDoc.lineItems.map((it) => ({ ...it })),
        docNo: newDoc.docNos[stageKey],
        docDate: newDoc.docDates[stageKey],
        validity: newDoc.validity,
        rev: newDoc.rev,
        dueDate: newDoc.dueDate,
        qtRef: '',
        invRef: '',
        payMethod: '',
        charges: { ...DEFAULT_CHARGES },
        note: '',
        poRef: '',
        poDate: '',
        branchType: 'hq',
        branchName: '',
        checkBank: '',
        checkNo: '',
        checkDate: '',
      },
    }));
    setViewStage(stageKey);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    const ds = documents.filter((dd) => dd.projectId === projectId);
    if (ds.length > 0) {
      setSelectedDocId(ds[0].id);
      setViewStage(ds[0].currentStage);
    } else {
      setSelectedDocId(null);
      setViewStage('quotation');
    }
  };

  // Start an additional document series (e.g. a 2nd quotation) for a project that already has one
  const startNewDocSeries = (stageKey) => {
    const existingCount = documents.filter((d) => d.projectId === selectedProjectId).length;
    const newId = `DOC-${selectedProjectId}-${existingCount + 1}`;
    const newDoc = {
      id: newId,
      projectId: selectedProjectId,
      projectName: project.name,
      customer: project.customer,
      entity: project.entity,
      currentStage: stageKey,
      docNos: { [stageKey]: `${STAGE_PREFIX[stageKey]}2026-XXXX` },
      docDates: { [stageKey]: '11/06/2026' },
      lineItems: [{ id: 'L1', desc: project.name, qty: 1, unit: 'งาน', price: project.value || 0 }],
      validity: '30 วัน',
      rev: '0',
      dueDate: stageKey === 'billing' ? '11/07/2026' : '',
      payMethod: '',
    };
    setDocuments((prev) => [...prev, newDoc]);
    setFormStates((prev) => ({
      ...prev,
      [`${newId}__${stageKey}`]: {
        lineItems: newDoc.lineItems.map((it) => ({ ...it })),
        docNo: newDoc.docNos[stageKey],
        docDate: newDoc.docDates[stageKey],
        validity: newDoc.validity,
        rev: newDoc.rev,
        dueDate: newDoc.dueDate,
        qtRef: '',
        invRef: '',
        payMethod: '',
        charges: { ...DEFAULT_CHARGES },
        note: '',
        poRef: '',
        poDate: '',
        branchType: 'hq',
        branchName: '',
        checkBank: '',
        checkNo: '',
        checkDate: '',
      },
    }));
    setSelectedDocId(newId);
    setViewStage(stageKey);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--sage)' }}>Seamless Document Flow</p>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--bone)' }}>ระบบจัดการเอกสารแบบไร้รอยต่อ</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>ใบเสนอราคา → ใบวางบิล → ใบกำกับภาษี → ใบเสร็จรับเงิน · พร้อมคำนวณภาษีอัตโนมัติ</p>
        </div>
        <ProjectSearchSelect value={selectedProjectId} onChange={handleProjectSelect} items={projectsData} placeholder="ค้นหาโครงการ..." />
      </div>

      {doc ? (
      <div className="tg-split tg-15-85">
        {/* Left column — issuance history */}
        <div className="order-2 tg-panel flex flex-col">
          <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--line)' }}>
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--bone)' }}>
              <History size={14} strokeWidth={1.75} style={{ color: 'var(--gold)' }} /> ประวัติออกเอกสาร
            </h3>
            {projectDocs.length > 1 && (
              <div className="relative mb-2">
                <select
                  value={doc.id}
                  onChange={(e) => {
                    const d = documents.find((dd) => dd.id === e.target.value);
                    setSelectedDocId(d.id);
                    setViewStage(d.currentStage);
                  }}
                  className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-xs"
                >
                  {projectDocs.map((d, i) => (
                    <option key={d.id} value={d.id}>ชุดเอกสารที่ {i + 1} — {d.id}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
              </div>
            )}
            <button
              onClick={() => startNewDocSeries('quotation')}
              className="tg-focus tg-navbtn w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(217,142,92,0.03)', border: '1px solid var(--line)', color: 'var(--sage)' }}
            >
              <Plus size={13} strokeWidth={1.75} /> เริ่มชุดเอกสารใหม่ (เช่น ใบเสนอราคาใหม่)
            </button>
          </div>
            <div className="p-4">
              <p className="text-xs tg-mono mb-3" style={{ color: 'var(--moss)' }}>{doc.id} · {doc.projectName}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--moss)' }}>คลิกรายการเพื่อเปิดดู/แก้ไขเอกสารฉบับนั้น</p>
              {(() => {
                const entries = DOC_STAGES
                  .filter((s) => doc.docNos[s.key])
                  .map((s) => ({ key: s.key, label: s.label, docNo: doc.docNos[s.key], date: doc.docDates[s.key] }))
                  .sort((a, b) => parseThDate(b.date) - parseThDate(a.date));
                return entries.length === 0 ? (
                  <p className="text-sm text-center py-10" style={{ color: 'var(--moss)' }}>ยังไม่มีเอกสารที่ออก</p>
                ) : entries.map((e) => {
                  const isOpen = e.key === viewStage;
                  return (
                    <button
                      key={e.key}
                      onClick={() => setViewStage(e.key)}
                      className="tg-focus tg-navbtn w-full text-left p-3 rounded-xl mb-2"
                      style={{
                        background: isOpen ? 'var(--gold-soft)' : 'rgba(217,142,92,0.03)',
                        border: `1px solid ${isOpen ? 'rgba(201,162,39,0.35)' : 'var(--line)'}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-medium" style={{ color: isOpen ? 'var(--gold)' : 'var(--bone)' }}>ออก{e.label}</p>
                        {e.key === doc.currentStage && (
                          <span className="tg-badge tg-badge-sage" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>ปัจจุบัน</span>
                        )}
                      </div>
                      <p className="text-xs tg-mono mt-0.5" style={{ color: 'var(--moss)' }}>{e.docNo}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>{e.date}</p>
                    </button>
                  );
                });
              })()}
            </div>
        </div>

        {/* Right panel — wider now (9/12) */}
        <div className="order-1 tg-panel">
          <div className="p-6">
            <div className="mb-5">
              <div className="flex items-center gap-2 text-xs tg-mono mb-2" style={{ color: 'var(--moss)' }}>
                <span>{doc.id}</span><span>•</span><span>{doc.projectId}</span><span>•</span>
                <span>Entity: {ENTITIES[doc.entity].name || ENTITIES[doc.entity].branch}</span>
              </div>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--bone)' }}>{doc.projectName}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>{doc.customer}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              {DOC_STAGES.map((s, i) => {
                const issued = !!doc.docNos[s.key];
                const active = viewStage === s.key;
                return (
                  <React.Fragment key={s.key}>
                    {i > 0 && <span style={{ color: 'var(--moss)' }}>→</span>}
                    <button
                      onClick={() => ensureStage(s.key)}
                      className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: active ? 'var(--gold-soft)' : issued ? 'var(--sage-soft)' : 'rgba(217,142,92,0.03)',
                        border: `1px solid ${active ? 'rgba(201,162,39,0.4)' : issued ? 'rgba(217,142,92,0.3)' : 'var(--line)'}`,
                        color: active ? 'var(--gold)' : issued ? 'var(--sage)' : 'var(--moss)',
                      }}
                    >
                      {issued ? <CheckCircle2 size={13} strokeWidth={1.75} /> : <FileText size={13} strokeWidth={1.75} />}
                      {s.label}
                      {s.key === doc.currentStage && <span className="tg-mono" style={{ fontSize: '0.65rem' }}>(ปัจจุบัน)</span>}
                    </button>
                  </React.Fragment>
                );
              })}
              <span style={{ color: 'var(--moss)' }}>·</span>
              <button
                onClick={() => setShowDocPhotoReport(true)}
                className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: showDocPhotoReport ? 'var(--sage-soft)' : 'rgba(217,142,92,0.03)', border: '1px solid var(--line)', color: 'var(--sage)' }}
              >
                <Camera size={13} strokeWidth={1.75} />
                ภาพถ่าย {(docPhotos[selectedDocId] || []).length > 0 && `(${(docPhotos[selectedDocId] || []).length})`}
              </button>
            </div>

            {!doc.docNos[viewStage] ? (
              <div className="flex flex-wrap items-center gap-3 tg-panel p-3.5 mb-5" style={{ background: 'var(--sage-soft)', borderColor: 'rgba(217,142,92,0.3)' }}>
                <p className="text-sm" style={{ color: 'var(--bone)' }}>
                  กำลังร่าง <span className="font-medium" style={{ color: 'var(--sage)' }}>{DOC_TITLES[viewStage]}</span> ฉบับใหม่ — ข้อมูลดึงต่อจากเอกสารขั้นก่อนหน้า สามารถปรับแก้แล้วกด "บันทึก{stageLabel}" เพื่อยืนยันเลขที่เอกสาร
                </p>
              </div>
            ) : !isCurrentStage && (
              <div className="flex flex-wrap items-center justify-between gap-3 tg-panel p-3.5 mb-5" style={{ background: 'var(--gold-soft)', borderColor: 'rgba(201,162,39,0.35)' }}>
                <p className="text-sm" style={{ color: 'var(--bone)' }}>
                  กำลังดูเอกสารย้อนหลัง: <span className="font-medium" style={{ color: 'var(--gold)' }}>{DOC_TITLES[viewStage]} {form.docNo}</span>
                </p>
                <button
                  onClick={() => setViewStage(doc.currentStage)}
                  className="tg-focus tg-navbtn px-3 py-1.5 rounded-lg text-xs font-medium shrink-0"
                  style={{ background: 'var(--panel)', border: '1px solid rgba(201,162,39,0.35)', color: 'var(--gold)' }}
                >
                  กลับไปเอกสารปัจจุบัน
                </button>
              </div>
            )}

            <Tabs
              accent="gold"
              active={rightTab}
              onChange={setRightTab}
              tabs={[
                { key: 'details', label: 'รายละเอียดเอกสาร', icon: FileText },
                { key: 'status', label: 'สถานะเอกสาร', icon: CheckCircle2 },
              ]}
            />

            {/* Status */}
            {rightTab === 'status' && (
              <div className="tg-panel p-5" style={{ background: 'rgba(217,142,92,0.03)' }}>
                <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--moss)' }}>สถานะเอกสาร</p>
                <div className="overflow-x-auto tg-scroll" style={{ paddingBottom: 4 }}>
                  <div style={{ minWidth: 460 }}>
                    <DocumentStepper stage={doc.currentStage} docNos={doc.docNos} docDates={doc.docDates} />
                  </div>
                </div>
              </div>
            )}

            {/* Document details — two clearly-separated columns */}
            {rightTab === 'details' && (
              <div className="space-y-5">
              <div className="tg-panel p-5 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: document reference fields */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>รายละเอียดเอกสาร — {stageLabel}</h3>
                    <FormField label="เลขที่เอกสาร" value={form.docNo} onChange={updateForm('docNo')} icon={FileText} mono />
                    <p className="text-xs -mt-2" style={{ color: 'var(--moss)' }}>เลขที่เอกสารจะคงเดิม แม้แก้ไขข้อมูลอื่น จนกว่าจะกดบันทึกหรือส่งออก PDF</p>
                    <FormField label="วันที่" value={form.docDate} onChange={updateForm('docDate')} icon={Calendar} mono type="date" />
                    {viewStage === 'quotation' && (
                      <>
                        <FormField label="ยืนราคา (Validity)" value={form.validity} onChange={updateForm('validity')} icon={Clock} />
                        <FormField label="Rev" value={form.rev} onChange={updateForm('rev')} icon={History} mono />
                        <FormField label="หมายเหตุ (Note)" value={form.note} onChange={updateForm('note')} icon={FileText} area />
                      </>
                    )}
                    {viewStage === 'billing' && (
                      <>
                        <FormField label="อ้างอิงใบเสนอราคา (QT_Ref)" value={form.qtRef} onChange={updateForm('qtRef')} icon={ClipboardList} mono />
                        <FormField label="ครบกำหนด (Due Date)" value={form.dueDate} onChange={updateForm('dueDate')} icon={Calendar} mono type="date" />
                      </>
                    )}
                    {viewStage === 'tax_invoice' && (
                      <>
                        <FormField label="อ้างอิงใบวางบิล (INV_Ref)" value={form.invRef} onChange={updateForm('invRef')} icon={Receipt} mono />
                        <FormField label="เลขอ้างอิง PO" value={form.poRef} onChange={updateForm('poRef')} icon={ClipboardList} mono />
                        <FormField label="วันที่ PO" value={form.poDate} onChange={updateForm('poDate')} icon={Calendar} mono type="date" />
                        <div>
                          <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                            <Building2 size={12} strokeWidth={1.75} /> ออกในนาม
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--bone)' }}>
                              <input type="radio" name={`branchType-${formKey}`} checked={form.branchType === 'hq'} onChange={() => setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], branchType: 'hq' } }))} />
                              สำนักงานใหญ่
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--bone)' }}>
                              <input type="radio" name={`branchType-${formKey}`} checked={form.branchType === 'branch'} onChange={() => setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], branchType: 'branch' } }))} />
                              สาขา
                              <input
                                type="text"
                                value={form.branchName}
                                onChange={(e) => setFormStates((prev) => ({ ...prev, [formKey]: { ...prev[formKey], branchType: 'branch', branchName: e.target.value } }))}
                                placeholder="พิมพ์ชื่อสาขา..."
                                className="tg-input tg-focus px-2.5 py-1.5 text-sm flex-1"
                              />
                            </label>
                          </div>
                        </div>
                        <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--moss)' }}>
                          <Copy size={12} strokeWidth={1.75} /> เมื่อพิมพ์/พรีวิว ระบบจะออกให้ทั้ง "ต้นฉบับ" และ "สำเนา" ต่อกัน 2 หน้าโดยอัตโนมัติ
                        </p>
                      </>
                    )}
                    {viewStage === 'receipt' && (
                      <>
                        <div>
                          <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                            <Wallet size={12} strokeWidth={1.75} /> ชำระโดย (Pay Method)
                          </label>
                          <div className="relative">
                            <select
                              value={form.payMethod}
                              onChange={updateForm('payMethod')}
                              className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-sm"
                            >
                              <option value="">— เลือกวิธีชำระ —</option>
                              <option value="โอนเงินผ่านธนาคาร">โอนเงินผ่านธนาคาร</option>
                              <option value="เงินสด">เงินสด</option>
                              <option value="เช็ค">เช็ค</option>
                            </select>
                            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                          </div>
                        </div>
                        {form.payMethod === 'เช็ค' && (
                          <div className="space-y-3 pl-3 ml-1" style={{ borderLeft: '2px solid var(--line)' }}>
                            <FormField label="ธนาคาร" value={form.checkBank} onChange={updateForm('checkBank')} icon={Building2} />
                            <FormField label="เลขที่เช็ค" value={form.checkNo} onChange={updateForm('checkNo')} icon={Hash} mono />
                            <FormField label="วันที่ (หน้าเช็ค)" value={form.checkDate} onChange={updateForm('checkDate')} icon={Calendar} mono type="date" />
                          </div>
                        )}
                        <FormField label="บิลอ้างอิง (INV_Ref)" value={form.invRef} onChange={updateForm('invRef')} icon={Receipt} mono />
                        <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--moss)' }}>
                          <Copy size={12} strokeWidth={1.75} /> เมื่อพิมพ์/พรีวิว ระบบจะออกให้ทั้ง "ต้นฉบับ" และ "สำเนา" ต่อกัน 2 หน้าโดยอัตโนมัติ
                        </p>
                      </>
                    )}
                  </div>

                  {/* Right: customer info — shifted right with a divider for clear separation */}
                  <div className="space-y-4 lg:pl-8 lg:border-l" style={{ borderColor: 'var(--line)' }}>
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>ข้อมูลลูกค้า</h3>
                    <FormField label="ชื่อลูกค้า (Customer_Name)" value={project.contact} icon={User} />
                    <FormField label="ชื่อบริษัท (Customer_Company)" value={project.customer} icon={Building2} />
                    <FormField label="เลขผู้เสียภาษี (Customer_TaxID)" value={project.taxId} icon={Hash} mono />
                    <FormField label="โครงการ (Project_Name)" value={doc.projectName} icon={FolderKanban} />
                    <FormField label="ที่อยู่ (Customer_Address)" value={project.address} icon={MapPin} area />
                  </div>
                </div>
              </div>

            {/* Line items */}
              <div className="tg-panel p-5">
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--bone)' }}>รายการสินค้า / บริการ</h3>
                <LineItemsEditor items={form.lineItems} onChange={updateLineItems} />
              </div>

            {/* Calculation + Preview + Receipt payment */}
              <div className="space-y-5">
                <div className="tg-panel p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>ระบบคำนวณราคาอัตโนมัติ</h3>
                    <p className="text-xs" style={{ color: 'var(--moss)' }}>Sub_Total → Op_Fee 10% → WHT_3 → VAT_7 → {DOC_TOTAL_LABEL[viewStage]}</p>
                  </div>

                  <div className="tg-panel p-4 mb-4" style={{ background: 'rgba(217,142,92,0.03)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--bone)' }}>ตัวเลือกการคำนวณ</p>
                    <p className="text-xs mb-2" style={{ color: 'var(--moss)' }}>เลือกได้ว่าเอกสารฉบับนี้ต้องคิดค่าธรรมเนียม/ภาษีรายการใดบ้าง</p>
                    <Toggle label="ค่าดำเนินการ 10% (Op_Fee)" checked={form.charges.opFee} onChange={updateCharge('opFee')} />
                    <Toggle label="หัก ณ ที่จ่าย 3% (WHT_3)" checked={form.charges.wht} onChange={updateCharge('wht')} />
                    <Toggle label="ภาษีมูลค่าเพิ่ม 7% (VAT_7)" checked={form.charges.vat} onChange={updateCharge('vat')} />
                  </div>

                  <div className="mt-3">
                    <BreakdownRow label="รวมเงิน (Sub_Total)" value={amounts.base} />
                    <BreakdownRow label={`ค่าดำเนินการ 10% (Op_Fee)${form.charges.opFee ? '' : ' — ไม่คิด'}`} value={amounts.opFee} op={form.charges.opFee ? '+' : undefined} muted={!form.charges.opFee} />
                    <BreakdownRow label={`หัก ณ ที่จ่าย 3% (WHT_3)${form.charges.wht ? '' : ' — ไม่คิด'}`} value={amounts.wht} op={form.charges.wht ? '-' : undefined} muted={!form.charges.wht} />
                    <BreakdownRow label={`ภาษีมูลค่าเพิ่ม 7% (VAT_7)${form.charges.vat ? '' : ' — ไม่คิด'}`} value={amounts.vat} op={form.charges.vat ? '+' : undefined} muted={!form.charges.vat} />
                    <div className="flex items-center justify-between pt-3 mt-1" style={{ borderTop: '1px solid var(--line-strong)' }}>
                      <span className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>{DOC_TOTAL_LABEL[viewStage]}</span>
                      <span className="tg-mono text-lg font-semibold" style={{ color: 'var(--gold)' }}>{amounts.net.toLocaleString("en-US")} <span className="text-sm font-normal" style={{ color: 'var(--moss)' }}>บาท</span></span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'var(--moss)' }}>ตัวอักษร (Thai_Baht_Text): {bahtText(amounts.net)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSave}
                    className="tg-focus tg-navbtn flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.3)', color: 'var(--sage)' }}
                  >
                    <Check size={16} strokeWidth={1.75} /> บันทึก{stageLabel}
                  </button>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="tg-focus tg-navbtn flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{ background: 'var(--sage)', color: '#fff' }}
                  >
                    <Printer size={16} strokeWidth={1.75} /> พรีวิว / พิมพ์เอกสาร
                  </button>
                </div>
                {justSavedKey === formKey && (
                  <div className="flex items-center gap-2.5 tg-panel p-3.5" style={{ borderColor: 'rgba(217,142,92,0.3)' }}>
                    <CheckCircle2 size={16} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
                    <p className="text-sm" style={{ color: 'var(--bone)' }}>
                      บันทึก{stageLabel} <span className="tg-mono font-medium" style={{ color: 'var(--sage)' }}>{form.docNo}</span> เรียบร้อย — เลขที่เอกสารยังคงเดิม
                    </p>
                  </div>
                )}

                {/* Receipt payment status */}
                {viewStage === 'receipt' && (
                  <div className="tg-panel p-5">
                    <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--bone)' }}>สถานะการรับชำระ — {form.docNo}</h3>
                    <p className="text-xs mb-4" style={{ color: 'var(--moss)' }}>อัปเดตสถานะใบเสร็จรับเงิน หากรับเงินแล้วระบบจะนำยอดสุทธิไปรวมใน Executive Dashboard ให้อัตโนมัติ</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => togglePaid(doc.id, false)}
                        className="tg-focus tg-navbtn flex-1 px-4 py-3 rounded-xl text-sm font-medium"
                        style={{
                          background: !isPaid ? 'var(--rust-soft)' : 'rgba(217,142,92,0.03)',
                          border: `1px solid ${!isPaid ? 'rgba(192,96,74,0.35)' : 'var(--line)'}`,
                          color: !isPaid ? 'var(--rust)' : 'var(--moss)',
                        }}
                      >
                        ยังไม่ได้รับเงิน
                      </button>
                      <button
                        onClick={() => togglePaid(doc.id, true)}
                        className="tg-focus tg-navbtn flex-1 px-4 py-3 rounded-xl text-sm font-medium"
                        style={{
                          background: isPaid ? 'var(--sage-soft)' : 'rgba(217,142,92,0.03)',
                          border: `1px solid ${isPaid ? 'rgba(217,142,92,0.3)' : 'var(--line)'}`,
                          color: isPaid ? 'var(--sage)' : 'var(--moss)',
                        }}
                      >
                        รับเงินแล้ว
                      </button>
                    </div>
                    {isPaid && (
                      <div className="flex items-center gap-2.5 mt-4 tg-panel p-3.5" style={{ borderColor: 'rgba(217,142,92,0.3)' }}>
                        <CheckCircle2 size={16} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
                        <p className="text-sm" style={{ color: 'var(--bone)' }}>
                          บันทึกรับชำระ <span className="tg-mono font-medium" style={{ color: 'var(--sage)' }}>{amounts.net.toLocaleString("en-US")} บาท</span> เรียบร้อย — ยอดถูกย้ายไปรวมใน Executive Dashboard แล้ว
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
      ) : (
        <div className="tg-panel p-8 text-center">
          <FolderKanban size={32} strokeWidth={1.5} style={{ color: 'var(--sage)', margin: '0 auto 0.75rem' }} />
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--bone)' }}>{project.name}</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--moss)' }}>โครงการนี้ยังไม่มีเอกสารใดๆ — เลือกเอกสารที่ต้องการออกเป็นฉบับแรกสำหรับโครงการนี้</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DOC_STAGES.map((s) => (
              <button
                key={s.key}
                onClick={() => startFirstDocument(s.key)}
                className="tg-focus tg-navbtn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
                style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.3)', color: 'var(--sage)' }}
              >
                <FileText size={16} strokeWidth={1.75} /> ออก{s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showPreview && (
        <DocumentPreview doc={doc} project={project} formData={form} amounts={amounts} stage={viewStage} copyLabel={null} onClose={() => setShowPreview(false)} />
      )}

      {/* Photo panel */}
      {showDocPhotoReport && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(110,80,55,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
          <div className="tg-panel" style={{ maxWidth: 900, width: '100%', margin: '0.5rem 0', maxHeight: '94vh', overflowY: 'auto', padding: '32px 36px', background: '#fff' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold" style={{ color: 'var(--bone)' }}>ภาพถ่ายหน้างาน</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>
                  อ้างอิงเอกสาร: <span className="tg-mono">{(formStates[formKey] || {}).docNo || `(${DOC_TITLES[viewStage] || 'เอกสาร'})`}</span>
                </p>
              </div>
              <button onClick={() => setShowDocPhotoReport(false)} className="tg-focus tg-navbtn px-3 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--line)', color: 'var(--moss)' }}>ปิด</button>
            </div>
            <div className="tg-photo-print-area">
            <PhotoGalleryUploader
              photos={docPhotos[selectedDocId] || []}
              onChange={(p) => setDocPhotos((prev) => ({ ...prev, [selectedDocId]: p }))}
              photoPos={docPhotoPos}
              onPhotoPosChange={setDocPhotoPos}
              photoZoom={docPhotoZoom}
              onPhotoZoomChange={setDocPhotoZoom}
            />
            </div>
            {(docPhotos[selectedDocId] || []).length > 0 && (
              <button
                onClick={() => {
                  const docNo = (formStates[formKey] || {}).docNo || 'DOC';
                  const area = document.querySelector('.tg-photo-print-area');
                  if (!area) return;
                  const w = window.open('', '_blank', 'width=900,height=700');
                  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>ภาพถ่ายหน้างาน_${docNo}</title>
                  <style>
                    @page { size: A4; margin: 10mm; }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: sans-serif; background: #fff; }
                    img { max-width: 100%; height: auto; display: block; }
                    .tg-noprint { display: none !important; }
                  </style></head><body>${area.innerHTML}</body></html>`);
                  w.document.close();
                  setTimeout(() => { w.focus(); w.print(); w.close(); }, 800);
                }}
                className="tg-focus tg-navbtn flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: 'var(--sage)', color: '#fff' }}
              >
                <Printer size={16} strokeWidth={1.75} /> พิมพ์ / บันทึก PDF
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   PAGE 4 — HR & EMPLOYEE CARD
   ============================================================ */
const HREmployeeCard = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedId, setSelectedId] = useState(employeesData[0].id);
  const [siteFilter, setSiteFilter] = useState('all');
  const [cardEntity, setCardEntity] = useState('entity1');
  const [customCompanyName, setCustomCompanyName] = useState('');
  const [mobileTab, setMobileTab] = useState('table');
  const [employeePhotos, setEmployeePhotos] = useState({});
  const [employeeWages, setEmployeeWages] = useState({});
  const [payrollInputs, setPayrollInputs] = useState({});
  const [showPayrollPDF, setShowPayrollPDF] = useState(false);
  const [payrollEmployee, setPayrollEmployee] = useState(null);
  const [socialSecurity, setSocialSecurity] = useState(750); // default 750/month
  const [expenseClaims, setExpenseClaims] = useState({}); // {empId: [{id, desc, amount}]}
  const getWage = (id) => employeeWages[id] ?? 450;
  const updateWage = (id, val) => setEmployeeWages((prev) => ({ ...prev, [id]: Number(val) || 0 }));
  const getPayroll = (id) => payrollInputs[id] || { workDays: 26, otHours: 0, advance: 0 };
  const updatePayroll = (id, field, val) => setPayrollInputs((prev) => ({ ...prev, [id]: { ...getPayroll(id), [field]: Number(val) || 0 } }));
  const [employeeDocs, setEmployeeDocs] = useState({});
  const [cardSelectedId, setCardSelectedId] = useState(employeesData[0].id);
  const [cardSingleId, setCardSingleId] = useState(null);
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [exportNotice, setExportNotice] = useState('');
  const blankEmployee = { name: '', nickname: '', position: '', site: '', projectId: null, phone: '', start: '11/06/2026', contractEnd: '', status: 'active', blood: '', emergencyContact: '', wage: 450 };
  const [newEmployee, setNewEmployee] = useState(blankEmployee);

  const employee = employees.find((e) => e.id === selectedId) || employees[0];
  const cardEmployee = employees.find((e) => e.id === cardSelectedId) || employees[0];

  const filteredEmployees = siteFilter === 'all'
    ? employees
    : employees.filter((e) => e.projectId === siteFilter || e.projectId === null);

  const handleDelete = (e, emp) => {
    e.stopPropagation();
    if (!window.confirm(`ลบพนักงาน "${emp.name}" (${emp.id}) ออกจากระบบ?`)) return;
    setEmployees((prev) => prev.filter((x) => x.id !== emp.id));
    if (selectedId === emp.id) {
      const remaining = employees.filter((x) => x.id !== emp.id);
      if (remaining.length > 0) setSelectedId(remaining[0].id);
    }
  };

  const handleBulkDelete = () => {
    const project = projectsData.find((p) => p.id === siteFilter);
    const targets = employees.filter((e) => e.projectId === siteFilter);
    if (targets.length === 0) return;
    if (!window.confirm(`ลบพนักงานทั้งหมด ${targets.length} คน ของโครงการ "${project?.name || siteFilter}"?`)) return;
    setEmployees((prev) => prev.filter((e) => e.projectId !== siteFilter));
    setSiteFilter('all');
  };

  const handlePhotoUpload = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setEmployeePhotos((prev) => ({ ...prev, [id]: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleDocUpload = (id, kind, file) => {
    if (!file) return;
    setEmployeeDocs((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), [kind]: file.name } }));
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name.trim()) return;
    const n = employees.length + 15;
    const id = `EMP-2026-${String(n).padStart(3, '0')}`;
    setEmployees((prev) => [...prev, { ...newEmployee, id }]);
    setEmployeeWages((prev) => ({ ...prev, [id]: Number(newEmployee.wage) || 450 }));
    if (newEmployee._photo) {
      setEmployeePhotos((prev) => ({ ...prev, [id]: newEmployee._photo }));
    }
    setNewEmployee(blankEmployee);
    setShowAddEmployee(false);
    setSelectedId(id);
  };

  const handleIssueCard = (emp) => {
    setCardSelectedId(emp.id);
    setCardSingleId(emp.id);
    setMobileTab('card');
  };

  const updateEmployeeStatus = (id, status) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    setDetailEmployee((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const handleExportProjectCards = () => {
    const project = projectsData.find((p) => p.id === siteFilter);
    const targets = employees.filter((e) => e.projectId === siteFilter);
    setExportNotice(`กำลังส่งออกบัตรพนักงาน ${targets.length} คน ของโครงการ "${project?.name || siteFilter}" (ตัวอย่าง)`);
    setTimeout(() => setExportNotice(''), 3500);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--sage)' }}>HR & Employee Card</p>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--bone)' }}>จัดการพนักงานชั่วคราว</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>ทั้งหมด {employees.length} คน · คลิกแถวเพื่อพรีวิวบัตรพนักงาน</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 justify-end ml-auto">
          <ProjectSearchSelect
            value={siteFilter}
            onChange={(v) => setSiteFilter(v)}
            allowAllLabel="ทุกไซต์งาน / ทุกโครงการ"
            placeholder="ค้นหาโครงการ / ไซต์งาน..."
          />
          {mobileTab === 'table' && siteFilter !== 'all' && (
            <button
              onClick={handleBulkDelete}
              className="tg-focus tg-navbtn flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium shrink-0"
              style={{ background: 'var(--rust-soft)', border: '1px solid rgba(192,96,74,0.3)', color: 'var(--rust)' }}
            >
              <Trash2 size={15} strokeWidth={1.75} /> ลบพนักงานในโครงการนี้ทั้งหมด
            </button>
          )}
          {mobileTab === 'card' && siteFilter !== 'all' && (
            <button
              onClick={handleExportProjectCards}
              className="tg-focus tg-navbtn flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium shrink-0"
              style={{ background: 'var(--sage)', color: '#fff' }}
            >
              <CreditCard size={15} strokeWidth={1.75} /> ออกบัตรพนักงานทั้งโครงการ
            </button>
          )}
          {mobileTab === 'table' && (
            <button
              onClick={() => setShowAddEmployee(true)}
              className="tg-focus tg-navbtn flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium shrink-0"
              style={{ background: 'var(--sage)', color: '#fff' }}
            >
              <UserPlus size={15} strokeWidth={1.75} /> เพิ่มพนักงาน
            </button>
          )}
        </div>
      </div>

      {exportNotice && (
        <div className="flex items-center gap-2.5 tg-panel p-3.5 mb-4" style={{ borderColor: 'rgba(217,142,92,0.3)', background: 'var(--sage-soft)' }}>
          <CheckCircle2 size={16} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
          <p className="text-sm" style={{ color: 'var(--bone)' }}>{exportNotice}</p>
        </div>
      )}

      <div>
        <Tabs
          active={mobileTab}
          onChange={(key) => { setMobileTab(key); setCardSingleId(null); }}
          accent="mist"
          tabs={[
            { key: 'table', label: 'ตารางพนักงาน', icon: Users },
            { key: 'card', label: 'บัตรพนักงาน', icon: ClipboardList },
            { key: 'payroll', label: 'เงินเดือน', icon: Wallet },
          ]}
        />
      </div>

      <div className="w-full">
        {/* Employee table */}
        <div className={`tg-panel p-5 md:p-6 ${mobileTab === 'table' ? 'block' : 'hidden'}`}>
          <div className="overflow-x-auto tg-scroll">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '640px' }}>
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
                  <th className="pb-3 pr-4 font-medium">รหัส</th>
                  <th className="pb-3 pr-4 font-medium">ชื่อ-นามสกุล</th>
                  <th className="pb-3 pr-4 font-medium">ตำแหน่ง</th>
                  <th className="pb-3 pr-4 font-medium">ไซต์งาน</th>
                  <th className="pb-3 pr-4 font-medium">สัญญาถึง</th>
                  <th className="pb-3 font-medium text-right">สถานะ</th>
                  <th className="pb-3 pl-3 font-medium text-right">บัตร</th>
                  <th className="pb-3 pl-3 font-medium text-right">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => {
                  const active = e.id === selectedId;
                  const status = employeeStatusMap[e.status];
                  return (
                    <tr
                      key={e.id}
                      onClick={() => { setSelectedId(e.id); setDetailEmployee(e); }}
                      className="tg-row"
                      style={{ borderBottom: '1px solid var(--line)', cursor: 'pointer', background: active ? 'var(--sage-soft)' : 'transparent' }}
                    >
                      <td className="py-3 pr-4 tg-mono" style={{ color: active ? 'var(--sage)' : 'var(--moss)' }}>{e.id}</td>
                      <td className="py-3 pr-4 font-medium" style={{ color: 'var(--bone)' }}>{e.name}</td>
                      <td className="py-3 pr-4" style={{ color: 'var(--moss)' }}>{e.position}</td>
                      <td className="py-3 pr-4" style={{ color: 'var(--moss)' }}>{e.site}</td>
                      <td className="py-3 pr-4 tg-mono" style={{ color: 'var(--moss)' }}>{e.contractEnd}</td>
                      <td className="py-3 text-right"><span className={`tg-badge ${status.cls}`}>{status.label}</span></td>
                      <td className="py-3 pl-3 text-right">
                        <button
                          onClick={(ev) => { ev.stopPropagation(); handleIssueCard(e); }}
                          className="tg-focus tg-navbtn p-1.5 rounded-lg"
                          style={{ color: 'var(--sage)' }}
                          title="ออกบัตรพนักงาน"
                        >
                          <CreditCard size={15} strokeWidth={1.75} />
                        </button>
                      </td>
                      <td className="py-3 pl-3 text-right">
                        <button
                          onClick={(ev) => handleDelete(ev, e)}
                          className="tg-focus tg-navbtn p-1.5 rounded-lg"
                          style={{ color: 'var(--rust)' }}
                          title="ลบพนักงาน"
                        >
                          <Trash2 size={15} strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-sm" style={{ color: 'var(--moss)' }}>ไม่พบพนักงานในไซต์งานนี้</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card preview */}
        <div className={`${mobileTab === 'card' ? 'block' : 'hidden'}`}>
          <div className="tg-split tg-50-50">
            <div className="tg-panel p-5 md:p-6">
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--bone)' }}>เลือกพนักงานเพื่อออกบัตร</h3>
              {cardSingleId ? (
                <>
                  <p className="text-xs mb-4" style={{ color: 'var(--moss)' }}>กำลังออกบัตรให้พนักงานที่เลือกไว้</p>
                  <div className="p-3 rounded-xl mb-3" style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.3)' }}>
                    <p className="text-sm font-medium" style={{ color: 'var(--sage)' }}>{cardEmployee?.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>{cardEmployee?.position} · {cardEmployee?.site}</p>
                  </div>
                  <button
                    onClick={() => setCardSingleId(null)}
                    className="tg-focus tg-navbtn w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium mb-5"
                    style={{ background: 'rgba(217,142,92,0.03)', border: '1px solid var(--line)', color: 'var(--moss)' }}
                  >
                    <Users size={13} strokeWidth={1.75} /> เลือกพนักงานคนอื่น
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs mb-4" style={{ color: 'var(--moss)' }}>{siteFilter === 'all' ? 'แสดงพนักงานทั้งหมด — เลือกโครงการด้านบนเพื่อกรอง' : `พนักงานในโครงการที่เลือก (${filteredEmployees.length} คน)`}</p>
                  <div className="space-y-2 mb-5">
                    {filteredEmployees.map((e) => {
                      const active = e.id === cardSelectedId;
                      return (
                        <button
                          key={e.id}
                          onClick={() => setCardSelectedId(e.id)}
                          className="tg-focus tg-navbtn w-full text-left p-3 rounded-xl flex items-center justify-between gap-2"
                          style={{
                            background: active ? 'var(--sage-soft)' : 'rgba(217,142,92,0.03)',
                            border: `1px solid ${active ? 'rgba(217,142,92,0.3)' : 'var(--line)'}`,
                          }}
                        >
                          <div>
                            <p className="text-sm font-medium" style={{ color: active ? 'var(--sage)' : 'var(--bone)' }}>{e.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>{e.position} · {e.site}</p>
                          </div>
                          <span className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>{e.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--bone)' }}>ตั้งค่าบัตร</h3>
              <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                <Building2 size={12} strokeWidth={1.75} /> นิติบุคคลที่จะแสดงบนบัตร
              </label>
              <div className="relative mb-4">
                <select
                  value={cardEntity}
                  onChange={(e) => setCardEntity(e.target.value)}
                  className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2.5 text-sm"
                >
                  <option value="entity1">Entity 1 — {ENTITIES.entity1.name}</option>
                  <option value="entity2">Entity 2 — {ENTITIES.entity2.branch}</option>
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
              </div>

              {cardEntity === 'entity2' && (
                <FormField label="ชื่อบริษัท (สำหรับบัตรนี้)" value={customCompanyName} onChange={(e) => setCustomCompanyName(e.target.value)} icon={Building2} placeholder="ระบุชื่อบริษัทอื่น / ซับคอนแทรค" />
              )}

              <div className="mt-4">
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                  <Camera size={12} strokeWidth={1.75} /> รูปพนักงาน (สำหรับบัตรนี้)
                </label>
                <label className="tg-focus tg-navbtn flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer" style={{ background: 'rgba(217,142,92,0.03)', border: '1px dashed var(--line-strong)', color: 'var(--moss)' }}>
                  <Upload size={14} strokeWidth={1.75} />
                  {employeePhotos[cardSelectedId] ? 'เปลี่ยนรูป' : 'อัปโหลดรูป'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(cardSelectedId, e.target.files?.[0])} />
                </label>
              </div>

              <button
                onClick={() => { setExportNotice(`ส่งออกบัตรพนักงาน ${cardEmployee?.name} เรียบร้อย (ตัวอย่าง)`); setTimeout(() => setExportNotice(''), 3500); }}
                className="tg-focus tg-navbtn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium mt-5"
                style={{ background: 'var(--sage)', color: '#fff' }}
              >
                <CreditCard size={16} strokeWidth={1.75} /> ส่งออกบัตรพนักงาน
              </button>
            </div>

            <div className="tg-panel p-5 md:p-6">
              <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--bone)' }}>พรีวิวบัตรพนักงาน (CR80 แนวตั้ง)</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--moss)' }}>{cardEmployee?.name}</p>

              <EmployeeCard employee={cardEmployee} entityKey={cardEntity} customCompanyName={customCompanyName} photoUrl={employeePhotos[cardSelectedId] || cardEmployee?._photo} />

              <div className="grid grid-cols-2 gap-4 mt-6 pt-5" style={{ borderTop: '1px solid var(--line)' }}>
                <div>
                  <p className="text-xs" style={{ color: 'var(--moss)' }}>เบอร์ติดต่อ</p>
                  <p className="text-sm tg-mono mt-0.5" style={{ color: 'var(--bone)' }}>{cardEmployee?.phone}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--moss)' }}>เริ่มงาน</p>
                  <p className="text-sm tg-mono mt-0.5" style={{ color: 'var(--bone)' }}>{cardEmployee?.start}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll tab */}
      <div className={`${mobileTab === 'payroll' ? 'block' : 'hidden'} tg-panel p-5 md:p-6`}>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-1">
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--bone)' }}>สรุปเงินเดือนพนักงานทั่วไป</h3>
            <p className="text-xs" style={{ color: 'var(--moss)' }}>คิดค่าแรงตามวันทำงาน + OT (1.5 เท่าของค่าแรงต่อชั่วโมง) หักเงินเบิกล่วงหน้า · {siteFilter === 'all' ? 'พนักงานทั้งหมด' : `เฉพาะโครงการที่เลือก`} ({filteredEmployees.length} คน)</p>
          </div>
          <button
            onClick={() => setShowPayrollPDF(true)}
            className="tg-focus tg-navbtn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shrink-0"
            style={{ background: 'var(--sage)', color: '#fff' }}
          >
            <Printer size={15} strokeWidth={1.75} /> สรุปจ่ายเป็น PDF
          </button>
        </div>

        <div className="overflow-x-auto tg-scroll mt-4">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
                <th className="pb-3 pr-4 font-medium">ชื่อ-นามสกุล</th>
                <th className="pb-3 pr-4 font-medium text-right">ค่าแรง/วัน</th>
                <th className="pb-3 pr-4 font-medium text-right">วันทำงาน</th>
                <th className="pb-3 pr-4 font-medium text-right" style={{ color: 'var(--sage)' }}>= รวมค่าแรง</th>
                <th className="pb-3 pr-4 font-medium text-right">OT (ชม.)</th>
                <th className="pb-3 pr-4 font-medium text-right" style={{ color: 'var(--mist)' }}>= รวม OT</th>
                <th className="pb-3 pr-4 font-medium text-right">เบิกล่วงหน้า</th>
                <th className="pb-3 font-medium text-right">ยอดสุทธิ</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((e) => {
                const wage = getWage(e.id);
                const p = getPayroll(e.id);
                const otRate = (wage / 8) * 1.5;
                const baseTotal = wage * p.workDays;
                const otTotal = otRate * p.otHours;
                const net = baseTotal + otTotal - p.advance;
                return (
                  <tr key={e.id} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td className="py-2.5 pr-4 font-medium" style={{ color: 'var(--bone)' }}>{e.name}</td>
                    <td className="py-2.5 pr-4 text-right">
                      <input type="number" value={wage} onFocus={(e) => e.target.select()} onChange={(ev) => updateWage(e.id, ev.target.value)} className="tg-input tg-focus w-24 px-2 py-1.5 text-sm tg-mono text-right" />
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <input type="number" value={p.workDays} onFocus={(e) => e.target.select()} onChange={(ev) => updatePayroll(e.id, 'workDays', ev.target.value)} className="tg-input tg-focus w-20 px-2 py-1.5 text-sm tg-mono text-right" />
                    </td>
                    <td className="py-2.5 pr-4 text-right tg-mono text-xs" style={{ color: 'var(--sage)' }}>{fmtTHB(baseTotal)}</td>
                    <td className="py-2.5 pr-4 text-right">
                      <input type="number" value={p.otHours} onFocus={(e) => e.target.select()} onChange={(ev) => updatePayroll(e.id, 'otHours', ev.target.value)} className="tg-input tg-focus w-20 px-2 py-1.5 text-sm tg-mono text-right" />
                    </td>
                    <td className="py-2.5 pr-4 text-right tg-mono text-xs" style={{ color: 'var(--mist)' }}>{fmtTHB(otTotal)}</td>
                    <td className="py-2.5 pr-4 text-right">
                      <input type="number" value={p.advance} onFocus={(e) => e.target.select()} onChange={(ev) => updatePayroll(e.id, 'advance', ev.target.value)} className="tg-input tg-focus w-24 px-2 py-1.5 text-sm tg-mono text-right" />
                    </td>
                    <td className="py-2.5 text-right tg-mono font-semibold" style={{ color: 'var(--sage)' }}>{fmtTHB(net)}</td>
                    <td className="py-2.5 pl-2">
                      <button onClick={() => setPayrollEmployee(e)} className="tg-focus tg-navbtn px-2 py-1.5 rounded-lg text-xs" style={{ background: 'var(--sage-soft)', color: 'var(--sage)', border: '1px solid rgba(217,142,92,0.25)' }}>
                        สลิป
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid var(--line-strong)' }}>
                <td colSpan={7} className="py-3 pr-4 text-right font-semibold" style={{ color: 'var(--bone)' }}>รวมยอดจ่ายทั้งหมด</td>
                <td className="py-3 text-right tg-mono font-semibold text-lg" style={{ color: 'var(--gold)' }}>
                  {fmtTHB(filteredEmployees.reduce((sum, e) => {
                    const wage = getWage(e.id);
                    const p = getPayroll(e.id);
                    const otRate = (wage / 8) * 1.5;
                    return sum + wage * p.workDays + otRate * p.otHours - p.advance;
                  }, 0))} <span className="text-xs font-normal" style={{ color: 'var(--moss)' }}>บาท</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Employee detail modal */}
      {detailEmployee && (
        <div className="tg-modal-backdrop" onClick={() => setDetailEmployee(null)}>
          <div className="tg-panel tg-scroll" style={{ maxWidth: 520, width: '100%', margin: '0.5rem 0', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div style={{ width: 56, height: 56, borderRadius: '9999px', overflow: 'hidden', background: 'var(--sage-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-strong)', flexShrink: 0 }}>
                  {employeePhotos[detailEmployee.id] || detailEmployee._photo ? (
                    <img src={employeePhotos[detailEmployee.id] || detailEmployee._photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={26} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--bone)' }}>{detailEmployee.name}</h3>
                  <p className="text-xs tg-mono mt-0.5" style={{ color: 'var(--moss)' }}>{detailEmployee.id}</p>
                </div>
              </div>
              <button onClick={() => setDetailEmployee(null)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--moss)' }}><X size={18} strokeWidth={1.75} /></button>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <FormField label="ชื่อ-นามสกุล" value={detailEmployee.name} onChange={(e) => setDetailEmployee((p) => ({ ...p, name: e.target.value }))} icon={User} full />
              <FormField label="ชื่อเล่น" value={detailEmployee.nickname || ''} onChange={(e) => setDetailEmployee((p) => ({ ...p, nickname: e.target.value }))} icon={User} />
              <FormField label="ตำแหน่ง" value={detailEmployee.position} onChange={(e) => setDetailEmployee((p) => ({ ...p, position: e.target.value }))} icon={Briefcase} />
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}><MapPin size={12} /> ไซต์งาน</label>
                <div className="relative">
                  <select value={detailEmployee.site || ''} onChange={(e) => setDetailEmployee((p) => ({ ...p, site: e.target.value }))} className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-sm">
                    <option value="">— เลือกไซต์งาน —</option>
                    {projectsData.filter((p) => p.status === 'active').map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="สำนักงาน">สำนักงาน</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}><CheckCircle2 size={12} /> สถานะ</label>
                <div className="relative">
                  <select value={detailEmployee.status} onChange={(e) => { updateEmployeeStatus(detailEmployee.id, e.target.value); setDetailEmployee((p) => ({ ...p, status: e.target.value })); }} className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-sm">
                    {Object.entries(employeeStatusMap).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                </div>
              </div>
              <FormField label="เบอร์ติดต่อ" value={detailEmployee.phone} onChange={(e) => setDetailEmployee((p) => ({ ...p, phone: e.target.value }))} icon={Phone} mono />
              <FormField label="เริ่มงาน" value={detailEmployee.start} onChange={(e) => setDetailEmployee((p) => ({ ...p, start: e.target.value }))} icon={Calendar} mono type="date" />
              <FormField label="สัญญาถึง" value={detailEmployee.contractEnd || ''} onChange={(e) => setDetailEmployee((p) => ({ ...p, contractEnd: e.target.value }))} icon={Calendar} mono type="date" />
              <FormField label="กรุ๊ปเลือด" value={detailEmployee.blood || ''} onChange={(e) => setDetailEmployee((p) => ({ ...p, blood: e.target.value }))} icon={Heart} />
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}><Wallet size={12} /> ค่าแรง (บาท/วัน)</label>
                <input type="number" value={getWage(detailEmployee.id)} onFocus={(e) => e.target.select()} onChange={(e) => updateWage(detailEmployee.id, e.target.value)} className="tg-input tg-focus w-full px-3 py-2 text-sm tg-mono" />
              </div>
              <FormField label="ติดต่อกรณีฉุกเฉิน" value={detailEmployee.emergencyContact || ''} onChange={(e) => setDetailEmployee((p) => ({ ...p, emergencyContact: e.target.value }))} icon={Phone} full />
            </div>

            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--bone)' }}>เอกสารประจำตัว</h4>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {['idCard', 'passport'].map((kind) => (
                <label key={kind} className="tg-focus tg-navbtn flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl text-xs cursor-pointer text-center" style={{ background: 'rgba(217,142,92,0.03)', border: '1px dashed var(--line-strong)', color: 'var(--moss)' }}>
                  <Upload size={16} strokeWidth={1.75} />
                  {kind === 'idCard' ? 'บัตรประชาชน' : 'พาสปอร์ต'}
                  {employeeDocs[detailEmployee.id]?.[kind] && <span className="tg-mono mt-1" style={{ color: 'var(--sage)' }}>{employeeDocs[detailEmployee.id][kind]}</span>}
                  <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => handleDocUpload(detailEmployee.id, kind, e.target.files?.[0])} />
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEmployees((prev) => prev.map((e) => e.id === detailEmployee.id ? { ...detailEmployee } : e));
                  setDetailEmployee(null);
                }}
                className="tg-focus tg-navbtn flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: 'var(--sage)', color: '#fff' }}
              >
                <Check size={16} strokeWidth={1.75} /> บันทึกการแก้ไข
              </button>
              <button
                onClick={() => { handleIssueCard(detailEmployee); setDetailEmployee(null); }}
                className="tg-focus tg-navbtn flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ border: '1px solid var(--line)', color: 'var(--sage)' }}
              >
                <CreditCard size={16} strokeWidth={1.75} /> ออกบัตร
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add employee modal */}
      {showAddEmployee && (
        <div className="tg-modal-backdrop" onClick={() => setShowAddEmployee(false)}>
          <div className="tg-panel tg-scroll" style={{ maxWidth: 560, width: '100%', margin: '0.5rem 0', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--bone)' }}>รับพนักงานเข้าใหม่</h3>
              <button onClick={() => setShowAddEmployee(false)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--moss)' }}><X size={18} strokeWidth={1.75} /></button>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                <Camera size={12} strokeWidth={1.75} /> รูปพนักงาน
              </label>
              <div className="flex items-center gap-3">
                <div style={{ width: 56, height: 56, borderRadius: '9999px', overflow: 'hidden', background: 'var(--sage-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line-strong)', flexShrink: 0 }}>
                  {newEmployee._photo ? <img src={newEmployee._photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={26} strokeWidth={1.5} style={{ color: 'var(--sage)' }} />}
                </div>
                <label className="tg-focus tg-navbtn flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer" style={{ background: 'rgba(217,142,92,0.03)', border: '1px dashed var(--line-strong)', color: 'var(--moss)' }}>
                  <Upload size={14} strokeWidth={1.75} /> อัปโหลดรูป
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { const reader = new FileReader(); reader.onload = () => setNewEmployee((p) => ({ ...p, _photo: reader.result })); reader.readAsDataURL(f); } }} />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <FormField label="ชื่อ-นามสกุล" value={newEmployee.name} onChange={(e) => setNewEmployee((p) => ({ ...p, name: e.target.value }))} icon={User} full />
              <FormField label="ชื่อเล่น" value={newEmployee.nickname} onChange={(e) => setNewEmployee((p) => ({ ...p, nickname: e.target.value }))} icon={User} />
              <FormField label="ตำแหน่ง" value={newEmployee.position} onChange={(e) => setNewEmployee((p) => ({ ...p, position: e.target.value }))} icon={Briefcase} />
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}><MapPin size={12} strokeWidth={1.75} /> ไซต์งาน / โครงการ</label>
                <div className="relative">
                  <select value={newEmployee.site} onChange={(e) => setNewEmployee((p) => ({ ...p, site: e.target.value }))} className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-sm">
                    <option value="">— เลือกไซต์งาน —</option>
                    {projectsData.filter((p) => p.status === 'active').map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                    <option value="สำนักงาน">สำนักงาน</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                </div>
              </div>
              <FormField label="เบอร์ติดต่อ" value={newEmployee.phone} onChange={(e) => setNewEmployee((p) => ({ ...p, phone: e.target.value }))} icon={Phone} mono />
              <FormField label="วันที่เริ่มงาน" value={newEmployee.start} onChange={(e) => setNewEmployee((p) => ({ ...p, start: e.target.value }))} icon={Calendar} mono type="date" />
              <FormField label="สัญญาถึง" value={newEmployee.contractEnd} onChange={(e) => setNewEmployee((p) => ({ ...p, contractEnd: e.target.value }))} icon={Calendar} mono type="date" />
              <FormField label="กรุ๊ปเลือด" value={newEmployee.blood} onChange={(e) => setNewEmployee((p) => ({ ...p, blood: e.target.value }))} icon={User} />
              <FormField label="ค่าแรง (บาท/วัน)" value={newEmployee.wage} onChange={(e) => setNewEmployee((p) => ({ ...p, wage: e.target.value }))} icon={Wallet} mono type="number" />
              <FormField label="ติดต่อกรณีฉุกเฉิน" value={newEmployee.emergencyContact} onChange={(e) => setNewEmployee((p) => ({ ...p, emergencyContact: e.target.value }))} icon={Phone} full />
            </div>

            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--bone)' }}>เอกสารประจำตัว</h4>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {['idCard', 'passport'].map((kind) => (
                <label key={kind} className="tg-focus tg-navbtn flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl text-xs cursor-pointer text-center" style={{ background: 'rgba(217,142,92,0.03)', border: '1px dashed var(--line-strong)', color: 'var(--moss)' }}>
                  <Upload size={16} strokeWidth={1.75} />
                  {kind === 'idCard' ? 'บัตรประชาชน' : 'พาสปอร์ต'}
                  {newEmployee[`_doc_${kind}`] && <span className="tg-mono mt-1" style={{ color: 'var(--sage)' }}>{newEmployee[`_doc_${kind}`]}</span>}
                  <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setNewEmployee((p) => ({ ...p, [`_doc_${kind}`]: f.name })); }} />
                </label>
              ))}
            </div>

            <button
              onClick={handleAddEmployee}
              className="tg-focus tg-navbtn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ background: 'var(--sage)', color: '#fff' }}
            >
              <UserPlus size={16} strokeWidth={1.75} /> บันทึกพนักงานใหม่
            </button>
          </div>
        </div>
      )}

      {/* Payroll PDF preview */}
      {/* ─────────────── Individual payslip modal ─────────────── */}
      {payrollEmployee && (() => {
        const e = payrollEmployee;
        const wage = getWage(e.id);
        const p = getPayroll(e.id);
        const otRate = (wage / 8) * 1.5;
        const basePay = wage * p.workDays;
        const otPay = otRate * p.otHours;
        const claims = expenseClaims[e.id] || [];
        const totalClaims = claims.reduce((s, c) => s + (Number(c.amount) || 0), 0);
        // Per-employee social security — stored in payrollInputs as ss field
        const ss = Number(p.ss ?? 750);
        const net = basePay + otPay + totalClaims - ss - (p.advance || 0);

        const addClaim = () => setExpenseClaims((prev) => ({ ...prev, [e.id]: [...(prev[e.id] || []), { id: Date.now(), desc: '', amount: 0 }] }));
        const updateClaim = (cid, field, val) => setExpenseClaims((prev) => ({ ...prev, [e.id]: prev[e.id].map((c) => c.id === cid ? { ...c, [field]: val } : c) }));
        const removeClaim = (cid) => setExpenseClaims((prev) => ({ ...prev, [e.id]: prev[e.id].filter((c) => c.id !== cid) }));
        const updateSS = (val) => updatePayroll(e.id, 'ss', val);

        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(110,80,55,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1.5rem', overflowY: 'auto' }}>
            <div className="tg-panel" style={{ maxWidth: 680, width: '100%', margin: '0.5rem 0', background: '#fff', overflow: 'hidden' }}>

              {/* ── Controls (hidden when printing) ── */}
              <div className="tg-noprint p-6 space-y-4" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--moss)' }}>กรอกรายละเอียดเงินเดือน</p>
                    <h2 className="text-base font-semibold" style={{ color: 'var(--bone)' }}>{e.name} · <span className="tg-mono text-sm">{e.id}</span></h2>
                    <p className="text-xs" style={{ color: 'var(--moss)' }}>{e.position} · ไซต์งาน: {e.site || '—'}</p>
                  </div>
                  <button onClick={() => setPayrollEmployee(null)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--moss)' }}><X size={18} strokeWidth={1.75} /></button>
                </div>

                {/* Inputs grid */}
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>ค่าแรง/วัน (฿)</label>
                    <input type="number" value={wage} onFocus={(ev) => ev.target.select()} onChange={(ev) => updateWage(e.id, ev.target.value)} className="tg-input tg-focus w-full px-2.5 py-2 text-sm tg-mono" />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>วันทำงาน</label>
                    <input type="number" value={p.workDays} onFocus={(ev) => ev.target.select()} onChange={(ev) => updatePayroll(e.id, 'workDays', ev.target.value)} className="tg-input tg-focus w-full px-2.5 py-2 text-sm tg-mono" />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>OT (ชม.)</label>
                    <input type="number" value={p.otHours} onFocus={(ev) => ev.target.select()} onChange={(ev) => updatePayroll(e.id, 'otHours', ev.target.value)} className="tg-input tg-focus w-full px-2.5 py-2 text-sm tg-mono" />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>เบิกล่วงหน้า (฿)</label>
                    <input type="number" value={p.advance || 0} onFocus={(ev) => ev.target.select()} onChange={(ev) => updatePayroll(e.id, 'advance', ev.target.value)} className="tg-input tg-focus w-full px-2.5 py-2 text-sm tg-mono" />
                  </div>
                </div>

                {/* Social security */}
                <div className="flex items-center gap-3">
                  <div style={{ flex: '0 0 auto' }}>
                    <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>ประกันสังคม (฿/เดือน)</label>
                    <input type="number" value={ss} onFocus={(ev) => ev.target.select()} onChange={(ev) => updateSS(ev.target.value)} className="tg-input tg-focus w-36 px-2.5 py-2 text-sm tg-mono" />
                  </div>
                  <p className="text-xs pt-5" style={{ color: 'var(--moss)' }}>อัตราประกันสังคม 5% ของค่าจ้าง (สูงสุด 750 บาท/เดือน)</p>
                </div>

                {/* Expense claims */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold" style={{ color: 'var(--bone)' }}>รายการเบิกเพิ่มเติม</label>
                    <button onClick={addClaim} className="tg-focus tg-navbtn flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs" style={{ background: 'var(--sage-soft)', color: 'var(--sage)', border: '1px solid rgba(217,142,92,0.25)' }}>
                      <Plus size={12} strokeWidth={2} /> เพิ่มรายการ
                    </button>
                  </div>
                  {claims.length === 0 && <p className="text-xs" style={{ color: 'var(--moss)' }}>ยังไม่มีรายการเบิก — กด "เพิ่มรายการ" เพื่อเพิ่ม</p>}
                  <div className="space-y-2">
                    {claims.map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <input value={c.desc} onChange={(ev) => updateClaim(c.id, 'desc', ev.target.value)} placeholder="รายละเอียด เช่น ค่าน้ำมัน, ค่าเดินทาง..." className="tg-input tg-focus flex-1 px-2.5 py-1.5 text-sm" />
                        <input type="number" value={c.amount} onFocus={(ev) => ev.target.select()} onChange={(ev) => updateClaim(c.id, 'amount', ev.target.value)} placeholder="จำนวนเงิน" className="tg-input tg-focus tg-mono w-28 px-2.5 py-1.5 text-sm text-right" />
                        <button onClick={() => removeClaim(c.id)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--rust)' }}><Trash2 size={14} strokeWidth={1.75} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid var(--line)' }}>
                  <button
                    onClick={() => {
                      const prevTitle = document.title;
                      document.title = `สลิปเงินเดือน_${e.name}`;
                      window.print();
                      setTimeout(() => { document.title = prevTitle; }, 1000);
                    }}
                    className="tg-focus tg-navbtn flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: 'var(--sage)', color: '#fff' }}
                  >
                    <Printer size={15} strokeWidth={1.75} /> ส่งออก PDF / พิมพ์สลิป
                  </button>
                  <button onClick={() => setPayrollEmployee(null)} className="tg-focus tg-navbtn px-4 py-2.5 rounded-xl text-sm" style={{ border: '1px solid var(--line)', color: 'var(--moss)' }}>ปิด</button>
                </div>
              </div>

              {/* ── PAYSLIP — printed document ── */}
              <div className="tg-print-area p-8" style={{ minHeight: 400 }}>
                {/* Header */}
                <div className="flex items-start justify-between pb-4 mb-5" style={{ borderBottom: '2px solid #1a1a1a' }}>
                  <div className="flex items-start gap-3">
                    <BranchMark className="w-14 h-14 shrink-0" style={{ color: '#1a1a1a' }} />
                    <div>
                      <p className="font-bold text-sm" style={{ color: '#1a1a1a' }}>บริษัท แต้มบุญ การ์เด้น จำกัด</p>
                      <p className="text-xs mt-0.5" style={{ color: '#555' }}>59/54 หมู่ 4 ต.ลำโพ อ.บางบัวทอง จ.นนทบุรี 11110</p>
                      <p className="text-xs" style={{ color: '#555' }}>โทร 086-824-1872</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base" style={{ color: '#1a1a1a' }}>สลิปเงินเดือน</p>
                    <p className="text-xs tg-mono mt-0.5" style={{ color: '#555' }}>PAYSLIP</p>
                    <p className="text-xs tg-mono mt-1" style={{ color: '#555' }}>วันที่ออก: {new Date().toLocaleDateString('th-TH', { day:'2-digit', month:'2-digit', year:'numeric' })}</p>
                  </div>
                </div>

                {/* Employee info */}
                <div className="grid grid-cols-2 gap-x-8 mb-5 pb-4 text-sm" style={{ borderBottom: '1px solid #ddd' }}>
                  <p><span style={{ color: '#888' }}>ชื่อพนักงาน: </span><span style={{ color: '#1a1a1a', fontWeight: 600 }}>{e.name}</span></p>
                  <p><span style={{ color: '#888' }}>รหัส: </span><span className="tg-mono" style={{ color: '#1a1a1a' }}>{e.id}</span></p>
                  <p className="mt-1"><span style={{ color: '#888' }}>ตำแหน่ง: </span><span style={{ color: '#1a1a1a' }}>{e.position}</span></p>
                  <p className="mt-1"><span style={{ color: '#888' }}>ไซต์งาน: </span><span style={{ color: '#1a1a1a' }}>{e.site || '—'}</span></p>
                </div>

                {/* Earnings table */}
                <table className="w-full text-sm mb-4" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f5f0eb' }}>
                      <th className="text-left py-2 px-3 font-semibold" style={{ color: '#1a1a1a', border: '1px solid #ddd', width: '50%' }}>รายการรายรับ</th>
                      <th className="text-right py-2 px-3 font-semibold" style={{ color: '#1a1a1a', border: '1px solid #ddd' }}>คำนวณ</th>
                      <th className="text-right py-2 px-3 font-semibold" style={{ color: '#1a1a1a', border: '1px solid #ddd' }}>จำนวน (บาท)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-3" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>ค่าแรงพื้นฐาน</td>
                      <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#555', fontSize: 11 }}>{wage} × {p.workDays} วัน</td>
                      <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>{fmtTHB(basePay)}</td>
                    </tr>
                    {p.otHours > 0 && (
                      <tr>
                        <td className="py-2 px-3" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>ค่าล่วงเวลา (OT)</td>
                        <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#555', fontSize: 11 }}>{otRate.toFixed(2)} × {p.otHours} ชม.</td>
                        <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>{fmtTHB(otPay)}</td>
                      </tr>
                    )}
                    {claims.map((c) => (
                      <tr key={c.id}>
                        <td className="py-2 px-3" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>{c.desc || 'รายการเบิก'}</td>
                        <td className="py-2 px-3" style={{ border: '1px solid #ddd' }}></td>
                        <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>{fmtTHB(Number(c.amount) || 0)}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#f9f6f2' }}>
                      <td colSpan={2} className="py-2 px-3 font-semibold" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>รวมรายรับ</td>
                      <td className="py-2 px-3 text-right tg-mono font-semibold" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>{fmtTHB(basePay + otPay + totalClaims)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Deductions */}
                <table className="w-full text-sm mb-4" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f5f0eb' }}>
                      <th className="text-left py-2 px-3 font-semibold" style={{ color: '#1a1a1a', border: '1px solid #ddd', width: '50%' }}>รายการหัก</th>
                      <th className="text-right py-2 px-3" style={{ border: '1px solid #ddd' }}></th>
                      <th className="text-right py-2 px-3 font-semibold" style={{ color: '#1a1a1a', border: '1px solid #ddd' }}>จำนวน (บาท)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-3" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>ประกันสังคม</td>
                      <td className="py-2 px-3" style={{ border: '1px solid #ddd' }}></td>
                      <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#c00' }}>{fmtTHB(ss)}</td>
                    </tr>
                    {(p.advance || 0) > 0 && (
                      <tr>
                        <td className="py-2 px-3" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>เงินเบิกล่วงหน้า</td>
                        <td className="py-2 px-3" style={{ border: '1px solid #ddd' }}></td>
                        <td className="py-2 px-3 text-right tg-mono" style={{ border: '1px solid #ddd', color: '#c00' }}>{fmtTHB(p.advance)}</td>
                      </tr>
                    )}
                    <tr style={{ background: '#f9f6f2' }}>
                      <td colSpan={2} className="py-2 px-3 font-semibold" style={{ border: '1px solid #ddd', color: '#1a1a1a' }}>รวมรายหัก</td>
                      <td className="py-2 px-3 text-right tg-mono font-semibold" style={{ border: '1px solid #ddd', color: '#c00' }}>{fmtTHB(ss + (p.advance || 0))}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Net pay */}
                <div className="flex items-center justify-between px-3 py-3 rounded-xl" style={{ background: '#1a3a2a', marginBottom: 32 }}>
                  <span className="font-bold text-base" style={{ color: '#fff' }}>ยอดรับสุทธิ (Net Pay)</span>
                  <span className="tg-mono text-xl font-bold" style={{ color: '#7ec8a0' }}>{fmtTHB(net)} บาท</span>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-3 gap-6 text-center text-xs mt-4" style={{ color: '#555' }}>
                  <div>
                    <div style={{ borderTop: '1px solid #999', paddingTop: 6 }}>( ……………………………… )</div>
                    <p className="mt-1">ผู้จ่ายเงิน</p>
                  </div>
                  <div>
                    <div style={{ borderTop: '1px solid #999', paddingTop: 6 }}>( ……………………………… )</div>
                    <p className="mt-1">ผู้อนุมัติ</p>
                  </div>
                  <div>
                    <div style={{ borderTop: '1px solid #999', paddingTop: 6 }}>( {e.name} )</div>
                    <p className="mt-1">ผู้รับเงิน / วันที่ ………………</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {showPayrollPDF && (
        <div className="tg-modal-backdrop">
          <div className="tg-panel tg-print-area tg-scroll" style={{ maxWidth: 760, width: '100%', margin: '0.5rem 0', maxHeight: '94vh', overflowY: 'auto', padding: '36px 40px', background: '#fff' }}>
            <div id="tg-payroll-pdf-content">
            <div className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: '2px solid var(--bone)' }}>
              <div className="flex items-start gap-3">
                <BranchMark className="w-16 h-16 shrink-0" style={{ color: '#1a1a1a' }} />
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--bone)' }}>{ENTITIES.entity1.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>{ENTITIES.entity1.address}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs tg-mono" style={{ color: 'var(--moss)' }}>วันที่ 11/06/2026</p>
              </div>
            </div>

            <div className="text-center my-4">
              <span className="tg-badge tg-badge-sage" style={{ fontSize: 14, padding: '0.4rem 1.25rem', fontWeight: 700 }}>สรุปจ่ายเงินเดือนพนักงานทั่วไป</span>
              <p className="text-xs mt-2" style={{ color: 'var(--moss)' }}>{siteFilter === 'all' ? 'พนักงานทั้งหมด' : projectsData.find((p) => p.id === siteFilter)?.name || ''}</p>
            </div>

            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="text-left text-xs" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line-strong)' }}>
                  <th className="py-2 pr-2 font-medium">ชื่อ-นามสกุล</th>
                  <th className="py-2 pr-2 font-medium text-right">ค่าแรง/วัน</th>
                  <th className="py-2 pr-2 font-medium text-right">วันทำงาน</th>
                  <th className="py-2 pr-2 font-medium text-right">OT (ชม.)</th>
                  <th className="py-2 pr-2 font-medium text-right">เบิกล่วงหน้า</th>
                  <th className="py-2 font-medium text-right">ยอดสุทธิ</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => {
                  const wage = getWage(e.id);
                  const p = getPayroll(e.id);
                  const otRate = (wage / 8) * 1.5;
                  const net = wage * p.workDays + otRate * p.otHours - p.advance;
                  return (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td className="py-2 pr-2" style={{ color: 'var(--bone)' }}>{e.name}</td>
                      <td className="py-2 pr-2 text-right tg-mono">{fmtTHB(wage)}</td>
                      <td className="py-2 pr-2 text-right tg-mono">{p.workDays}</td>
                      <td className="py-2 pr-2 text-right tg-mono">{p.otHours}</td>
                      <td className="py-2 pr-2 text-right tg-mono">{fmtTHB(p.advance)}</td>
                      <td className="py-2 text-right tg-mono font-semibold">{fmtTHB(net)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid var(--line-strong)' }}>
                  <td colSpan={5} className="py-3 pr-2 text-right font-semibold" style={{ color: 'var(--bone)' }}>รวมยอดจ่ายทั้งหมด</td>
                  <td className="py-3 text-right tg-mono font-semibold" style={{ color: 'var(--gold)' }}>
                    {fmtTHB(filteredEmployees.reduce((sum, e) => {
                      const wage = getWage(e.id);
                      const p = getPayroll(e.id);
                      const otRate = (wage / 8) * 1.5;
                      return sum + wage * p.workDays + otRate * p.otHours - p.advance;
                    }, 0))} บาท
                  </td>
                </tr>
              </tfoot>
            </table>
            </div>{/* end tg-payroll-pdf-content */}

            <div className="tg-noprint flex gap-3 mt-6">
              <button onClick={() => setShowPayrollPDF(false)} className="tg-focus tg-navbtn flex-1 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(217,142,92,0.03)', border: '1px solid var(--line)', color: 'var(--moss)' }}>ปิด</button>
              <button
                onClick={() => {
                  const area = document.getElementById('tg-payroll-pdf-content');
                  if (!area) { window.print(); return; }
                  const w = window.open('', '_blank', 'width=900,height=700');
                  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>สรุปจ่ายเงินเดือน</title>
                  <style>
                    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');
                    @page { size: A4; margin: 15mm 20mm; }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Sarabun', sans-serif; font-size: 13px; color: #3d2c1e; background: #fff; }
                    table { border-collapse: collapse; width: 100%; }
                    th, td { border: 1px solid #ddd; padding: 6px 8px; }
                    th { background: #f5f0eb; font-weight: 600; }
                    .tg-mono { font-family: 'Courier New', monospace; }
                    .tg-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-weight: 700; }
                    .tg-badge-sage { background: #e8f0e8; color: #4a7a5a; }
                    .tg-noprint { display: none !important; }
                    .flex { display: flex; } .items-start { align-items: flex-start; } .justify-between { justify-content: space-between; } .items-center { align-items: center; }
                    .gap-3 { gap: 0.75rem; } .gap-4 { gap: 1rem; }
                    .text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; } .font-bold { font-weight: 700; } .font-semibold { font-weight: 600; }
                    .w-16 { width: 4rem; } .h-16 { height: 4rem; } .shrink-0 { flex-shrink: 0; }
                    .pb-4 { padding-bottom: 1rem; } .mt-1 { margin-top: 0.25rem; } .mb-4 { margin-bottom: 1rem; } .mt-6 { margin-top: 1.5rem; }
                    .p-8 { padding: 2rem; }
                  </style></head><body>${area.innerHTML}</body></html>`);
                  w.document.close();
                  setTimeout(() => { w.focus(); w.print(); w.close(); }, 500);
                }}
                className="tg-focus tg-navbtn flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--sage)', color: '#fff' }}>
                <Printer size={16} strokeWidth={1.75} /> พิมพ์ / บันทึก PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   PAGE 5 — SITE LOG & DIRECT COSTING
   ============================================================ */
const SiteLogCosting = ({ setProjectDirectCost, setPage }) => {
  const [projectId, setProjectId] = useState(projectsData[0].id);
  const [activeTab, setActiveTab] = useState('info');
  const [logDate, setLogDate] = useState('11/06/2026');
  const [recorder, setRecorder] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [materials, setMaterials] = useState([
    { id: 1, name: 'ดินปลูกผสมปุ๋ยหมัก', qty: 20, unit: 'ถุง', price: 85, vendor: 'ร้านวัสดุเกษตรบางนา' },
    { id: 2, name: 'ต้นเฟิร์นใบมะขาม', qty: 15, unit: 'ต้น', price: 120, vendor: 'สวนกล้าไม้ปทุมธานี' },
  ]);
  const [saved, setSaved] = useState(false);
  const [showPhotoReport, setShowPhotoReport] = useState(false);
  const [photoPos, setPhotoPos] = useState({});
  const [photoZoom, setPhotoZoom] = useState({});
  const [photoReportEntity, setPhotoReportEntity] = useState('entity1');
  const [photoReportStageFilter, setPhotoReportStageFilter] = useState('all');
  const [photoReportDetails, setPhotoReportDetails] = useState({ title: 'รายงานรูปถ่ายหน้างาน', scope: '', ref: '' });

  const project = projectsData.find((p) => p.id === projectId);

  const updateMaterial = (id, field, value) => {
    setMaterials((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
    setSaved(false);
  };
  const addMaterial = () => {
    setMaterials((prev) => [...prev, { id: Date.now(), name: '', qty: 1, unit: 'หน่วย', price: 0, vendor: '' }]);
    setSaved(false);
  };
  const removeMaterial = (id) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    setSaved(false);
  };

  const totalCost = materials.reduce((s, m) => s + (Number(m.qty) || 0) * (Number(m.price) || 0), 0);

  React.useEffect(() => {
    if (setProjectDirectCost) setProjectDirectCost(projectId, totalCost);
  }, [projectId, totalCost]);

  const filteredReportPhotos = photos.filter((ph) => photoReportStageFilter === 'all' || (ph.stage || 'before') === photoReportStageFilter);
  const totalReportPages = Math.max(1, Math.ceil(filteredReportPhotos.length / PHOTOS_PER_PAGE));

  return (
    <div className="p-6 md:p-10 max-w-screen-2xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--sage)' }}>Site Log & Direct Costing</p>
          <h1 className="text-2xl md:text-3xl font-semibold" style={{ color: 'var(--bone)' }}>บันทึกหน้างานและค่าใช้จ่ายตรงไซต์งาน</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--moss)' }}>ถ่ายภาพก่อน-หลัง พร้อมบันทึกการสั่งซื้อวัสดุเข้าไซต์งานโดยตรง</p>
        </div>
      </div>

      <div className="tg-split tg-60-40">
        <div className="space-y-5">
          <Tabs
            active={activeTab}
            onChange={setActiveTab}
            accent="rust"
            tabs={[
              { key: 'info', label: 'ข้อมูลทั่วไป', icon: ClipboardList },
              { key: 'costing', label: 'Direct Costing', icon: HardHat, badge: materials.length },
            ]}
          />

          {/* Basic info */}
          {activeTab === 'info' && (
          <div className="tg-panel p-5 md:p-6">
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--bone)' }}>ข้อมูลการบันทึกหน้างาน</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs mb-1.5 block" style={{ color: 'var(--moss)' }}>โครงการ</label>
                <ProjectSearchSelect
                  value={projectId}
                  onChange={(v) => { setProjectId(v); setSaved(false); }}
                  placeholder="ค้นหาโครงการ..."
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                  <Calendar size={12} strokeWidth={1.75} /> วันที่บันทึก
                </label>
                <input
                  type="date"
                  value={toIso(logDate)}
                  onChange={(e) => { setLogDate(toDmy(e.target.value)); setSaved(false); }}
                  className="tg-input tg-focus tg-mono w-full px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs mb-1.5" style={{ color: 'var(--moss)' }}>
                  <HardHat size={12} strokeWidth={1.75} /> ผู้บันทึก
                </label>
                <input
                  value={recorder}
                  onChange={(e) => { setRecorder(e.target.value); setSaved(false); }}
                  placeholder="ชื่อหัวหน้างาน / ผู้บันทึก"
                  className="tg-input tg-focus w-full px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--moss)' }}>รายละเอียดงานที่ทำวันนี้</label>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setSaved(false); }}
                rows={4}
                placeholder="เช่น ปลูกไม้พุ่มเพิ่มบริเวณทางเข้า ตัดแต่งสนามหญ้าโซน B เปลี่ยนระบบสปริงเกอร์จุดที่ 4 ..."
                className="tg-input tg-focus w-full px-3 py-2.5 text-sm resize-none"
              />
            </div>
          </div>
          )}

          {/* Photos */}
          {activeTab === 'photos' && (
          <div className="tg-panel p-5 md:p-6">
            <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--bone)' }}>ภาพถ่ายหน้างาน</h2>
            <p className="text-xs mb-4" style={{ color: 'var(--moss)' }}>อัปโหลดภาพหน้างาน ลากเพื่อจัดตำแหน่ง ปรับซูม ใส่คำอธิบาย แล้วออกฟอร์มเพื่อพิมพ์แนบเอกสาร</p>

            <button
              onClick={() => setShowPhotoReport(true)}
              disabled={photos.length === 0}
              className="tg-focus tg-navbtn w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium mb-4"
              style={{ background: photos.length === 0 ? 'rgba(217,142,92,0.03)' : 'var(--sage)', color: photos.length === 0 ? 'var(--moss)' : '#fff', border: photos.length === 0 ? '1px solid var(--line)' : 'none' }}
            >
              <Printer size={16} strokeWidth={1.75} /> ออกฟอร์มภาพถ่ายหน้างาน (PDF)
            </button>

            <PhotoGalleryUploader photos={photos} onChange={(p) => { setPhotos(p); setSaved(false); }} photoPos={photoPos} onPhotoPosChange={setPhotoPos} photoZoom={photoZoom} onPhotoZoomChange={setPhotoZoom} />
          </div>
          )}


          {/* Direct costing */}
          {activeTab === 'costing' && (
          <div className="tg-panel p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>สั่งซื้อวัสดุตรงเข้าไซต์งาน (Direct Costing)</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--moss)' }}>บันทึกค่าวัสดุที่สั่งซื้อและส่งตรงเข้าหน้างานโดยไม่ผ่านคลังสินค้า</p>
              </div>
              <button
                onClick={addMaterial}
                className="tg-focus tg-navbtn flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium shrink-0"
                style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.25)', color: 'var(--sage)' }}
              >
                <Plus size={14} strokeWidth={2} /> เพิ่มรายการ
              </button>
            </div>
            <div className="overflow-x-auto tg-scroll">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: '720px' }}>
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider" style={{ color: 'var(--moss)', borderBottom: '1px solid var(--line)' }}>
                    <th className="pb-2.5 pr-3 font-medium" style={{ width: '28%' }}>รายการวัสดุ</th>
                    <th className="pb-2.5 pr-3 font-medium" style={{ width: '10%' }}>จำนวน</th>
                    <th className="pb-2.5 pr-3 font-medium" style={{ width: '12%' }}>หน่วย</th>
                    <th className="pb-2.5 pr-3 font-medium" style={{ width: '14%' }}>ราคา/หน่วย</th>
                    <th className="pb-2.5 pr-3 font-medium" style={{ width: '22%' }}>ร้านค้า / ผู้จำหน่าย</th>
                    <th className="pb-2.5 pr-3 font-medium text-right" style={{ width: '12%' }}>รวม (บาท)</th>
                    <th className="pb-2.5 pr-3 font-medium text-center" style={{ width: '8%' }}>สลิป</th>
                    <th className="pb-2.5" style={{ width: '4%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td className="py-2 pr-3">
                        <input value={m.name} onChange={(e) => updateMaterial(m.id, 'name', e.target.value)} className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm" />
                      </td>
                      <td className="py-2 pr-3">
                        <input type="number" value={m.qty} onFocus={(e) => e.target.select()} onChange={(e) => updateMaterial(m.id, 'qty', e.target.value)} className="tg-input tg-focus tg-mono w-full px-2.5 py-1.5 text-sm" />
                      </td>
                      <td className="py-2 pr-3">
                        <input value={m.unit} onChange={(e) => updateMaterial(m.id, 'unit', e.target.value)} className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm" />
                      </td>
                      <td className="py-2 pr-3">
                        <input type="number" value={m.price} onFocus={(e) => e.target.select()} onChange={(e) => updateMaterial(m.id, 'price', e.target.value)} className="tg-input tg-focus tg-mono w-full px-2.5 py-1.5 text-sm" />
                      </td>
                      <td className="py-2 pr-3">
                        <input value={m.vendor} onChange={(e) => updateMaterial(m.id, 'vendor', e.target.value)} className="tg-input tg-focus w-full px-2.5 py-1.5 text-sm" />
                      </td>
                      <td className="py-2 pr-3 text-right tg-mono font-medium" style={{ color: 'var(--bone)' }}>
                        {fmtTHB((Number(m.qty) || 0) * (Number(m.price) || 0))}
                      </td>
                      <td className="py-2 pr-3 text-center">
                        {m.slip ? (
                          <div className="inline-flex items-center gap-1">
                            <a href={m.slip} target="_blank" rel="noreferrer" className="tg-focus inline-flex" title="ดูสลิป">
                              <img src={m.slip} alt="สลิป" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--line-strong)' }} />
                            </a>
                            <button onClick={() => updateMaterial(m.id, 'slip', '')} className="tg-focus tg-navbtn p-1 rounded-full" style={{ color: 'var(--rust)' }} title="ลบสลิป">
                              <X size={12} strokeWidth={2} />
                            </button>
                          </div>
                        ) : (
                          <label className="tg-focus tg-navbtn inline-flex items-center justify-center p-1.5 rounded-lg cursor-pointer" style={{ border: '1px dashed var(--line-strong)', color: 'var(--moss)' }} title="แนบสลิป">
                            <Upload size={14} strokeWidth={1.75} />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (!f) return;
                              const reader = new FileReader();
                              reader.onload = () => updateMaterial(m.id, 'slip', reader.result);
                              reader.readAsDataURL(f);
                            }} />
                          </label>
                        )}
                      </td>
                      <td className="py-2 text-right">
                        <button onClick={() => removeMaterial(m.id)} className="tg-focus tg-navbtn p-1.5 rounded-lg" style={{ color: 'var(--rust)' }} aria-label="ลบรายการ">
                          <Trash2 size={14} strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {materials.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-6 text-center text-sm" style={{ color: 'var(--moss)' }}>ยังไม่มีรายการวัสดุ — กด "เพิ่มรายการ" เพื่อเริ่มบันทึก</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 pt-4" style={{ borderTop: '1px solid var(--line)' }}>
              <div className="text-right">
                <p className="text-xs" style={{ color: 'var(--moss)' }}>รวม Direct Cost ทั้งหมด</p>
                <p className="text-lg font-semibold tg-mono" style={{ color: 'var(--gold)' }}>{fmtTHB(totalCost)} <span className="text-sm font-normal" style={{ color: 'var(--moss)' }}>บาท</span></p>
              </div>
            </div>
          </div>
          )}

          <button
            onClick={() => setSaved(true)}
            className="tg-focus tg-navbtn w-full px-4 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.25)', color: 'var(--sage)' }}
          >
            บันทึกข้อมูลหน้างาน
          </button>
          {saved && (
            <div className="tg-panel p-3.5 flex items-center gap-2.5" style={{ borderColor: 'rgba(217,142,92,0.3)' }}>
              <CheckCircle2 size={16} strokeWidth={1.75} style={{ color: 'var(--sage)', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: 'var(--bone)' }}>บันทึกข้อมูลหน้างานเรียบร้อยแล้ว</p>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="w-full">
          <div className="tg-panel p-5 lg:sticky lg:top-6 space-y-5">
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--bone)' }}>สรุปการบันทึก</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>โครงการ</span>
                  <span className="text-right" style={{ color: 'var(--bone)', maxWidth: '60%' }}>{project.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>วันที่</span>
                  <span className="tg-mono" style={{ color: 'var(--bone)' }}>{logDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>ผู้บันทึก</span>
                  <span style={{ color: 'var(--bone)' }}>{recorder || '—'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>จำนวนรายการวัสดุ</span>
                  <span className="tg-mono" style={{ color: 'var(--bone)' }}>{materials.length}</span>
                </div>
              </div>
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid var(--line)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: 'var(--moss)' }}>ภาพถ่ายหน้างาน</p>
                <span className="tg-mono text-xs" style={{ color: 'var(--bone)' }}>{photos.length} รูป · {Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE))} หน้า</span>
              </div>
              {photos.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--moss)' }}>ยังไม่มีรูปภาพ</p>
              ) : (
                <div className="grid grid-cols-4 gap-1.5">
                  {photos.slice(0, 8).map((p) => (
                    <div key={p.id} className="rounded-md overflow-hidden" style={{ aspectRatio: '4 / 3', background: 'rgba(217,142,92,0.03)', border: '1px solid var(--line)' }}>
                      <img src={p.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid var(--line)' }}>
              <p className="text-xs" style={{ color: 'var(--moss)' }}>รวม Direct Cost</p>
              <p className="text-xl font-semibold tg-mono mt-1" style={{ color: 'var(--gold)' }}>{fmtTHB(totalCost)} <span className="text-sm font-normal" style={{ color: 'var(--moss)' }}>บาท</span></p>
            </div>
            <div className="pt-4" style={{ borderTop: '1px solid var(--line)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--bone)' }}>กำไร-ขาดทุนโครงการ (โดยประมาณ)</p>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>มูลค่าโครงการ</span>
                  <span className="tg-mono" style={{ color: 'var(--bone)' }}>{fmtTHB(project.value)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>Direct Cost รวม</span>
                  <span className="tg-mono" style={{ color: 'var(--rust)' }}>-{fmtTHB(totalCost)}</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 mt-1" style={{ borderTop: '1px solid var(--line)' }}>
                  <span className="font-semibold" style={{ color: 'var(--bone)' }}>กำไรขั้นต้นโดยประมาณ</span>
                  <span className="tg-mono font-semibold" style={{ color: 'var(--sage)' }}>{fmtTHB(project.value - totalCost)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--moss)' }}>อัตรากำไรขั้นต้น</span>
                  <span className="tg-mono" style={{ color: 'var(--bone)' }}>{project.value ? ((project.value - totalCost) / project.value * 100).toFixed(1) : '0.0'}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPhotoReport && (
        <div className="tg-modal-backdrop">
          <div className="tg-panel tg-print-area tg-scroll" style={{ maxWidth: 800, width: '100%', margin: '0.5rem 0', maxHeight: '94vh', overflowY: 'auto', padding: '36px 40px', background: '#fff' }}>

            {/* Setup controls hidden when printing */}
            <div className="tg-noprint mb-6 p-4 rounded-xl space-y-3" style={{ background: 'var(--sage-soft)', border: '1px solid rgba(217,142,92,0.3)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--bone)' }}>ตั้งค่าเอกสาร</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>นิติบุคคล</label>
                  <div className="relative">
                    <select value={photoReportEntity} onChange={(e) => setPhotoReportEntity(e.target.value)} className="tg-input tg-focus tg-select w-full pl-3 pr-9 py-2 text-sm">
                      <option value="entity1">Entity 1 - {ENTITIES.entity1.name}</option>
                      <option value="entity2">บริษัทอื่น / กรอกเอง</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--moss)' }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>หัวข้อเอกสาร</label>
                  <input type="text" value={photoReportDetails.title} onChange={(e) => setPhotoReportDetails((p) => ({ ...p, title: e.target.value }))} className="tg-input tg-focus w-full px-3 py-2 text-sm" />
                </div>
                {photoReportEntity === 'entity2' && (
                  <>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>ชื่อบริษัท</label>
                      <input type="text" value={photoReportDetails.customName || ''} onChange={(e) => setPhotoReportDetails((p) => ({ ...p, customName: e.target.value }))} placeholder="ระบุชื่อบริษัท..." className="tg-input tg-focus w-full px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>ที่อยู่</label>
                      <input type="text" value={photoReportDetails.customAddress || ''} onChange={(e) => setPhotoReportDetails((p) => ({ ...p, customAddress: e.target.value }))} placeholder="ที่อยู่บริษัท..." className="tg-input tg-focus w-full px-3 py-2 text-sm" />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <label className="text-xs mb-1 block" style={{ color: 'var(--moss)' }}>ขอบเขตงาน / หมายเหตุ</label>
                  <input type="text" value={photoReportDetails.scope} onChange={(e) => setPhotoReportDetails((p) => ({ ...p, scope: e.target.value }))} className="tg-input tg-focus w-full px-3 py-2 text-sm" />
                </div>
              </div>
            </div>

            {/* Photo pages */}
            <div id="tg-photo-report-pages">
            {Array.from({ length: totalReportPages }).map((_, pageIdx) => {
              const pagePhotos = filteredReportPhotos.slice(pageIdx * PHOTOS_PER_PAGE, pageIdx * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE);
              const slots = [...pagePhotos];
              const reportEntity = ENTITIES[photoReportEntity] || ENTITIES.entity1;
              while (slots.length < PHOTOS_PER_PAGE) slots.push(null);
              return (
                <div key={pageIdx} className={pageIdx > 0 ? 'tg-doc-copy' : ''} style={pageIdx > 0 ? { borderTop: '2px dashed var(--line-strong)', marginTop: 24, paddingTop: 24 } : undefined}>
                  <div className="flex items-start justify-between gap-4 pb-4" style={{ borderBottom: '2px solid var(--bone)' }}>
                    <div className="flex items-start gap-3">
                      {photoReportEntity !== 'entity2' && <BranchMark className="w-16 h-16 shrink-0" style={{ color: '#1a1a1a' }} />}                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--bone)' }}>
                          {photoReportEntity === 'entity2' ? (photoReportDetails.customName || 'ระบุชื่อบริษัท') : reportEntity.name}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>
                          {photoReportEntity === 'entity2' ? (photoReportDetails.customAddress || '') : reportEntity.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 text-xs tg-mono" style={{ color: 'var(--moss)' }}>
                      หน้า {pageIdx + 1} / {totalReportPages}
                    </div>
                  </div>

                  <div className="text-center my-4">
                    <span className="tg-badge tg-badge-sage" style={{ fontSize: 14, padding: '0.4rem 1.25rem', fontWeight: 700 }}>{photoReportDetails.title || 'รายงานรูปถ่ายหน้างาน'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mb-4">
                    <p><span style={{ color: 'var(--moss)' }}>โครงการ: </span><span style={{ color: 'var(--bone)' }}>{project.name}</span></p>
                    <p><span style={{ color: 'var(--moss)' }}>วันที่: </span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{logDate}</span></p>
                    <p className="col-span-2"><span style={{ color: 'var(--moss)' }}>ผู้บันทึก: </span><span style={{ color: 'var(--bone)' }}>{recorder || '—'}</span></p>
                    {photoReportDetails.ref && <p><span style={{ color: 'var(--moss)' }}>อ้างอิง: </span><span className="tg-mono" style={{ color: 'var(--bone)' }}>{photoReportDetails.ref}</span></p>}
                    {photoReportDetails.scope && <p className="col-span-2"><span style={{ color: 'var(--moss)' }}>ขอบเขตงาน: </span><span style={{ color: 'var(--bone)' }}>{photoReportDetails.scope}</span></p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((p, i) => (
                      <div key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--line-strong)' }}>
                        <div style={{ aspectRatio: '4 / 3', position: 'relative', overflow: 'hidden', background: 'rgba(217,142,92,0.03)' }}>
                          {p ? (
                            <>
                              <img src={p.url} alt={p.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${(photoPos[p.id] || { x: 50, y: 50 }).x}% ${(photoPos[p.id] || { x: 50, y: 50 }).y}%`, transform: `scale(${photoZoom[p.id] || 1})`, transformOrigin: `${(photoPos[p.id] || { x: 50, y: 50 }).x}% ${(photoPos[p.id] || { x: 50, y: 50 }).y}%`, display: 'block' }} />
                              <span style={{ position: 'absolute', top: 4, left: 4, fontSize: 9, padding: '0.1rem 0.4rem', borderRadius: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', fontWeight: 700 }}>
                                {pageIdx * PHOTOS_PER_PAGE + i + 1}
                              </span>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs" style={{ color: 'var(--moss)' }}>ช่องที่ {pageIdx * PHOTOS_PER_PAGE + i + 1}</div>
                          )}
                        </div>
                        <p className="text-xs px-1.5 py-1 truncate" style={{ color: 'var(--bone)', minHeight: '1.5rem' }}>{p && p.caption ? p.caption : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            </div>

            <div className="tg-noprint flex gap-3 justify-end mt-6">
              <button onClick={() => setShowPhotoReport(false)} className="tg-focus tg-navbtn px-5 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(217,142,92,0.03)', border: '1px solid var(--line)', color: 'var(--moss)' }}>
                ปิด
              </button>
              <button
                onClick={() => {
                  const area = document.getElementById('tg-photo-report-pages');
                  if (!area) return;
                  const w = window.open('', '_blank', 'width=900,height=700');
                  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>รายงานภาพถ่ายหน้างาน</title>
                  <style>
                    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap');
                    @page { size: A4; margin: 10mm 15mm; }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Sarabun', sans-serif; font-size: 13px; color: #3d2c1e; background: #fff; }
                    img { max-width: 100%; display: block; }
                    .tg-noprint { display: none !important; }
                    .tg-mono { font-family: 'Courier New', monospace; }
                    .tg-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-weight: 700; }
                    .tg-badge-sage { background: #e8f0e8; color: #4a7a5a; }
                    .tg-doc-copy { break-before: page; page-break-before: always; margin-top: 0 !important; padding-top: 0 !important; border-top: none !important; }
                    .flex { display: flex; } .items-start { align-items: flex-start; } .justify-between { justify-content: space-between; } .items-center { align-items: center; }
                    .gap-3 { gap: 0.75rem; } .gap-4 { gap: 1rem; } .gap-x-6 { column-gap: 1.5rem; } .gap-y-1 { row-gap: 0.25rem; }
                    .grid { display: grid; } .grid-cols-2 { grid-template-columns: repeat(2,1fr); } .col-span-2 { grid-column: span 2/span 2; }
                    .text-right { text-align: right; } .text-center { text-align: center; } .shrink-0 { flex-shrink: 0; }
                    .text-sm { font-size: 0.875rem; } .text-xs { font-size: 0.75rem; } .font-bold { font-weight: 700; } .font-semibold { font-weight: 600; }
                    .w-16 { width: 4rem; } .h-16 { height: 4rem; } .w-full { width: 100%; } .h-full { height: 100%; }
                    .pb-4 { padding-bottom: 1rem; } .my-4 { margin: 1rem 0; } .mb-4 { margin-bottom: 1rem; }
                    .rounded-lg { border-radius: 0.5rem; } .overflow-hidden { overflow: hidden; } .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                  </style></head><body>${area.innerHTML}</body></html>`);
                  w.document.close();
                  setTimeout(() => { w.focus(); w.print(); w.close(); }, 800);
                }}
                className="tg-focus tg-navbtn flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--sage)', color: '#fff' }}>
                <Printer size={16} strokeWidth={1.75} /> พิมพ์ / บันทึก PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [page, setPage] = useState('dashboard');
  const [paidDocIds, setPaidDocIds] = useState([]);
  const [directCosts, setDirectCosts] = useState({});

  const setProjectDirectCost = (projectId, total) => {
    setDirectCosts((prev) => ({ ...prev, [projectId]: total }));
  };

  const togglePaid = (docId, paid) => {
    setPaidDocIds((prev) => (paid ? Array.from(new Set([...prev, docId])) : prev.filter((id) => id !== docId)));
  };

  const extraRevenue = documentsData
    .filter((d) => paidDocIds.includes(d.id))
    .reduce((s, d) => s + calcDocAmounts(d.base).net, 0);

  return (
    <div className="tg-app min-h-screen flex">
      <ThemeStyles />
      <Sidebar page={page} setPage={setPage} />
      <MobileNav page={page} setPage={setPage} />
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div style={{ display: page === 'dashboard' ? 'block' : 'none' }}>
          <ExecutiveDashboard extraRevenue={extraRevenue} directCosts={directCosts} />
        </div>
        <div style={{ display: page === 'crm' ? 'block' : 'none' }}>
          <CRMProjectExplorer />
        </div>
        <div style={{ display: page === 'docflow' ? 'block' : 'none' }}>
          <DocumentFlow paidDocIds={paidDocIds} togglePaid={togglePaid} />
        </div>
        <div style={{ display: page === 'hr' ? 'block' : 'none' }}>
          <HREmployeeCard />
        </div>
        <div style={{ display: page === 'sitelog' ? 'block' : 'none' }}>
          <SiteLogCosting setProjectDirectCost={setProjectDirectCost} setPage={setPage} />
        </div>
      </main>
    </div>
  );
}
