import { NextResponse } from 'next/server';
import { getRows, appendRow } from '../../../../lib/sheetsHelper';

const SEED_PROJECTS = [
  { id:'PRJ-001', name:'จัดสวนคอนโดมิเนียม The Palm Residence', customer:'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์', contact:'คุณวิภาวี ตันติวงศ์ (ผู้จัดการนิติบุคคล)', address:'99/12 ซอยสุขุมวิท 71 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร 10110', taxId:'0105558112233', entity:'entity1', status:'active', value:1250000, start:'01/03/2026' },
  { id:'PRJ-002', name:'ดูแลภูมิทัศน์สำนักงานใหญ่ กรีนพาวเวอร์', customer:'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)', contact:'คุณธนกร ศรีสุข (ฝ่ายจัดซื้อ)', address:'1 อาคารกรีนพาวเวอร์ ถ.วิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900', taxId:'0107558445566', entity:'entity1', status:'active', value:480000, start:'15/01/2026' },
  { id:'PRJ-003', name:'จัดสวนแนวตั้ง โรงแรมริเวอร์ไซด์', customer:'บริษัท ริเวอร์ไซด์ โฮเทล จำกัด', contact:'คุณมานพ เจริญสุข (วิศวกรอาคาร)', address:'88 ถ.เจริญนคร แขวงคลองต้นไทร เขตคลองสาน กรุงเทพมหานคร 10600', taxId:'0105561223344', entity:'entity2', status:'completed', value:890000, start:'10/11/2025' },
  { id:'PRJ-004', name:'ปรับภูมิทัศน์สวนส่วนกลาง เดอะแกรนด์ วิลเลจ', customer:'นิติบุคคลหมู่บ้านจัดสรร เดอะแกรนด์ วิลเลจ', contact:'คุณสุนทรี พรหมมา (ประธานนิติบุคคล)', address:'55/8 หมู่ 4 ถ.บางนา-ตราด กม.12 ต.บางแก้ว อ.บางพลี จ.สมุทรปราการ 10540', taxId:'0135562778899', entity:'entity1', status:'pending', value:650000, start:'01/07/2026' },
  { id:'PRJ-005', name:'จัดสวน Pool Villa เขาใหญ่', customer:'คุณอนันต์ วงศ์ไพศาล', contact:'คุณอนันต์ วงศ์ไพศาล (เจ้าของบ้าน)', address:'120 หมู่ 7 ต.โป่งตาลอง อ.ปากช่อง จ.นครราชสีมา 30130', taxId:'3100501234567', entity:'entity2', status:'active', value:320000, start:'20/04/2026' },
  { id:'PRJ-006', name:'บำรุงรักษาสวนรายเดือน CW Tower', customer:'บริษัท ซี.ดับเบิ้ลยู. ทาวเวอร์ จำกัด', contact:'คุณกัลยา ทองดี (ฝ่ายอาคารสถานที่)', address:'90 ถ.รัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310', taxId:'0105563998877', entity:'entity1', status:'active', value:180000, start:'01/01/2026' },
];

const SEED_EMPLOYEES = [
  { id:'EMP-2026-014', name:'นายอนุชา แก้วมณี', nickname:'ตูน', position:'ช่างจัดสวนอาวุโส', site:'The Palm Residence', projectId:'PRJ-001', phone:'081-234-5678', start:'15/02/2026', contractEnd:'14/02/2027', status:'active', blood:'O', emergencyContact:'นางสมศรี แก้วมณี (มารดา) · 089-111-2233' },
  { id:'EMP-2026-015', name:'นางสาวพิมพ์ชนก หอมจันทร์', nickname:'ฝ้าย', position:'ผู้ช่วยช่างจัดสวน', site:'กรีนพาวเวอร์', projectId:'PRJ-002', phone:'089-876-5432', start:'01/03/2026', contractEnd:'28/02/2027', status:'active', blood:'A', emergencyContact:'นายสมหวัง หอมจันทร์ (บิดา) · 081-222-3344' },
  { id:'EMP-2026-016', name:'นายสมพงษ์ เรืองศรี', nickname:'หมู', position:'หัวหน้าทีมภูมิทัศน์', site:'CW Tower', projectId:'PRJ-006', phone:'062-345-6789', start:'01/01/2026', contractEnd:'31/12/2026', status:'active', blood:'B', emergencyContact:'นางวันดี เรืองศรี (ภรรยา) · 062-999-8877' },
  { id:'EMP-2026-017', name:'นายวิชัย ทองสุข', nickname:'ชัย', position:'พนักงานขับรถ', site:'ทุกไซต์งาน', projectId:null, phone:'095-123-4567', start:'10/04/2026', contractEnd:'09/04/2027', status:'leave', blood:'AB', emergencyContact:'นางสาวอำไพ ทองสุข (น้องสาว) · 095-555-6677' },
  { id:'EMP-2026-018', name:'นางสาวรุ่งนภา ศิริวัฒน์', nickname:'แนน', position:'ผู้ช่วยช่างจัดสวน', site:'Pool Villa เขาใหญ่', projectId:'PRJ-005', phone:'086-555-1234', start:'20/04/2026', contractEnd:'19/10/2026', status:'active', blood:'O', emergencyContact:'นายมานะ ศิริวัฒน์ (บิดา) · 086-444-5566' },
];

