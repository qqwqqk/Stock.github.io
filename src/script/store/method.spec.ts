import {pathResolution, toThousands} from './method'

const breadcrumbNameMap = new Map([
  ['/apps', 'Application List'],
  ['/apps/1', 'Application1'],
  ['/apps/2', 'Application2'],
  ['/apps/1/detail', 'Detail'],
  ['/apps/2/detail', 'Detail'],
]);

test('path resolution test',()=>{
  const input = '/apps/1/detail';
  const output = ['Application List','Application1','Detail'];
  expect(pathResolution(breadcrumbNameMap,input)).toEqual(output);
})

test('number toThousands test',()=>{
  const input = 123456.12;
  const output = '123,456.12'
  expect(toThousands(input)).toEqual(output);
})