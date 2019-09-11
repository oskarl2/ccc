export const COLUMNS_TITLE = [
  {
    title: 'Имя',
    width: 200,
    value: 'name'
  },
  {
    title: 'Телефон',
    width: 200,
    value: 'phone'
  }
];

export function getFormattedColumns(columns) {
  return columns.map((item, index) => ({
    width: item.width,
    title: item.title,
    key: index,
    value: item.value
  }));
}