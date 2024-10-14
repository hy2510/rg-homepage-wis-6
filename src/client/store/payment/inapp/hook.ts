import Repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useStudentHistoryAction } from '../../student/history/selector'
import { useStudentInfoAction } from '../../student/info/selector'

const IOS_INAPP_USE_SEND_BOX = 'N'

export function useFetchInappPurchase({
  iapInterface,
  platform,
}: {
  iapInterface: any
  platform: 'android' | 'ios'
}) {
  const { loading, setLoading, error, setError } = useFetchBasicState()

  const { setInfo } = useStudentInfoAction()
  const { setHistory } = useStudentHistoryAction()

  const requestAndroidPurchase = async ({
    itemId,
    callback,
  }: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    const finish = (code: number) => {
      callback && callback(code === 0, code)
      setLoading(false)
    }
    setLoading(true)
    writeLog('IAP_REQ', `Inapp Request [AOS]: ${itemId}`)
    let subscribeResult: InAppPurchaseResult | undefined = undefined
    try {
      const inappRequest = await promiseInappSubscribe({
        iapInterface,
        platform: 'android',
        itemId,
      })
      writeLog('IAP_REQ', `Inapp Res 1 : ${inappRequest.result}`)
      writeLog('IAP_REQ', `Inapp Res 2 (AOS): ${inappRequest.productId}`)
      writeLog('IAP_REQ', `Inapp Res 3 (AOS): ${inappRequest.purchaseToken}`)
      writeLog(
        'IAP_REQ',
        `Inapp Res 4 (AOS): ${JSON.stringify(inappRequest.originalData)}`,
      )
      subscribeResult = inappRequest
    } catch (error) {
      // ???
      finish(-100)
      return
    }

    const {
      result: isSuccess,
      purchaseToken,
      productId,
      originalData,
    } = subscribeResult
    if (isSuccess && originalData && originalData.length > 0) {
      try {
        const acknowledge = await promiseAndroidInappAcknowledge(
          iapInterface,
          subscribeResult,
        )
        if (!acknowledge) {
          // 상품 소비 실패
          finish(-11)
          return
        }
      } catch (error) {
        writeLog('IAP_REQ', `AOS ACK ERROR: ${error}`)
        // 상품 소비 실패
        finish(-11)
        return
      }

      let receiptDetail: InAppReceiptDetailAndroid | undefined = undefined
      try {
        receiptDetail = await promiseAndroidReceiptInfo(iapInterface, {
          purchaseToken: purchaseToken!!,
          productId: productId!!,
        })
        writeLog(
          'IAP_REQ',
          `[AOS] RECEIPT INFO: ${JSON.stringify(receiptDetail)}`,
        )
      } catch (error) {
        writeLog('IAP_REQ', `[AOS] RECEIPT ERROR: ${JSON.stringify(error)}`)
        // 상품 결제 정보 조회 실패
        finish(-12)
        return
      }
      if (receiptDetail.resultMap.responseCode !== 200) {
        // 상품 결제 정보 조회 실패
        finish(-12)
        return
      }

      const res = await fetcher.response(
        Repository.postInappPurchase({
          platform,
          productId: itemId,
          receipt: JSON.stringify(originalData!![0]),
        }),
      )
      if (res.isSuccess && res.payload?.code === 0) {
        let isUpdateStudentSuccess = false

        const studyRes = await Promise.all([
          fetcher.response(Repository.getStudent()),
          fetcher.response(Repository.getStudentHistoryList()),
        ])
        if (studyRes[0].isSuccess && studyRes[1].isSuccess) {
          setInfo(studyRes[0].payload)
          setHistory(studyRes[1].payload)
          isUpdateStudentSuccess = true
        }
        if (isUpdateStudentSuccess) {
          // 성공
          finish(0)
        } else {
          // 성공했지만 사용자 정보 갱신 실패
          finish(-1)
        }
      } else {
        // 상품 지급 실패
        finish(-2)
      }
    } else {
      // InApp Purchase 취소
    }
    setLoading(false)
  }

  const requestIosPurchase = async ({
    itemId,
    callback,
  }: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    const finish = (code: number) => {
      callback && callback(code === 0, code)
      setLoading(false)
    }
    setLoading(true)
    writeLog('IAP_REQ', `Inapp Request [iOS]: ${itemId}`)
    let subscribeResult: InAppPurchaseResult | undefined = undefined
    try {
      const inappRequest = await promiseInappSubscribe({
        iapInterface,
        platform,
        itemId,
      })
      writeLog('IAP_REQ', `Inapp Res 1 : ${inappRequest.result}`)
      writeLog('IAP_REQ', `Inapp Res 2 (iOS): ${inappRequest.receipt}`)
      writeLog('IAP_REQ', `Inapp Res 3 (iOS): ${inappRequest.transactionId}`)
      subscribeResult = inappRequest
    } catch (error) {
      // ???
      finish(-100)
      return
    }

    const { result: isSuccess, transactionId, receipt } = subscribeResult
    if (isSuccess) {
      let purchaseTime = 0
      let purchaseTimeText = ''
      let receiptDetail: InAppReceiptDetailIOS | undefined = undefined
      try {
        receiptDetail = await promiseIosReceiptInfo(iapInterface, {
          transactionId: transactionId!!,
        })
        writeLog(
          'IAP_REQ',
          `[iOS] RECEIPT INFO: ${JSON.stringify(receiptDetail)}`,
        )
        if (
          receiptDetail.data &&
          receiptDetail.data.length > 0 &&
          receiptDetail.data[0].lastTransactions &&
          receiptDetail.data[0].lastTransactions.length > 0
        ) {
          purchaseTime =
            receiptDetail.data[0].lastTransactions[0].signedTransactionInfo
              ?.originalPurchaseDate || 0
        }
        if (purchaseTime <= 0) {
          purchaseTime = Date.now()
          purchaseTimeText = `7th`
          // 상품 결제 정보 조회 실패
          // finish(-22)
          // return
        }
      } catch (error) {
        writeLog(
          'IAP_REQ',
          `[iOS] RECEIPT INFO ERROR: ${JSON.stringify(error)}`,
        )
        // FIXME : Swing2App 정보가 안넘어와서 실패 처리하지 않음. //시간 하드코딩
        purchaseTime = Date.now()
        purchaseTimeText = `7th`
        // 상품 결제 정보 조회 실패
        // finish(-22)
        // return
      }

      try {
        const ts = await promiseIosTransactionInfo(iapInterface, {
          transactionId: transactionId!!,
        })
        writeLog('IAP_REQ', `[iOS] TRANSACTION INFO: ${JSON.stringify(ts)}`)
        purchaseTime =
          ts.resultMap?.signedTransactionInfo?.originalPurchaseDate || 0
        if (purchaseTime <= 0) {
          purchaseTime = Date.now()
          purchaseTimeText = `7th`
          // 상품 결제 정보 조회 실패
          // finish(-23)
          // return
        }
      } catch (error) {
        writeLog(
          'IAP_REQ',
          `[iOS] TRANSACTION INFO ERROR: ${JSON.stringify(error)}`,
        )
        // FIXME : Swing2App 정보가 안넘어와서 실패 처리하지 않음. //시간 하드코딩
        purchaseTime = Date.now()
        purchaseTimeText = `7th`
        // 상품 결제 정보 조회 실패
        // finish(-23)
        // return
      }

      const res = await fetcher.response(
        Repository.postInappPurchase({
          platform,
          productId: itemId,
          receipt: JSON.stringify({
            receipt: receipt!!,
            transactionId,
            purchaseTime: purchaseTimeText,
          }),
        }),
      )
      if (res.isSuccess && res.payload?.code === 0) {
        let isUpdateStudentSuccess = false

        const studyRes = await Promise.all([
          fetcher.response(Repository.getStudent()),
          fetcher.response(Repository.getStudentHistoryList()),
        ])
        if (studyRes[0].isSuccess && studyRes[1].isSuccess) {
          setInfo(studyRes[0].payload)
          setHistory(studyRes[1].payload)
          isUpdateStudentSuccess = true
        }
        if (isUpdateStudentSuccess) {
          // 성공
          finish(0)
        } else {
          // 성공했지만 사용자 정보 갱신 실패
          finish(-1)
        }
      } else {
        // 상품 지급 실패
        finish(-2)
      }
    } else {
      // InApp Purchase 취소
    }
    setLoading(false)
  }

  const fetch = (params: {
    itemId: string
    callback?: (isSuccess: boolean, code?: number, extra?: string) => void
  }) => {
    if (platform === 'android') {
      requestAndroidPurchase(params)
    } else {
      requestIosPurchase(params)
    }
  }
  return {
    fetch,
    loading,
    error,
  }
}

