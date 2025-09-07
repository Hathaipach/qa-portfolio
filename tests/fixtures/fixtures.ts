import { test as base } from '@playwright/test'
type Fixtures = {
locale: 'EN' | 'TH'
}


export const test = base.extend<Fixtures>({
locale: ['EN', { option: true }]
})


export const expect = test.expect