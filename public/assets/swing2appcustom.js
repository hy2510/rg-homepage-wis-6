
// declear class for in app purchase interface
var RgIapInterface = function() {
    // init local variable
    this.serverHost = 'https://www.swing2app.co.kr';
    // this.serverHost = 'http://hustay.asuscomm.com:9083';
    this.appId = 'c7a1378e-f5cd-40e9-b62f-9f3576f96312';
    this.init = function() {
        // Initialize in app purchase interface
    }
    this.subscribe = function(productId,platform,callback) {
        // Subscribe in app product

        if( platform === 'android' )
        {
            swingWebViewPlugin.app.inapp.subscribe(productId,
                function(responseCode,data) {
                    console.log('responseCode : ' + responseCode + ', ret : ' + JSON.stringify(data));
                    if( responseCode == 0 ) // 성공
                    {
                        // 값 예시(data)
                        // [{
                        //     "orderId": "GPA.3355-4848-8386-49751",
                        //     "packageName": "com.hustay.swing.dededae603d0b4850bac7d4209309ce94",
                        //     "productId": "testpd1",
                        //     "purchaseTime": 1668091465146,
                        //     "purchaseState": 0,
                        //     "purchaseToken": "oljaodejfekfnhiddnefhmen.AO-J1OyIDgeuh3_XLdbmMaptYo81FidgEn3_n3zozmMfj4DqOn51RXY5U_XSeFOpDO4UplBiKsc59SVoPQjcp-jVTllJK_3P2ZMsPdzzBouc14jXN7DVLAg7tOFvKLjQ--HfGzIHpgKB",
                        //     "quantity": 1,
                        //     "acknowledged": false
                        // }]


                        data = JSON.parse(data);
                        var purchaseToken = data[0].purchaseToken;
                        var productId = data[0].productId;

                        callback({
                            result : true,
                            purchaseToken : purchaseToken,
                            productId : productId,
                            originalData : data
                        });

                        // 구독 상품은 결제 성공이후 API 호출을 통해 서버에 구매 확정 요청을 반드시 보내야 한다.
                        // 구매확정을 하지 않을 경우 일정시간이후 구독이 취소됩니다.
                        // 구매확정 backend 구현은 아래의 API 를 참고하시면 됩니다.
                        // purchaseToken 을 이용해서 향후에도 유효한 구매인지 확인할 수 있다.
                        // https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions/acknowledge
                        // API의 subscriptionId 파라미터는 productId와 같은 값이다.
                    }
                    else if( responseCode == 1 )    // 취소
                    {
                        callback({
                            result : false,
                            errorCode : responseCode
                        });
                        // todo ( 사용자가 취소한 경우 처리하시면 됩니다. )
                    }
                    else    // 기타 에러
                    {
                        callback({
                            result : false,
                            errorCode : responseCode
                        });

                        // int SERVICE_TIMEOUT = -3;
                        // int FEATURE_NOT_SUPPORTED = -2;
                        // int SERVICE_DISCONNECTED = -1;
                        // int SERVICE_UNAVAILABLE = 2;
                        // int BILLING_UNAVAILABLE = 3;
                        // int ITEM_UNAVAILABLE = 4;
                        // int DEVELOPER_ERROR = 5;
                        // int ERROR = 6;
                        // int ITEM_ALREADY_OWNED = 7;
                        // int ITEM_NOT_OWNED = 8;

                        // todo ( 위의 에러 코드에 맞게 처리하시면 됩니다. )

                    }
                });
        }
        else if( platform === 'ios' )
        {
            swingWebViewPlugin.app.inapp.subscribe(productId,
                function(responseCode,data) {
                    console.log('responseCode : ' + responseCode + ', ret : ' + JSON.stringify(data));
                    if( responseCode == 1 ) // 성공
                    {
                        // 값 예시
                        // responseCode : 1, ret : "{\"transaction\":{\"transactionIdentifier\":\"2000000524327453\"},\"productId\":\"swbwregsubweek\",\"needsFinishTransaction\":false,\"originalTransaction\":{\"transactionIdentifier\":null},\"receipt\":\"=test=\",\"quantity\":1}"
                        data = JSON.parse(data);
                        var receipt = data.receipt;
                        var productId = data.productId;
                        var transactionIdentifier = data.transaction.transactionIdentifier;


                        // ajax 호출을 통해 서버에 transaction 정보를 확인해보세요.
                        // 유효한 구독 상품인지 확인을 위해 아래의 함수를 호출합니다.
                        // 구독 상태 정보 backend 구현은 아래의 API 를 참고하시면 됩니다.
                        // https://developer.apple.com/documentation/appstoreserverapi/get_all_subscription_statuses

                        callback({
                            result : true,
                            receipt : receipt,
                            transactionId : transactionIdentifier,
                            productId : productId,
                            originalData : data
                        });

                    }
                    else    // 기타 에러
                    {
                        callback({
                            result : false,
                            errorCode : responseCode,
                        });

                    }

                })

        }
    }
    this.decodeJWSTransactionPayload = function(token) {
        // JWT는 세 부분으로 나뉘어져 있습니다: header, payload, signature
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT token');
        }

        // Base64 URL-safe decoding (Payload 부분이 두 번째)
        const payload = parts[1];

        // Base64 URL-safe decoding 함수
        function base64UrlDecode(input) {
            // base64url -> base64 변환
            const base64 = input.replace(/-/g, '+').replace(/_/g, '/');

            // base64 디코딩
            const decoded = atob(base64);

            // UTF-8로 변환
            return decodeURIComponent(decoded.split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }

        // 디코딩된 Payload를 JSON으로 변환
        const decodedPayload = base64UrlDecode(payload);

        return JSON.parse(decodedPayload);
    }
    this.subscribeAcknowledgeForAnd = function(purchaseToken, productId, callback, errorCallback) {

        swingWebViewPlugin.requestCall(this.serverHost + '/inappapi/android/purchases_subscriptions_acknowledge', 'post',
            {
                token: purchaseToken,
                subscription_id: productId,
                app_id : this.appId,
            },
            function(result){
                callback(result);
            },
            function() {
                if( errorCallback != null )
                {
                    errorCallback();
                }
            }
        );
    }
    this.getSubInfo = function(platform, params, isTest ,callback, errorCallback) {

        if( platform === 'android' )
        {
            // Get subscription info
            swingWebViewPlugin.requestCall( this.serverHost + '/inappapi/android/purchases_subscriptions_v2_get', 'post',
                {
                    token: params.token,
                    app_id: this.appId
                },
                function(result){
                    if( result.resultMap.responseCode == 200 )
                    {
                        callback(result);
                    }
                    else
                    {
                        errorCallback(result);
                    }

                },
                function() {
                    if( errorCallback != null )
                    {
                        errorCallback();
                    }

                }
            );
        }
        else if( platform === 'ios' )
        {
            var decodeJWSTransactionPayload = this.decodeJWSTransactionPayload;

            swingWebViewPlugin.requestCall(this.serverHost +  '/inappapi/ios/get_all_subscription_statuses', 'post',
                {
                    is_sandbox_yn: isTest,
                    transaction_id: params.transaction_id,
                    app_id: this.appId
                },
                function(data){
                    if( data.resultMap.responseCode == 200 )
                    {
                        const transformedData = {
                            environment: data.resultMap.environment,
                            data: data.resultMap.data.map((item) => {
                                return {
                                    subscriptionGroupIdentifier: item.subscriptionGroupIdentifier,
                                    lastTransactions: item.lastTransactions.map((transaction) => {
                                        return {
                                            originalTransactionId: transaction.originalTransactionId,
                                            status: transaction.status,
                                            signedTransactionInfo: decodeJWSTransactionPayload(transaction.signedTransactionInfo), // 디코딩된 signedTransactionInfo
                                            signedRenewalInfo: decodeJWSTransactionPayload(transaction.signedRenewalInfo) // 디코딩된 signedRenewalInfo
                                        };
                                    })
                                };
                            }),
                            bundleId: data.resultMap.bundleId
                        };

                        callback(transformedData);
                    }
                    else
                    {
                        errorCallback(data.resultMap);
                    }



                },
                function() {
                    if( errorCallback != null )
                    {
                        errorCallback();
                    }
                }
            );
        }
    }
    this.getIosTransactionInfo = function(platform, params, isTest ,callback, errorCallback) {

        var decodeJWSTransactionPayload = this.decodeJWSTransactionPayload;

        swingWebViewPlugin.requestCall(this.serverHost +  '/inappapi/ios/get_transaction_info', 'post',
            {
                is_sandbox_yn: isTest,
                transaction_id: params.transaction_id,
                app_id: this.appId
            },
            function(data){
                if( data.resultMap.responseCode == 200 )
                {
                    data.resultMap.signedTransactionInfo = decodeJWSTransactionPayload(data.resultMap.signedTransactionInfo);
                    callback(data.resultMap.transactionInfo);
                }
                else
                {
                    errorCallback(data.resultMap);
                }
            },
            function() {
                if( errorCallback != null )
                {
                    errorCallback();
                }
            }
        );
    }

    this.purchase = function() {
        // Purchase in app product
    }
    this.restore = function() {
        // Restore in app purchase
    }
    this.verify = function() {
        // Verify in app purchase
    }

    this.init();
}