const SEED_DOCUMENTS = [
  { id:'DOC-001', projectId:'PRJ-001', projectName:'จัดสวนคอนโดมิเนียม The Palm Residence', customer:'นิติบุคคลอาคารชุด เดอะปาล์ม เรสซิเดนซ์', entity:'entity1', currentStage:'receipt', base:200000, docNos:{quotation:'QT2026-0089',billing:'BL2026-0158',tax_invoice:'INV2026-0142',receipt:'RC2026-0098'}, docDates:{quotation:'20/05/2026',billing:'01/06/2026',tax_invoice:'05/06/2026',receipt:'11/06/2026'}, validity:'30 วัน', rev:'0', dueDate:'01/07/2026', payMethod:'โอนเงินผ่านธนาคาร', lineItems:[{id:1,description:'ปลูกต้นไม้ใหญ่พร้อมตกแต่งภูมิทัศน์ส่วนกลาง',qty:1,unit:'งาน',price:120000},{id:2,description:'ติดตั้งระบบสปริงเกอร์อัตโนมัติ',qty:1,unit:'ระบบ',price:50000},{id:3,description:'ดินปลูกผสมปุ๋ยหมักและวัสดุตกแต่ง',qty:1,unit:'ชุด',price:30000}] },
  { id:'DOC-002', projectId:'PRJ-002', projectName:'ดูแลภูมิทัศน์สำนักงานใหญ่ กรีนพาวเวอร์', customer:'บริษัท กรีนพาวเวอร์ จำกัด (มหาชน)', entity:'entity1', currentStage:'tax_invoice', base:95000, docNos:{quotation:'QT2026-0091',billing:'BL2026-0149',tax_invoice:'INV2026-0138',receipt:null}, docDates:{quotation:'10/05/2026',billing:'20/05/2026',tax_invoice:'08/06/2026',receipt:null}, validity:'15 วัน', rev:'0', dueDate:'14/06/2026', payMethod:'โอนเงินผ่านธนาคาร', lineItems:[{id:1,description:'ดูแลภูมิทัศน์รายเดือน — พฤษภาคม 2026',qty:1,unit:'เดือน',price:95000}] },
  { id:'DOC-003', projectId:'PRJ-005', projectName:'จัดสวน Pool Villa เขาใหญ่', customer:'คุณอนันต์ วงศ์ไพศาล', entity:'entity2', currentStage:'billing', base:160000, docNos:{quotation:'QT2026-0095',billing:'BL2026-0151',tax_invoice:null,receipt:null}, docDates:{quotation:'15/05/2026',billing:'22/05/2026',tax_invoice:null,receipt:null}, validity:'20 วัน', rev:'1', dueDate:'21/06/2026', payMethod:'เงินสด', lineItems:[{id:1,description:'จัดสวน Pool Villa พร้อมไม้ประดับนำเข้า',qty:1,unit:'งาน',price:130000},{id:2,description:'ติดตั้งระบบไฟส่องสว่างในสวน',qty:1,unit:'ระบบ',price:30000}] },
];

export async function POST() {
  try {
    const [existingProjects, existingEmployees, existingDocuments] = await Promise.all([
      getRows('Projects'), getRows('Employees'), getRows('Documents'),
    ]);
    const results = {};

    if (existingProjects.length === 0) {
      for (const p of SEED_PROJECTS) await appendRow('Projects', p);
      results.projects = `seeded ${SEED_PROJECTS.length}`;
    } else {
      results.projects = `already has ${existingProjects.length} rows`;
    }

    if (existingEmployees.length === 0) {
      for (const e of SEED_EMPLOYEES) await appendRow('Employees', e);
      results.employees = `seeded ${SEED_EMPLOYEES.length}`;
    } else {
      results.employees = `already has ${existingEmployees.length} rows`;
    }

    if (existingDocuments.length === 0) {
      for (const d of SEED_DOCUMENTS) await appendRow('Documents', d);
      results.documents = `seeded ${SEED_DOCUMENTS.length}`;
    } else {
      results.documents = `already has ${existingDocuments.length} rows`;
    }

    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error('setup error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
