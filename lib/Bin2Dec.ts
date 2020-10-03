export enum BinFormats {
  INT8, UINT8,
  INT16, UINT16,
  INT32, UINT32
}

const BinClasses = [
  Int8Array, Uint8Array,
  Int16Array, Uint16Array,
  Int32Array, Uint32Array
]

export function bin2dec(input: any, format = BinFormats.INT8) {
  let inputString = `${input}`.replace(/[^01]+/g, '')
  let inputNumber = parseInt(inputString, 2)

  if(isNaN(inputNumber))
    throw new Error('Input format error!')

  if(format == undefined || format == null)
    return inputNumber

  if(typeof format != 'number')
    format = BinFormats[format] as any

  if(!BinClasses[format])
    throw new Error(`Unknow format '${format}'`)

  return (new BinClasses[format]([inputNumber]))[0]
}