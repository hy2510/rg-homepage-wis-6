import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Payment from '@/repository/server/payment'
import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '../../_util'

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'platform',
    'productId',
    'receipt',
  )
  const platform = parameter.getString('platform') as 'android' | 'ios'
  const productId = parameter.getString('productId')
  const receiptStr = parameter.getString('receipt')

  let receipt = ''
  let key = ''
  try {
    if (platform === 'android') {
      const parsedReceipt = JSON.parse(receiptStr)
      if (!parsedReceipt.orderId) {
        throw new Error('Android Receipt ERROR.')
      }
      receipt = receiptStr
      key = parsedReceipt.orderId
    } else if (platform === 'ios') {
      const parsedReceipt = JSON.parse(receiptStr)
      if (
        !parsedReceipt.receipt ||
        !parsedReceipt.transactionId ||
        !parsedReceipt.purchaseTime
      ) {
        throw new Error('ios Receipt ERROR.')
      }
      receipt = parsedReceipt.receipt
      key = `${parsedReceipt.transactionId}_${parsedReceipt.purchaseTime}`
    }
  } catch (error) {
    return RouteResponse.commonError()
  }

  const [payload, status, error] = await executeRequestAction(
    Payment.inappPurchase(token, platform, { productId, receipt, key }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