type InAppPurchaseResult = {
  result: boolean
  originalData?: unknown[]
  purchaseToken?: string
  productId?: string
  receipt?: string
  transactionId?: string
}
type InAppReceiptDetailAndroid = {
  resultMap: {
    lineItems?: any[]
    regionCode?: string
    kind?: string
    acknowledgementState?: string
    subscriptionState?: string
    startTime?: string
    latestOrderId?: string
    testPurchase?: any
    error?: {
      code: number
      message?: string
      errors?: any[]
    }
    responseCode: number
  }
}
type InAppReceiptDetailIOS = {
  environment: string
  data: {
    subscriptionGroupIdentifier?: string
    lastTransactions?: {
      originalTransactionId?: string
      status?: number
      signedTransactionInfo?: {
        transactionId?: string
        originalTransactionId?: string
        webOrderLineItemId?: string
        bundleId?: string
        productId?: string
        subscriptionGroupIdentifier?: string
        purchaseDate?: string
        originalPurchaseDate?: number
        expiresDate?: number
        quantity?: number
        type?: string
        inAppOwnershipType?: string
        signedDate?: number
        environment?: string
        transactionReason?: string
        storefront?: string
        storefrontId?: string
        price?: number
        currency?: string
      }
      signedRenewalInfo?: {
        expirationIntent?: number
        originalTransactionId?: string
        autoRenewProductId?: string
        productId?: string
        autoRenewStatus?: number
        isInBillingRetryPeriod?: boolean
        signedDate?: number
        environment?: string
        recentSubscriptionStartDate?: number
        renewalDate?: number
      }
    }[]
  }[]
  bundleId: string
}
type InAppTransactionInfoIOS = {
  resultMap?: {
    signedTransactionInfo?: {
      transactionId?: string
      originalTransactionId?: string
      bundleId?: string
      productId?: string
      purchaseDate?: number
      originalPurchaseDate?: number
      quantity?: number
      type?: string
      inAppOwnershipType?: string
      signedDate?: number
      environment?: string
      transactionReason?: string
      storefront?: string
      storefrontId?: string
      price?: number
      currency?: string
    }
    responseCode: number
  }
  transactionInfo?: {
    inAppOwnershipType?: string
    purchaseDate?: number
    quantity?: number
    productId?: string
    bundleId?: string
    storefrontId?: string
    type?: string
    transactionId?: string
    transactionReason?: string
    environment?: string
    originalTransactionId?: string
    price?: number
    signedDate?: number
    currency?: string
    originalPurchaseDate?: number
    storefront?: string
  }
}

