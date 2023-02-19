const position = { x: 0, y: 0 };
const edgeType = 'step';

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Руководитель' },
    position,
  },
  {
    id: '2',
    data: { label: 'Управление стоительства' },
    position,
  },
  {
    id: '3',
    data: { label: 'Финансовое управление' },
    position,
  },
  {
    id: '4',
    data: { label: 'Отдел механизации' },
    position,
  },
  {
    id: '5',
    data: { label: 'Отдел снабжения' },
    position,
  },
  {
    id: '6',
    data: { label: 'Отдел финансового планирования' },
    position,
  },
  {
    id: '7',
    data: { label: 'Расчетный отдел' },
    position,
  }
];

export const initialEdges = [
  { id: 'e12', source: '1', target: '2', type: edgeType },
  { id: 'e13', source: '1', target: '3', type: edgeType },
  { id: 'e24', source: '2', target: '4', type: edgeType },
  { id: 'e25', source: '2', target: '5', type: edgeType },
  { id: 'e36', source: '3', target: '6', type: edgeType },
  { id: 'e37', source: '3', target: '7', type: edgeType },
];