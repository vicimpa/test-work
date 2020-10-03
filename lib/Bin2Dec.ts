export enum BinFormats {
  INT8,
  INT16,
  INT32,
  UINT8,
  UINT16,
  UINT32
}

export function bin2dec(input: any, format = BinFormats.INT8) {
  let inputString = `${input}`.replace(/[^01]+/g, '')
  let inputNumber = parseInt(inputString, 2)

  if(isNaN(inputNumber))
    throw new Error('Input format error!')

  if(format == undefined || format == null)
    return inputNumber

  if(typeof format != 'number')
    format = BinFormats[format] as any

  switch(format) {
    case BinFormats.INT8: return (new Int8Array([inputNumber]))[0]
    case BinFormats.UINT8: return (new Uint8Array([inputNumber]))[0]

    case BinFormats.INT16: return (new Int16Array([inputNumber]))[0]
    case BinFormats.UINT16: return (new Uint16Array([inputNumber]))[0]

    case BinFormats.INT32: return (new Int32Array([inputNumber]))[0]
    case BinFormats.UINT32: return (new Uint32Array([inputNumber]))[0]

    default: throw new Error(`Unknow format '${format}'`)
  }
}