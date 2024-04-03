import { describe, expect, test } from "vitest";

import fetcher from "./fetcher";

test('Test of geting initial fetch data when all params is undefined.', () => {
  const init = fetcher.getInit()
  expect(init).toStrictEqual({ headers: {}, body: {} })
})

test('Test of geting initial fetch data when header is defined.', () => {
  const init = fetcher.getInit({ 'Content-Type': 'application/json' })
  expect(init).toStrictEqual({ headers: { 'Content-Type': 'application/json' }, body: {} })
})

describe('Test of geting initial fetch data when body is defined.', () => {
  test('When header is defined.', () => {
    const init = fetcher.getInit({ 'Connection': 'keep-alive' }, { name: 'Maksims' })
    expect(init).toStrictEqual({ headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' }, body: JSON.stringify({ name: 'Maksims' }) })  
  })
  test('When header is undefined.', () => {
    const init = fetcher.getInit(undefined, { name: 'Maksims' })
    expect(init).toStrictEqual({ body: JSON.stringify({ name: 'Maksims' }), headers: { 'Content-Type': 'application/json' } })  
  })
})