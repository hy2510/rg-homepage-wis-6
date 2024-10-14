import RenewType from '@/util/string-utils'

export interface PurchaseProduct {
  currency: string
  payType: string[]
  product: Product[]
}

export interface Product {
  id: string
  name: string
  value: number
  fee: number
  totalFee: number
  discount: Discount[]
}

interface Discount {
  name: string
  fee: number
}

export function makePurchaseProduct(json?: any): PurchaseProduct {
  return {
    currency: RenewType.renewString(json?.currency),
    payType: [...json?.payType?.map((item: string) => item)],
    product: [
      ...json.product.map((product: any): Product => {
        return {
          id: RenewType.renewString(product?.id),
          name: RenewType.renewString(product?.name),
          value: RenewType.renewNumber(product?.value),
          fee: RenewType.renewNumber(product?.fee),
          totalFee: RenewType.renewNumber(product?.totalFee),
          discount: [
            ...product?.discount?.map((discount: any): Discount => {
              return {
                name: RenewType.renewString(discount?.name),
                fee: RenewType.renewNumber(discount?.fee),
              }
            }),
          ],
        }
      }),
    ],
  }
}