function promiseInappSubscribe({
  iapInterface,
  platform,
  itemId,
}: {
  iapInterface: any
  platform: 'android' | 'ios'
  itemId: string
}): Promise<InAppPurchaseResult> {
  const promise = new Promise<{
    result: boolean
    purchaseToken: string
    productId: string
  }>((resolve, _) => {
    iapInterface.subscribe(
      itemId,
      platform,
      (returnModel: {
        result: boolean
        purchaseToken: string
        productId: string
      }) => {
        resolve(returnModel)
      },
    )
  })
  return promise
}

function promiseAndroidInappAcknowledge(
  iapInterface: any,
  returnModel: InAppPurchaseResult,
): Promise<unknown> {
  const promise = new Promise<unknown>((resolve, _) => {
    iapInterface.subscribeAcknowledgeForAnd(
      returnModel.purchaseToken,
      returnModel.productId,
      (returnModel: unknown) => {
        resolve(returnModel)
      },
    )
  })
  return promise
}

function promiseAndroidReceiptInfo(
  iapInterface: any,
  params: { purchaseToken: string; productId: string },
): Promise<InAppReceiptDetailAndroid> {
  const promise = new Promise<InAppReceiptDetailAndroid>((resolve, reject) => {
    writeLog('[AOS] InappInfo', JSON.stringify(params))
    iapInterface.getSubInfo(
      'android',
      { token: params.purchaseToken, subscription_id: params.productId },
      'N',
      (model: InAppReceiptDetailAndroid) => {
        resolve(model)
      },
      (error: unknown) => {
        reject(error)
      },
    )
  })
  return promise
}

function promiseIosReceiptInfo(
  iapInterface: any,
  params: { transactionId: string },
): Promise<InAppReceiptDetailIOS> {
  const promise = new Promise<InAppReceiptDetailIOS>((resolve, reject) => {
    writeLog('[IOS] InappInfo', JSON.stringify(params))
    iapInterface.getSubInfo(
      'ios',
      { transaction_id: params.transactionId },
      IOS_INAPP_USE_SEND_BOX,
      (model: InAppReceiptDetailIOS) => {
        resolve(model)
      },
      (error: unknown) => {
        reject(error)
      },
    )
  })
  return promise
}

function promiseIosTransactionInfo(
  iapInterface: any,
  params: { transactionId: string },
): Promise<InAppTransactionInfoIOS> {
  const promise = new Promise<InAppTransactionInfoIOS>((resolve, reject) => {
    writeLog('[IOS] Trans_Info', JSON.stringify(params))
    iapInterface.getIosTransactionInfo(
      'ios',
      { transaction_id: params.transactionId },
      IOS_INAPP_USE_SEND_BOX,
      (model: InAppTransactionInfoIOS) => {
        writeLog('[IOS] Trans Resolve', JSON.stringify(model))
        resolve(model)
      },
      (error: unknown) => {
        writeLog('[IOS] Trans Reject', JSON.stringify(error))
        reject(error)
      },
    )
  })
  return promise
}

async function writeLog(tag: string, message: string) {
  // await fetch('/api/a0log', {
  //   method: 'post',
  //   body: JSON.stringify({
  //     tag,
  //     message,
  //   }),
  // })
}
