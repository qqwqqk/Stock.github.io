
const breadcrumbNameMap = new Map([
  ['/apps', 'Application List'],
  ['/apps/1', 'Application1'],
  ['/apps/2', 'Application2'],
  ['/apps/1/detail', 'Detail'],
  ['/apps/2/detail', 'Detail'],
]);

export function pathResolution(
  match: Map<string,string>,
  path: string
  ):Array<string>{
  const splitCache = path.split('/').filter(i => i);
  const extraItems = splitCache.map((_,index)=>{
    const url = `/${splitCache.slice(0, index + 1).join('/')}`;
    return match.get(url);
  });
  return extraItems;
}

export function toThousands(num: number): string {
  if (isNaN(num)) {
    throw new TypeError('num is not a number');
  }
  // tslint:disable-next-line: one-variable-per-declaration
  let groups = /([\-\+]?)(\d*)(\.\d+)?/g.exec('' + num),
    mask = groups[1], // 符号位
    integers = (groups[2] || '').split(''), // 整数部分
    decimal = groups[3] || '', // 小数部分
    remain = integers.length % 3;
  let temp = integers
    .reduce(function(previousValue, currentValue, index) {
      if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
        return previousValue + currentValue + ',';
      } else {
        return previousValue + currentValue;
      }
    }, '')
    .replace(/\,$/g, '');
  if(typeof(decimal)=='string'){
    decimal = decimal.substring(0,3) === '000' ? '': decimal.substring(0,3);
  }
  return mask + temp + decimal;
}